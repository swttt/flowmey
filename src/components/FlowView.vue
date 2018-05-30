<template lang="pug">
    div.content
      div
        b Flow: {{currentFlow.title}}
      div(v-if="currentFlow.folder")
        b Folder: {{currentFlow.folder}}
      br
      br
      div.cardGroup IF
        triggercard(v-if="currentFlow.trigger" :card="currentFlow.trigger" :cards="this.cards")
      br
      div.cardGroup AND
        conditioncard(v-if="currentFlow.conditions" v-for="card in currentFlow.conditions" :key="card.id" :card="card" :cards="cards")
      br
      div.cardGroup THEN
        actioncard(v-if="currentFlow.actions" v-for="card in currentFlow.actions" :key="card.id" :card="card" :cards="cards")
</template>

<script>
import lodash from 'lodash';
import triggercard from '@/components/flow/triggercard';
import conditioncard from '@/components/flow/conditioncard';
import actioncard from '@/components/flow/actioncard';

export default {
  name: 'Flow',
  props: ['flow'],
  components: { triggercard, conditioncard, actioncard },
  data() {
    return {
      currentFlow: {},
      cards: {}
    };
  },
  mounted() {
    if (this.$route.params.flow) {
      this.getFlow(this.$route.params.flow);
    }

    this.getCards();
  },
  methods: {
    getFlow: function(flow) {
      this.$homey.flow.getFlow({ id: flow })
        .then(result => {
          this.currentFlow = result;
        });
    },
    getCards: function() {
      this.$homey.flow.getCards()
        .then(result => {
          this.cards = result;
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getFlow(to.params.flow);
    next();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~styles/variables.styl'

  .cardGroup
    font-style bold
    font-size 35px
    text-align center
    width 80%
    margin auto
  .cardTitle
    margin-left 7px
    margin-right 3px

  .content
    overflow-y auto

</style>
