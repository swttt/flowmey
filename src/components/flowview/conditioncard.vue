<template lang="pug">

// TODO: OR grouping card.group contains group1, group2 etc for each OR group

div
  flowcard.flow-condition-card(:card = 'card')

</template>

<script>
import flowcard from './flowcard';

export default {
  name: 'conditioncard',
  props: ['card'],
  components: {
    flowcard
  }
};

</script>

<style scope lang='stylus'>

.flow-condition-card
  border-color green !important

</style>
