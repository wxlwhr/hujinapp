<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device==='mobile'&&sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <!-- <tags-view /> -->
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view :key="key" />
          </keep-alive>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  mounted() {
  },
  methods: {

    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .app-main__wrapper {
    position: relative;
    min-height: 100%;
    background: #f1f4f5;
  }

  .app-main {
  /*84 = navbar + tags-view = 50 +34 */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 15px;
  background: #f1f4f5;
}
</style>
