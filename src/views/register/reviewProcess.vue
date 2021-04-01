<template>
  <el-card class="reviewProcess">
    <div slot="header" class="header">
      <div style="margin-left:5%">
        <img src="@/assets/login/logow.png" alt="">
      </div>
    </div>
    <br>
    <div style="padding: 0 200px" shadow="hover">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top" color="#0bbd87">
          <div class="divStyle">
            <h4>注册信息复审通过</h4>
            <el-button type="text" @click="goZcxx('0')">查看注册信息</el-button>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top" color="red">
          <div class="divStyle">
            <h4>注册信息复审未通过</h4>
            <el-alert
              :closable="false"
              title="修改意见"
              type="warning"
              effect="dark"
            >
              <p>机构编码错误</p>
            </el-alert>
            <el-button type="text" @click="goZcxx('1')">修改注册信息</el-button>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top" color="#0bbd87">
          <div class="divStyle">
            <h4>注册信息复审中，请稍后</h4>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/12" placement="top" color="#0bbd87">
          <div class="divStyle">
            <h4>注册信息初审通过</h4>
            <el-button type="text" @click="goZcxx">查看注册信息</el-button>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top" color="red">
          <div class="divStyle">
            <h4>注册信息初审未通过</h4>
            <el-alert
              :closable="false"
              title="修改意见"
              type="warning"
              effect="dark"
            >
              <p>请上传高清营业执照图片</p>
            </el-alert>
            <el-button type="text" @click="goZcxx">修改注册信息</el-button>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top" color="#0bbd87">
          <div class="divStyle">
            <h4>注册信息初审中，请稍后</h4>
          </div>
        </el-timeline-item>
      </el-timeline>
      <br>
      <div>
        <el-row style="text-align:center;">
          <el-col :span="24">
            <el-button type="primary" @click="goApp">新增App备案</el-button>
            <el-button @click="goOut">退 出</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>

</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goApp() {
      this.$router.push({ name: 'AppRegistrationVivw', query: { type: 'sc' }})
    },
    goZcxx(num) {
      this.$router.push({ name: 'fillInfo', query: { type: num }})
    },
    goOut() {
      this.$store.dispatch('MostforcedLogOut').then(() => {
        this.$router.push({ path: '/login' })
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>
<style lang="scss">
.reviewProcess{
  .el-card__header{
  height: 80px;
  line-height: 80px;
  }
  .divStyle{
  background:rgb(245, 245, 245);
  border-radius: 6px;
  padding: 10px;
  }
  .divStyle:hover {
  box-shadow: 5px 10px 15px 2px rgba(0,0,0,0.1);
  }
}
</style>
