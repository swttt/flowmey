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
        flow(v-if   = 'node.isLeaf'  :flow   = 'node.data.obj')
        folder(v-if = '!node.isLeaf' :folder = 'node.data.obj' :isExpanded = 'node.isExpanded')
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
      idToObj: {},
      search: null,
    };
  },
  watch: {
    search(query) {
      const { flowTree } = this.$refs;

      query = query.toLowerCase();
      console.log('S', query);
      let isMatch = node => node.title.toLowerCase().includes(query);

      if (typeof query !== 'string' || query.length === 0) {
        isMatch = () => true;
      }

      flowTree.traverse(node => {
        if (node.isLeaf) {
          const isVisible = isMatch(node);
          const path = Array.from(node.path);
          for (let i = 1; i < path.length; i += 1) {
            const subPath = path.slice(0, i);
            // if (node.data.isVisible !== isVisible) {
            flowTree.updateNode(subPath, { isExpanded: true, data: { isVisible } });
            // }
          }
        }
      });
    }
  },
  created() {
    Promise.all([
      this.$homey.flow.getFolders(),
      this.$homey.flow.getFlows(),
    ]).then(([ folders, flows ]) => {
      this.folders = folders;
      this.flows   = flows;
      this.tree    = this.generateTree(false);
    });
  },
  methods: {
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
        .map(obj => {
          this.idToObj[obj.id] = obj;
          if (obj.folder !== target) return null;
          const children = this.generateTree(obj.id);
          return {
            id: obj.id,
            title: obj.title,
            isExpanded: false,
            isLeaf: this.isFlow(obj),
            data: { obj, isVisible: true },
            children
          };
        })
        .compact()
        .value();
    },
  },
  computed: {
    filterFlows() {
      return lodash.filter(
        this.flows,
        f => lodash.includes(f.title.toLowerCase(), this.search.toLowerCase()),
      );
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
