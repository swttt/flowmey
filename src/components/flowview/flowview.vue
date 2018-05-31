<template lang="pug">

div.content
  navigation(v-bind:flow = 'currentFlow')
  div.card-group IF
    triggercard(v-if = 'currentFlow.trigger' :card = 'currentFlow.trigger')
  div.card-group(v-if = 'currentFlow.conditions.length') AND
    conditioncard(v-for='card in currentFlow.conditions' :key = 'card.id' :card = 'card')
  div.card-group(v-if = 'currentFlow.actions.length') THEN
    actioncard(v-if = 'currentFlow.actions' v-for='card in currentFlow.actions' :key = 'card.id' :card = 'card')

</template>

<script>
import navigation from './navigation';
import triggercard from './triggercard';
import conditioncard from './conditioncard';
import actioncard from './actioncard';

function reduceFlowType(arr) {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
}

export default {
  name: 'FlowView',
  props: ['flow'],
  components: {
    triggercard,
    conditioncard,
    actioncard,
    navigation
  },
  data() {
    return {
      currentFlow: {},
      cards: {}
    };
  },
  mounted() {
    if (!this.$route.params.flow) return;
    this.getData(this.$route.params.flow);
  },
  methods: {
    getData(flow) {
      Promise.all([
        this.getCards(),
        this.getFlow(flow)
      ]).then(([ cards, flow ]) => {
        this.cardsByUri = cards.reduce((acc, card) => {
          acc[card.uri] = {
            triggers   : reduceFlowType(card.cards.trigger   || []),
            conditions : reduceFlowType(card.cards.condition || []),
            actions    : reduceFlowType(card.cards.action    || []),
          };
          return acc;
        }, {});
        this.annotateFlow(flow);
      }).catch(e => {
        console.error('Unable to load flow/cards', e);
      });
    },
    getFlow(flow) {
      return this.$homey.flow.getFlow({ id: flow });
    },
    getCards() {
      return this.$homey.flow.getCards();
    },
    annotateFlow(flow) {
      flow.trigger.base = this.cardsByUri[flow.trigger.uri].triggers[flow.trigger.id];

      flow.conditions.forEach(condition => {
        condition.base = this.cardsByUri[condition.uri].conditions[condition.id];
      });

      flow.actions.forEach(action => {
        action.base = this.cardsByUri[action.uri].actions[action.id];
      });

      this.currentFlow = flow;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getFlow(to.params.flow).then(flow => this.annotateFlow(flow));
    next();
  }
};
</script>

<style scoped lang="stylus">

.card-group
  font-style bold
  font-size 35px
  text-align center
  width 80%
  margin auto

</style>
