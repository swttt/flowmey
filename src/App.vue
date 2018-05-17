<template lang="pug">
  div#app
    sidebar(v-if="!multipleHomeys")
    router-view(v-if="!multipleHomeys")
    div(v-if="multipleHomeys")
      ul
        li(v-for="homey in allHomeys" v-on:click="selectHomey(homey.id)" :key="homey.id") {{homey.name}}
</template>

<script>
import sidebar from '@/components/sidebar/sidebar'
import Vue from 'vue'
import queryString from 'query-string'
import lodash from 'lodash'

export default {
  name: 'App',
  data () {
    return {
      multipleHomeys: true,
      allHomeys: []
    }
  },
  methods: {
    async selectHomey (id) {
      this.multipleHomeys = await false
      let selectedHomey = await this.$homeyAPI.forHomeyObject(lodash.find(this.allHomeys, function (homey) {
        return homey.id === id
      }))
      Vue.prototype.$homey = await selectedHomey
    }
  },
  async created () {
    let token = window.localStorage.getItem('token')
    if (token) {
      token = await this.$athomCloud.setToken(JSON.parse(token))
    }
    let qs = queryString.parse(window.location.search)
    if (qs.code) {
      token = await this.$athomCloud.authenticateWithAuthorizationCode(qs.code)
      window.history.pushState({}, '', '/')
    }
    if (!token) {
      document.location.href = this.$athomCloud.getLoginUrl()
    }
    let user = await this.$athomCloud.getAuthenticatedUser()
    let userHomeys = await user.getHomeys()
    this.allHomeys = userHomeys
    if (userHomeys.length === 0) {
      this.multipleHomeys = false
      let firstHomey = await this.$homeyAPI.forHomeyObject(userHomeys[0])
      Vue.prototype.$homey = await firstHomey
    } else {
      this.multipleHomeys = true
    }
  },
  components: {
    sidebar
  }
}
</script>

<style lang="stylus">
@import '~styles/variables.styl'

#app
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0

</style>
