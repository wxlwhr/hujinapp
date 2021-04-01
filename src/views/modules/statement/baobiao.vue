<template>
  <el-card class="iframeStyle">
    <iframe :src="Urlsrc" frameborder="0" marginWidth="20" marginHeight="0" width="100%" height="100%" scrolling="no" />
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      // Urlsrc: 'BI471/esmain/login.do?id=appreport&pw=appreport&url=../showreport.do?showmenu=false%26resid=EBI$12$C30CYAMRJ1A6N063L3UKPZO8123MWUSJ$1$C4CZTZSKKI42ICI40UU2OT8F2T4E9JJA.rpttpl'
      Urlsrc: 'BI471/esmain/login.do?id=appreport&pw=appreport&url=../showreport.do?showmenu=false%26resid=EBI$12$C30CYAMRJ1A6N063L3UKPZO8123MWUSJ$1$C4CZTZSKKI42ICI40UU2OT8F2T4E9JJA.rpttpl%26calcnow=true'
    }
  }
}
</script>
<style lang="scss">
.iframeStyle{
    iframe{
      min-height: calc(100vh - 120px);
    }
  }
</style>
