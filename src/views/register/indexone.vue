<template>
  <el-card class="tishi">
    <div slot="header" class="header">
      <div style="margin-left:5%">
        <img :src="bgMonitorImg" alt="">
      </div>
    </div>
    <h2 style="width:100%;text-align:center;margin-top:50px">选择注册机构类型</h2>
    <div style="text-align:center;padding-bottom:10px;color:red">注册机构类型选择后无法修改，请确认选择无误</div>
    <el-row :gutter="20" class="row-bg" type="flex" justify="center" style="margin-top:9vh;">
      <el-col :span="5" style="textAlign:center" class="minBox">
        <el-button style="width:220px;height:160px;" round @click="isJigou('0')">
          <img :src="picture11" alt="" style="width:50px;height:36px;vertical-align:middle;margin-right:10px"><span style="font-size: 16px;">金融机构</span>
        </el-button>
      </el-col>
      <el-col :span="5" style="textAlign:center" class="minBox">
        <el-button style="width:220px;height:160px" round @click="isJigou('2')">
          <img :src="picture11" alt="" style="width:50px;height:36px;vertical-align:middle;margin-right:10px"><span style="font-size: 16px;">认证机构</span>
        </el-button>
      </el-col>
      <el-col :span="5" style="textAlign:center" class="minBox">
        <el-button style="width:220px;height:160px" round @click="isJigou('1')">
          <img :src="picture11" alt="" style="width:50px;height:36px;vertical-align:middle;margin-right:10px"><span style="font-size: 16px;">检测机构</span>
        </el-button>
      </el-col>
      <el-col :span="5" style="textAlign:center" class="minBox">
        <el-button style="width:220px;height:160px" round @click="isJigou('3')">
          <img :src="picture11" alt="" style="width:50px;height:36px;vertical-align:middle;margin-right:10px"><span style="font-size: 16px;">科技公司</span>
        </el-button>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24" style="text-align:center;margin-top:50px">
        <el-button type="primary" @click="submitForm()">下一步</el-button>
        <el-button @click="goBack">退出</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import bgMonitor from '@/assets/login/logow.png'
import picture11 from '@/assets/register/相关材料1.png'
export default {
  data() {
    return {
      bgMonitorImg: bgMonitor,
      picture11: picture11,
      jigou: ''
    }
  },
  methods: {
    isJigou(num) {
      this.jigou = num
    },
    submitForm() {
      if (this.jigou === '') {
        this.$message({
          message: '您需要先选择机构类型',
          type: 'warning'
        })
      } else if (this.jigou === '0') {
        this.$confirm('您确定选择<span style="color:red;font-size:20px">金融机构</span>吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.push({ path: '/registerone' })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消选择'
          })
          this.jigou = ''
        })
      } else if (this.jigou === '1') {
        this.$confirm('您确定选择<span style="color:red;font-size:20px">检测机构</span>吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.push({ path: '/registerJc' })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消选择'
          })
          this.jigou = ''
        })
      } else if (this.jigou === '2') {
        this.$confirm('您确定选择<span style="color:red;font-size:20px">认证机构</span>吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.push({ path: '/registerRz' })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消选择'
          })
          this.jigou = ''
        })
      } else {
        this.$confirm('本注册入口仅面向提供安全技术产品或安全服务的科技公司，如需备案App，请通过“金融机构”入口进行注册。请确认是否继续选择“科技公司”？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.push({ path: '/registerKj' })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消选择'
          })
          this.jigou = ''
        })
      }
    },
    // 返回
    goBack() {
      this.$store.dispatch('MostforcedLogOut').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style lang="scss">
.tishi{
  width: 100%;
  height:100%;
  .el-card__header{
    height: 80px;
    line-height: 80px;
  }
}
</style>

