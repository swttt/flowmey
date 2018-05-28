<template lang="pug">

router-link(:to="{ name: 'Flow', params: { flow: flow.id } }")
  div.flow
    span.has-text-white(v-if="flow.enabled")
      span.paddingright3
        i.fas.fa-random
      | {{flow.title}}
    span.has-text-white.disabled(v-else)
      span.paddingright3
        i.fas.fa-ban
      | {{flow.title}}
    span.has-text-white.paddingleft3.disabled(v-if="flow.broken")
      i.fas.fa-unlink

</template>

<script>

export default {
  name: 'flow',
  props: ['flow'],
  components: {
  }
};

</script>

<style scoped lang="stylus">

.disabled
  opacity 0.5

.paddingright3
  padding-right 3px

.paddingleft3
  padding-left 3px

</style>
