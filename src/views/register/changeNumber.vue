<template>
  <div class="errPage-container">
    <div>
      <img :src="duigou" alt="" style="width:260px;height:260px;border-radius:50%">
    </div>
    <div>
      <p class="fontd">温馨提示</p>
      <p class="font">您好！如果您的注册账号密码忘记了，并且注册时预留的手机号不可接收短信，请您致电400-800-9616与客服人员取得联系！</p>
      <el-button class="font3" type="primary" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import duigou from '@/assets/login/timg.jpeg'
export default {
  name: 'Page401',
  data() {
    return {
      duigou: duigou
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
  width:800px;
  display: flex;
  justify-content: center;
  align-items: center;
   position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  .font{
    margin-left: 110px;
    font-size: 16px;
    color:#9acb36;
    }
    .fontd{
      margin-left: 110px;
      font-size: 35px;
    }
    .font3{
      margin-left: 110px;
      // color:#409EFF;
    }
  }
</style>
