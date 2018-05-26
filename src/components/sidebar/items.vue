<template lang="pug">
div.item
  ul
    li.child(v-for="item in obj")
      flow(:flow="item" :key="item.id" v-if="item.__athom_api_type === 'HomeyAPI.ManagerFlow.Flow'")
      folder(:folder="item" :key="item.id" v-else)

      items(v-if="item.children" v-bind:obj="item.children")

</template>

<script>
import items from '@/components/sidebar/items'
import folder from '@/components/sidebar/folder'
import flow from '@/components/sidebar/flow'

export default {
  name: 'items',
  props: ['obj'],
  components: {
    items,
    folder,
    flow
  }
}

</script>

<style lang="stylus">

ul li
  list-style none
  margin-left 15px
  position relative
  padding-left 5px
  font-size 14px

</style>
