// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

require('styles/main.styl')
require('styles/bulma.sass')

// Bulma imports
// require('bulma/sass/utilities/_all')

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
