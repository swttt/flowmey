<template lang="pug">

div
  div(v-if = '!card.broken' v-for='group in cards' :key = 'group.id')
    div(v-for = 'cardInstance in group.cards.trigger' v-if = 'cardInstance.id === card.id && group.uri === card.uri')
      flowcard(:card="card" :cardInstance="cardInstance")

  div.card.has-text-centered(v-else)
    i.fas.fa-unlink {{card.uriObj}}

</template>

<script>
import flowcard from './flowcard';

export default {
  name: 'triggercard',
  props: ['cards', 'card'],
  components: {
    flowcard
  }
};

</script>
