<template lang="pug">

span.folder(:class = "isExpanded ? 'open' : 'closed'")
  span.paddingright3.fa-layers.fa-fw
    i.fas.fa-folder
    i.fas.fa-folder-open
  | {{folder.title}}

</template>

<script>

export default {
  name: 'folder',
  props: ['folder', 'isExpanded'],
  components: {
  }
};

</script>

<style scoped lang="stylus">

.folder
  .fa-folder-open
    display none
  .fa-folder
    display inline-block

  &.open
    .fa-folder-open
      display inline-block
    .fa-folder
      display none

.disabled
  opacity 0.5

.paddingright3
  padding-right 3px

</style>
