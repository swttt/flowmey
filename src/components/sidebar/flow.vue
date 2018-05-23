<template lang="pug">
span.flow.has-text-white
  icon(v-if="flow.enabled")
    i.fas.fa-random.has-text-white
    | {{flow.title}}
  icon(v-else)
    i.fas.fa-random.has-text-white
    strike {{flow.title}}

</template>

<script>

export default {
  name: 'flow',
  props: ['flow'],
  components: {
  }
}

</script>

<style lang="stylus">

</style>
