<template lang="pug">
div.item
  ul
    li.child(v-for="item in obj")
      flow( :flow="item" :key="item.id" v-if="item.__athom_api_type === 'HomeyAPI.ManagerFlow.Flow'")

      div(v-if="item.children && item.__athom_api_type === 'HomeyAPI.ManagerFlow.Folder'")
        v-collapse-group
          v-collapse-wrapper
            folder(v-collapse-toggle :folder="item" :key="item.id")
            items(v-collapse-content :obj="item.children")
      folder(v-if="!item.children && item.__athom_api_type === 'HomeyAPI.ManagerFlow.Folder'" :folder="item" :key="item.id")

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
  }
};

</script>

<style lang="stylus">

ul li
  list-style none
  margin-left 15px
  position relative
  padding-left 5px
  font-size 14px

</style>
