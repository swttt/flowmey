<template lang="pug">
div.item
  ul
    li.child(v-for="item in obj")
      span.icon
        i.fas.fa-random.has-text-white(v-if="item.__athom_api_type === 'HomeyAPI.ManagerFlow.Flow'")
        i.fas.fa-folder(v-else)
      span.has-text-white(v-if="item.__athom_api_type === 'HomeyAPI.ManagerFlow.Flow'") {{item.title}}
      span(v-else) {{item.title}}
      items(v-if="item.children" v-bind:obj="item.children")

</template>

<script>
import items from '@/components/sidebar/items'

export default {
  name: 'items',
  props: ['obj'],
  components: {
    items
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
