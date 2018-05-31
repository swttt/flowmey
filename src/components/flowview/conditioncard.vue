<template lang="pug">

// TODO: OR grouping card.group contains group1, group2 etc for each OR group
div
  div(v-if = '!card.broken' v-for='group in cards' :key = 'group.id')
    div(v-for = 'cardInstance in group.cards.condition' v-if = 'cardInstance.id === card.id && group.uri === card.uri')
      flowcard(:card="card" :cardInstance="cardInstance")
        flowcard(:card="card" :cardInstance="cardInstance")

  div.card.has-text-centered(v-else)
    i.fas.fa-unlink {{card.uriObj}}

</template>

<script>
import flowcard from './flowcard';

export default {
  name: 'conditioncard',
  props: ['cards', 'card'],
  components: {
    flowcard
  }
};

</script>
