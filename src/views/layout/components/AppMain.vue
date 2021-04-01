<template>
  <section class="app-main">
    <!-- <el-card :body-style="siteContentViewHeight"> -->
    <el-popover
      v-if="$store.getters.srnm === '0' && showFlag"
      v-model="visible"
      placement="top"
      width="220"
      style="position:fixed;right:240px;bottom:150px;z-index:100000"
    >
      <p><i class="el-icon-info" style="color:#409EFF" /> 产品服务信息功能上线啦，要去看看吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="goProduct()">确定</el-button>
      </div>
    </el-popover>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <!-- </el-card> -->
    <section class="mainPageFooter">
      <p>Copyright©2019中国互联网金融协会 联系我们：finapp@nifa.org.cn 400-800-9616</p>
    </section>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      showFlag: false,
      visible: true
    }
  },
  computed: {
    documentClientHeight: {
      get() { return this.$store.state.app.documentClientHeight }
    },
    siteContentViewHeight() {
      var height = this.documentClientHeight
      return { minHeight: height + 'px' }
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  mounted() {
    const a = this.$store.getters.permissions_routers.indexOf('sys:appRecord')
    if (a !== -1) {
      this.showFlag = true
    } else {
      this.showFlag = false
    }
  },
  methods: {
    goProduct() {
      this.$router.push({
        name: 'productsMsg'
      })
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  // min-height: calc(100vh - 84px);
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 15px;
}
.mainPageFooter{
  width:100%;
  // min-width: 1146px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: #fff;
  color:#555;
  font-size: 14px;
}
</style>

