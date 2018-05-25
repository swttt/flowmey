<template lang="pug">
    div.content
      div
        b Flow: {{flow.title}}
      div
        b Folder: {{flow.folder}}
      br
      br
      div.cardGroup IF
        card(:card="flow.trigger")
      br
      div.cardGroup AND
        card(v-for="card in flow.conditions" :card="card")
      br
      div.cardGroup THEN
        card(v-for="card in flow.actions" :card="card")
</template>

<script>
import card from '@/components/flow/card'

export default {
  name: 'Flow',
  props: ['flow'],
  components: {
    card
  },
  data () {
    return {
      flow: ''
    }
  },
  mounted () {
    if (this.$route.params.flow) {
      this.getFlow(this.$route.params.flow)
    }
  },
  methods: {
    getFlow (flow) {
      this.$homey.flow.getFlow({id: flow})
        .then(result => {
          this.flow = result
        })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.getFlow(to.params.flow)
    next()
  },
}
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

</style>
