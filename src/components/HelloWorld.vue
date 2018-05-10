<template>
  <div class="container">
    <div class="sidebar">
      <center><img class="logo" src="@/assets/images/logo.png" /></center>
      <h1>Sidebar</h1>
    </div>
    <div class="content">
      <h1>Content</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
