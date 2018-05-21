<template lang="pug">
  div.sidebar
    img.logo(src="~assets/images/logo.svg")
    div.field
      p.control.has-icons-left
        input.input(type="search" placeholder="Search...")
        span.icon.is-left
          i.fas.fa-search

</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style lang="stylus">
@import '~styles/variables.styl'

.logo
  display: block
  margin: auto
  padding-bottom 20px
  width 75%
  height auto

.sidebar
  background: #00A5FF
  box-shadow: 3px 0 10px 0 rgba(0,0,0,0.50)
  z-index 2

</style>
