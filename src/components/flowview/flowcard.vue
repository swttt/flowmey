<template lang="pug">

div.box.flow-card

  div.columns
    div.column.is-narrow.flow-icon-container
      img.flow-icon(:src="$homey._baseUrl + card.uriObj.icon")
    div.column.flow-title-container
      div.columns.is-paddingless
        div.column.has-text-left.is-marginless
          span(v-if = 'card.droptoken')
            span.tag.is-success.is-small(v-if = 'card.droptoken') {{ card.droptoken }}
            span &nbsp;
          span.flow-title {{ getInvertValue(card.base.title.en, card.inverted) }}
          // div.alignLeft.disabled(v-if="card.uriObj.meta") {{ card.uriObj.name }} - {{card.uriObj.meta.zoneName}}
      div.columns.is-paddingless
        div.column.is-marginless.flow-args(v-for="arg in card.base.args")
          // split v-if and actual presentation
          // Date
          div(v-if="arg.type === 'date'")
            input.flowInput.input(:type="arg.type" :value="card.args[arg.name]")
          // Time
          div(v-if="arg.type === 'time'")
            input.flowInput.input(:type="arg.type" :value="card.args[arg.name]")
          // Dropdown
          div(v-if="arg.type === 'dropdown'")
            select.flowInput.input
              option(v-for="valueItem in arg.values" :value="valueItem.id" :selected="valueItem.id === card.args[arg.name] ? 'selected' : ''") {{valueItem.label.en}}
          // Text
          div(v-if="arg.type === 'text'")
            input.flowInput.input(:type="arg.type" :value="card.args[arg.name]")
          // Number
          div(v-if="arg.type === 'number'")
            input.flowInput.input(:type="arg.type" :step="arg.step" :min="arg.min" :max="arg.max" :value="card.args[arg.name]")
          // Autocomplete
          div(v-if="arg.type === 'autocomplete'")
            input.flowInput.input(:type="arg.type" :value="card.args[arg.name]")
          // Range
          div(v-if="arg.type === 'range'")
            input.flowInput.input(:type="arg.type" :step="arg.step" :min="arg.min" :max="arg.max" :value="card.args[arg.name]")
          // Device
          div(v-if="arg.type === 'device'")
            div {{arg}}
          // Color
          div(v-if="arg.type === 'color'")
            div {{arg}}
          // Droptoken
          div(v-if="arg.type === 'droptoken'")
            div {{arg}}
      div.columns.is-pulled-right(v-if = 'card.base.tokens')
        div.column.flow-card-token(v-for = 'token in card.base.tokens' :key = 'token.name')
          span.tag.is-info.is-small {{ token.title.en }}

    //debug:
    //div.card.base {{card}}

</template>

<script>

export default {
  name: 'flowcard',
  props: ['card'],
  components: {},
  methods: {
    getInvertValue(label, inverted) {
      return label.replace(/!{{.*?}}/g, tmpl => {
        const m = tmpl.match(/!\{\{(.*?)(?:\|(.*?))\}\}/);
        return m ? m[1 + Number(inverted)] : tmpl;
      });
    }
  }
};

</script>

<style scoped lang="stylus">
@import '~styles/variables.styl'

.box.flow-card
  font-size 16px
  width 80%
  min-width 400px
  margin 0 auto 5px
  padding 5px
  border 2px solid color-primary

.flow-icon-container
  display flex
  justify-content center
  align-items center
  img
    height 55px
    width 55px
    -webkit-mask-size contain
    -webkit-mask-position top left
    -webkit-mask-repeat no-repeat

.flow-title-container
  padding-left 0

.flow-title
  font-weight bold

.flow-args
  padding-top 8px

.flow-card-token
  padding-left 1px
  &:not(:last-child)
    padding-right 1px

</style>
