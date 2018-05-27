<template lang="pug">
    div.content
      div
        b Flow: {{currentFlow.title}}
      div
        b Folder: {{currentFlow.folder}}
      br
      br
      div.cardGroup IF
        card(v-if="currentFlow.trigger" :card="currentFlow.trigger")
      br
      div.cardGroup AND
        card(v-if="currentFlow.conditions" v-for="card in currentFlow.conditions" :key="card.id" :card="card")
      br
      div.cardGroup THEN
        card(v-if="currentFlow.actions" v-for="card in currentFlow.actions" :key="card.id" :card="card")
</template>

<script>
import card from '@/components/flow/card';

export default {
  name: 'Flow',
  props: ['flow'],
  components: { card },
  data() {
    return {
      currentFlow: {}
    };
  },
  mounted() {
    if (this.$route.params.flow) {
      this.getFlow(this.$route.params.flow);
    }
  },
  methods: {
    getFlow(flow) {
      this.$homey.flow.getFlow({ id: flow })
        .then(result => {
          this.currentFlow = result;
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

  .content
    overflow-y auto

</style>
