<template lang="pug">

div.sidebar

  img.logo(src="~assets/images/logo.svg")

  div.field
    p.control.has-icons-left
      input.input(type="search" v-model="search" placeholder="Search...")
      span.icon.is-left
        i.fas.fa-search

  sl-vue-tree.flow-tree(v-model = 'tree' ref = 'flowTree')
    template(slot = 'title' slot-scope = '{ node }')
      span(@click = 'ev => ! node.isLeaf && toggleExpansion(ev, node)')
        flow(v-if   = 'node.isLeaf  && node.data.isVisible' :flow   = 'treeToHomey[node.data.id]')
        folder(v-if = '!node.isLeaf && node.data.isVisible' :folder = 'treeToHomey[node.data.id]' :isExpanded = 'node.isExpanded')
    template(slot = 'toggle' slot-scope = '{ node }')
      span

</template>

<script>
import lodash from 'lodash';
import SlVueTree from 'sl-vue-tree';
import flow from '@/components/sidebar/flow';
import folder from '@/components/sidebar/folder';

export default {
  name: 'Sidebar',
  components: { flow, folder, SlVueTree },
  data() {
    return {
      folders: {},
      flows: {},
      tree: [],
      treeBackup: [],

      search: null,
      isSearching: false,

      // lookup tables
      treeToHomey: {},
      homeyToTree: {},
    };
  },
  watch: {
    search(query) {
      if (typeof query !== 'string' || query.length === 0) {
        // If we were searching, but now we're not,
        // restore the tree state to its previous value.
        if (this.isSearching) {
          this.deserializeTree();
        }
        this.isSearching = false;
        return;
      }

      // If we weren't searching, but now we are, store the
      // current state of the tree so we can restore it later.
      if (!this.isSearching) {
        this.serializeTree();
        this.isSearching = true;
      }

      query = query.toLowerCase();
      const matcher = node => node.isLeaf && node.title.toLowerCase().includes(query);
      this.expandTree(this.tree, matcher);
    }
  },
  created() {
    Promise.all([
      this.$homey.flow.getFolders(),
      this.$homey.flow.getFlows(),
    ]).then(([ folders, flows ]) => {
      this.folders     = folders;
      this.flows       = flows;
      this.treeToHomey = {};
      this.homeyToTree = {};
      this.tree        = this.generateTree(false);
    });
  },
  methods: {
    // Recurse through all nodes of the tree and run a function on each.
    recurseTree(root, onNode) {
      if (!root) return;
      for (const node of root) {
        onNode(node);
        this.recurseTree(node.children, onNode);
      }
    },
    serializeTree() {
      this.treeBackup = {};
      this.recurseTree(this.tree, node => {
        this.treeBackup[node.data.id] = {
          id: node.data.id,
          isExpanded: node.isExpanded,
          isVisible: node.data.isVisible
        };
      });
    },
    deserializeTree() {
      this.recurseTree(this.tree, node => {
        const backup = this.treeBackup[node.data.id];
        if (backup) {
          node.isExpanded = backup.isExpanded;
          node.data.isVisible = backup.isVisible;
        }
      });
    },
    expandTree(tree, matcher) {
      let hasMatch = false;
      for (const node of tree) {
        if (node.isLeaf) {
          node.isExpanded = matcher(node);
        } else {
          node.isExpanded = this.expandTree(node.children || [], matcher);
        }
        if (node.isExpanded) {
          node.data.isVisible = true;
          hasMatch = true;
        } else {
          node.data.isVisible = false;
        }
      }
      return hasMatch;
    },
    isFlow(item) {
      return item.__athom_api_type === 'HomeyAPI.ManagerFlow.Flow';
    },
    isFolder(item) {
      return item.__athom_api_type === 'HomeyAPI.ManagerFlow.Folder';
    },
    toggleExpansion(ev, node) {
      const { flowTree } = this.$refs;
      ev.stopPropagation();
      flowTree.updateNode(node.path, { isExpanded: !node.isExpanded });
    },
    generateTree(target) {
      return lodash({ ...this.flows, ...this.folders })
        .orderBy('order')
        .values()
        .map(flowOrFolder => {
          this.treeToHomey[flowOrFolder.id] = flowOrFolder;
          if (flowOrFolder.folder !== target) return null;

          // Generate array with children.
          const children = this.generateTree(flowOrFolder.id);

          // Tree node.
          const node = {
            title: flowOrFolder.title,
            isExpanded: false,
            isLeaf: this.isFlow(flowOrFolder),
            data: { id: flowOrFolder.id, isVisible: true },
            children
          };

          // Update lookup tables.
          this.homeyToTree[flowOrFolder.id] = node;

          // Done
          return node;
        })
        .compact()
        .value();
    },
  },
};
</script>

<style lang="stylus">
@import '~styles/variables.styl'

.sidebar
  background #00A5FF
  box-shadow 3px 0 10px 0 rgba(0,0,0,0.50)
  z-index 2

  .logo
    display block
    margin auto
    padding-bottom 20px
    width auto
    height 80px

  .sl-vue-tree-nodes-list, .sl-vue-tree-node
    margin-left 10px
    .sl-vue-tree-node-item:hover
      cursor pointer

  .flow-tree > .sl-vue-tree-nodes-list
    margin-left 0
    overflow-y auto
    height calc(100vh - 150px)

  .item-icon
    display inline-block
    text-align left
    width 20px
    .fa-random
      color white

</style>
