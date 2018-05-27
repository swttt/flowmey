<template lang="pug">
  div#app
    sidebar
    router-view
</template>

<script>
import sidebar from '@/components/sidebar/sidebar';
// import Vue from 'vue'
// import queryString from 'query-string'
// import lodash from 'lodash'

export default {
  name: 'App',
  data() {
    return {
      multipleHomeys: true,
      allHomeys: []
    };
  },
  // methods: {
  //   async selectHomey (id) {
  //     this.multipleHomeys = await false
  //     let selectedHomey = await this.$homeyAPI.forHomeyObject(lodash.find(this.allHomeys, function (homey) {
  //       return homey.id === id
  //     }))
  //     Vue.prototype.$homey = await selectedHomey
  //   }
  // },
  async created() {
    // empty
  },
  components: { sidebar }
};
</script>

<style lang="stylus">
@import '~styles/variables.styl'

</style>
