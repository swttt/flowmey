<template lang="pug">

div.margin
  div.card(v-if="!card.broken")
    div.header
      img.headerIcon(:src="$homey._baseUrl+card.uriObj.icon")
      div.headerTitle {{card.uriObj.name}}
    div {{card.id}} {{card.args}}
    //debug: div {{card}}

  div.card.broken(v-else)
    i.fas.fa-unlink
    br
    |  {{card.uriObj}}



</template>

<script>

export default {
  name: 'card',
  props: ['card'],
  components: {
  }
}

</script>

<style lang="stylus">
@import '~styles/variables.styl'

.margin
  margin 2px
.broken
  text-align center
.card
  font-size 16px
  border-style solid
  border-width 2px
  border-color color-primary
  border-radius 5px
  padding 5px
  width 80%
  margin auto

  .header
    margin: 0 auto;
  .headerTitle
    margin-left 2em
    padding: 0.6em
    font-weight:bold
    text-align left
  .headerIcon
    float left
    height 30px
    width 30px
    font-size 38px
    line-height 30px
    vertial-align text-top
    position relative
    top 7px
    left 7px
    -webkit-mask-size contain
    -webkit-mask-position top left
    -webkit-mask-repeat no-repeat

</style>
