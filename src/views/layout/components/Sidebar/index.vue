<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <div style="height:100px" class="Img">
        <img v-if="!isCollapse" src="@/assets/new3logo.png" style="width:200px" height="100px">
      </div>
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetsidebarStatus } from '@/utils/auth'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      istrue: GetsidebarStatus()
    }
  },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    permission_routers() {
    }
  }
  // methods: {
  //   GetsidebarStatus()

  // }
}
</script>
<style>
.Img {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
