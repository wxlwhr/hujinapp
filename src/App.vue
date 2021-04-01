<template>
  <div id="app" :class="{AppwidthStyle:IsPC()}">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    IsPC() {
      const userAgentInfo = navigator.userAgent
      const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      let flag = true
      for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0 && (this.$route.name === 'list' || this.$route.name === 'beianxiang' || this.$route.name === 'report' || this.$route.name === 'choseReportWay' || this.$route.name === 'reportSearch' || this.$route.name === 'wouldLikeReport' || this.$route.name === 'wouldLikeReportTN')) {
          flag = false
          break
        }
      }
      return flag
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss">
  .AppwidthStyle {
    min-width:1200px
   }
</style>
