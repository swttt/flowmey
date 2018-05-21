// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import querystring from 'query-string'
// import lodash from 'lodash'

require('styles/main.styl')
require('styles/bulma.sass')

Vue.config.productionTip = false

// INIT Athom API
Vue.prototype.$athomCloud = new window.AthomAPI.AthomCloudAPI({
  clientId: '5a8d4ca6eb9f7a2c9d6ccf6d',
  clientSecret: 'e3ace394af9f615857ceaa61b053f966ddcfb12a',
  redirectUrl: 'http://localhost'
})

Vue.prototype.$homeyAPI = window.AthomAPI.HomeyAPI

Vue.prototype.$athomCloud
  .on('token', token => {
    window.localStorage.setItem('token', JSON.stringify(token))
  })
  .on('logout', () => {
    window.localStorage.removeItem('token')
  })

// Homey Auth
let token = window.localStorage.getItem('token')
let qs = querystring.parse(window.location.search)

if (token) {
  Vue.prototype.$athomCloud.setToken(JSON.parse(token))
    .then(result => {
      token = result
      init()
    })
} else if (!token && qs.code) {
  Vue.prototype.$athomCloud.authenticateWithAuthorizationCode(qs.code)
    .then(result => {
      token = result
      window.history.pushState({}, '', '/')
      init()
    })
} else {
  document.location.href = Vue.prototype.$athomCloud.getLoginUrl()
}

function init () {
  Vue.prototype.$athomCloud.getAuthenticatedUser()
    .then(user => {
      let homeys = user.getHomeys()
      Vue.prototype.$homeyAPI.forHomeyObject(homeys[0])
        .then(result => {
          Vue.prototype.$homey = result
          loadVue()
        })
      // FIX HOMEY SELECTOR!
      // if (homeys.length === 1) {
      //   Vue.prototype.$homeyAPI.forHomeyObject(homeys[0])
      //     .then(result => {
      //       Vue.prototype.$homey = result
      //       loadVue()
      //     })
      // } else {
      //   console.log('multiple homeys')
      // }
    })
}

function loadVue () {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: {
      App
    },
    template: '<App/>'
  })
}
