<template lang="pug">
span
  span.paddingright3
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
