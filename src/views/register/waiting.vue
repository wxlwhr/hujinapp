<template>
  <div class="errPage-container">
    <div class="imgone">
      <img :src="duigou" alt="">
    </div>
    <div>
      <p class="font">恭喜您，注册成功！</p>
      <p class="font">请您登录后，完善机构信息并提交审核！</p>
      <router-link to="/login"><el-button type="text" class="font3">返回首页</el-button></router-link>
    </div>
  </div>
</template>

<script>
import duigou from '@/assets/login/对勾.png'
export default {
  name: 'Page401',
  data() {
    return {
      duigou: duigou
    }
  },
  methods: {}
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
    font-size: 24px;
    color:#9acb36;
    }
    .font2{
      margin-left: 110px;
      font-size: 11px;
      color:#9b9b9b;
    }
    .font3{
      margin-left: 110px;
      color:#409EFF;
    }
  }
</style>
