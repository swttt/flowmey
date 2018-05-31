<template lang="pug">

div
  div.columns
    div.column.is-narrow
      img.headerIcon(:src="$homey._baseUrl+card.uriObj.icon")
    div.column
      div.box
        div.is-5.alignLeft.flowCardHeader {{ getInvertValue(cardInstance.title.en, card.inverted) }}
        div.alignLeft.disabled(v-if="card.uriObj.meta") {{ card.uriObj.name }} - {{card.uriObj.meta.zoneName}}

  table
    tr(v-if="card.droptoken")
      td
        div.cardTitle Token
      td
        input(type='text' :value="card.droptoken")
    tr
      td(colspan='2')
        div.cardTitle(v-for="arg in cardInstance.args")
          // split v-if and actual presentation
          // Date
          div(v-if="arg.type === 'date'")
            input.flowInput(:type="arg.type" :value="card.args[arg.name]")
          // Time
          div(v-if="arg.type === 'time'")
            input.flowInput(:type="arg.type" :value="card.args[arg.name]")
          // Dropdown
          div(v-if="arg.type === 'dropdown'")
            select.flowInput
              option(v-for="valueItem in arg.values" :value="valueItem.id" :selected="valueItem.id === card.args[arg.name] ? 'selected' : ''") {{valueItem.label.en}}
          // Text
          div(v-if="arg.type === 'text'")
            input.flowInput(:type="arg.type" :value="card.args[arg.name]")
          // Number
          div(v-if="arg.type === 'number'")
            input.flowInput(:type="arg.type" :step="arg.step" :min="arg.min" :max="arg.max" :value="card.args[arg.name]")
          // Autocomplete
          div(v-if="arg.type === 'autocomplete'")
            input.flowInput(:type="arg.type" :value="card.args[arg.name]")
          // Range
          div(v-if="arg.type === 'range'")
            input.flowInput(:type="arg.type" :step="arg.step" :min="arg.min" :max="arg.max" :value="card.args[arg.name]")
          // Device
          div(v-if="arg.type === 'device'")
            div {{arg}}
          // Color
          div(v-if="arg.type === 'color'")
            div {{arg}}
          // Droptoken
          div(v-if="arg.type === 'droptoken'")
            div {{arg}}
    tr(v-if="cardInstance.tokens")
      td
        div.cardTitle Available tokens:
      td
        p(v-for="token in cardInstance.tokens" :key="token.name")  "{{token.title.en}}"

    //debug:
    //div.cardInstance {{card}}

</template>

<script>

export default {
  name: 'flowcard',
  props: ['card', 'cardInstance'],
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

.flowInput
  width 300px

.colspan2
  colspan 2

.alignLeft
  text-align left

.flowCardHeader
  font-weight bold

.headerIcon
  float left
  height 55px
  width 55px
  position relative
  top 7px
  left 7px
  -webkit-mask-size contain
  -webkit-mask-position top left
  -webkit-mask-repeat no-repeat

</style>
