<template>
  <div id="app">
    <sidebar/>
    <router-view/>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar/sidebar'
export default {
  name: 'App',
  components:{
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
