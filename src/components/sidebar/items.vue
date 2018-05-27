<template lang="pug">
div.item
  ul
    li.child(v-for="item in obj")
      flow( :flow="item" :key="item.id" v-if="isFlow(item)")

      div(v-if="item.children && isFolder(item)")
        v-collapse-group
          v-collapse-wrapper
            folder(v-collapse-toggle='' :folder="item" :key="item.id")
            items(v-collapse-content='' :obj="item.children")
      folder(v-if="!item.children && isFolder(item)" :folder="item" :key="item.id")

</template>

<script>
import items from '@/components/sidebar/items';
import folder from '@/components/sidebar/folder';
import flow from '@/components/sidebar/flow';

export default {
  name: 'items',
  props: ['obj'],
  components: {
    items,
    folder,
    flow
  },
  methods: {
    isFlow(item) {
      return item.__athom_api_type === 'HomeyAPI.ManagerFlow.Flow';
    },
    isFolder(item) {
      return item.__athom_api_type === 'HomeyAPI.ManagerFlow.Folder';
    },
    matchesQuery(item) {
      return !this.query || item.title.toLowerCase().includes(this.query.toLowerCase());
    }
  }
};

</script>

<style lang="stylus">

.items
  ul li
    list-style none
    margin-left 15px
    position relative
    padding-left 5px
    font-size 14px
  > ul, > ul > li
    margin-left 0
    padding-left 0

</style>
