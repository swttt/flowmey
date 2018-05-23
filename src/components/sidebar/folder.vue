<template lang="pug">
span.folder
  p.icon
    i.fas.fa-folder
  | {{folder.title}}

</template>

<script>

export default {
  name: 'folder',
  props: ['folder'],
  components: {
  }
}

</script>
<style lang="stylus">

</style>
