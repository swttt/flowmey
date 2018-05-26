<template lang="pug">
  div.sidebar

    img.logo(src="~assets/images/logo.svg")

    div.field
      p.control.has-icons-left
        input.input(type="search" v-model="search" placeholder="Search...")
        span.icon.is-left
          i.fas.fa-search

    items.items(v-bind:obj="flowsandfolders" v-if="!search")
    items.items(v-bind:obj="filterFlows" v-if="search && filterFlows.length")
    div(v-if="search && !filterFlows.length")
      center.has-text-white No matching flows found!

</template>

<script>
import lodash from 'lodash'
import items from '@/components/sidebar/items'

export default {
  name: 'Sidebar',
  components: {
    items
  },
  data () {
    return {
      folders: {},
      flows: {},
      search: null
    }
  },
  created () {
    this.$homey.flow.getFolders()
      .then(result => {
        this.folders = result
      })

    this.$homey.flow.getFlows()
      .then(result => {
        this.flows = result
        console.log(this.convert(false))
      })
  },
  methods: {
    convert (folder) {
      var arr = {...this.flows, ...this.folders}
      arr = lodash.orderBy(arr, 'order')
      var out = []
      for (var i in arr) {
        var obj = arr[i]
        if (obj.folder === folder) {
          var children = this.convert(obj.id)

          if (children.length) {
            obj.children = children
          }
          out.push(obj)
        }
      }
      return out
    }
  },
  computed: {
    flowsandfolders: function () {
      return this.convert(false)
    },
    filterFlows: function () {
      var self = this
      return lodash.filter(this.flows, (flow) => {
        return lodash.includes(flow.title.toLowerCase(), self.search.toLowerCase())
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~styles/variables.styl'

.logo
  display: block
  margin: auto
  padding-bottom 20px
  width auto
  height 80px

.sidebar
  background: #00A5FF
  box-shadow: 3px 0 10px 0 rgba(0,0,0,0.50)
  z-index 2

.items
  overflow-y scroll
  height calc(100vh - 150px)

</style>
