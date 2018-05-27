<template lang="pug">
  div.sidebar

    img.logo(src="~assets/images/logo.svg")

    div.field
      p.control.has-icons-left
        input.input(type="search" v-model="search" placeholder="Search...")
        span.icon.is-left
          i.fas.fa-search
    v-collapse-group(v-if="!search")
      items.items(v-bind:obj="tree" )
    items.items(v-bind:obj="filterFlows" v-if="search && filterFlows.length")
    div(v-if="search && !filterFlows.length")
      center.has-text-white No matching flows found!

</template>

<script>
import lodash from 'lodash';
import items from '@/components/sidebar/items';

export default {
  name: 'Sidebar',
  components: { items },
  data() {
    return {
      folders: {},
      flows: {},
      tree: [],
      search: null,
    };
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
    generateTree(folder) {
      return lodash({ ...this.flows, ...this.folders })
        .orderBy('order')
        .values()
        .map(obj => {
          if (obj.folder !== folder) return null;
          const children = this.generateTree(obj.id);
          if (children.length) {
            obj.children = children;
          }
          return obj;
        })
        .compact()
        .value();
    },
  },
  computed: {
    filterFlows() {
      return lodash.filter(
        this.flows,
        flow => lodash.includes(flow.title.toLowerCase(), this.search.toLowerCase()),
      );
    },
  },
};
</script>

<style lang="stylus">
@import '~styles/variables.styl'

.logo
  display: block
  margin: auto
  padding-bottom 20px
  width auto
  height 80px

.sidebar
  background: #00A5FF
  box-shadow: 3px 0 10px 0 rgba(0,0,0,0.50)
  z-index 2

.items
  overflow-y scroll
  height calc(100vh - 150px)

</style>
