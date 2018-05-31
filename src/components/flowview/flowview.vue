<template lang="pug">

div.content
  navigation(v-bind:flow = 'currentFlow')
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
import navigation from './navigation';
import triggercard from './triggercard';
import conditioncard from './conditioncard';
import actioncard from './actioncard';

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
    if (this.$route.params.flow) {
      this.getFlow(this.$route.params.flow);
    }

    this.getCards();
  },
  methods: {
    getFlow(flow) {
      this.$homey.flow.getFlow({ id: flow })
        .then(result => {
          this.currentFlow = result;
        });
    },
    getCards() {
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

<style scoped lang="stylus">

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
