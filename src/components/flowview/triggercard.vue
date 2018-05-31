<template lang="pug">

div
  flowcard.flow-trigger-card(:card = 'card')

</template>

<script>
import flowcard from './flowcard';

export default {
  name: 'triggercard',
  props: [ 'card'],
  components: {
    flowcard
  }
};

</script>

<style scope lang='stylus'>

.flow-trigger-card
  border-color red !important

</style>
