<template lang="pug">

div
  div
    b Flow: {{ flow.title }}
  div(v-if = 'flow.folder')
    b Folder: {{ flow.folder }}
  br

</template>

<script>

export default {
  name: 'navigation',
  props: ['flow'],
  data() {
  },
};

</script>
