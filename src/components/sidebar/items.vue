<template lang="pug">
div.item
  ul
    li.child(v-for="item in obj")
      div
        span.has-text-white(v-if="item.__athom_api_type === 'HomeyAPI.ManagerFlow.Flow'")
          icon
            i.fas.fa-random.has-text-white
          | {{item.title}}
        span(v-else)
          icon
            i.fas.fa-folder
          | {{item.title}}

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
  icon
    padding 3px

</style>
