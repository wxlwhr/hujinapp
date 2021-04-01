<template>
  <el-card class="CoupleBack">
    <div slot="header" class="clearfix btnCard">
      <span>通知公告</span>
      <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
    </div>
    <div class="title">
      <h2 class="titleDetail">{{ formDate.title }}</h2>
      <span>机构名称：{{ formDate.rinm }}</span>
      <span>反馈时间：{{ formDate.backDate }}</span>
      <div class="divider divider-horizontal" />
    </div>
    <div class="contentDetail" />
    <el-row>
      <el-col :span="24">
        <p>通知公告内容：</p>
        <!-- <el-card shadow="never" class="cardStyle">
          <div id="note" class="contentDe" v-html="formDate.note"/>
        </el-card> -->
        <quill-editor
          id="note"
          ref="myQuillEditor"
          v-model.trim="formDate.note"
          style="border-top: 1px solid #ccc"
          disabled
        />
      </el-col>
      <el-col :span="24">
        <p>反馈内容：</p>
        <el-input
          v-model="formDate.fbInfo"
          :autosize="{ minRows: 7, maxRows: 9}"
          type="textarea"
          disabled
        />
      </el-col>
      <el-col :span="24">
        <p>反馈附件：</p>
        <div v-if="formDate.listFile.length === 0">
          <span>无</span>
        </div>
        <div v-for="(item,idx) in formDate.listFile" v-else :key="idx">
          <el-button class="fileBtnStyle" type="text" @click="downAttach(item.attachId)">{{ item.attachName }}</el-button>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { getToken } from '@/utils/auth'
import { queryOrgByRiid } from '@/api/notice/noteBack.js'
import { param2Obj } from '@/utils/index'
export default {
  name: 'CoupleBack',
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      formDate: {
        backDate: '', // 反馈时间
        fbInfo: '',
        rinm: '',
        title: '',
        note: '',
        listFile: []
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const paramsObj = {
        noteId: this.$route.query.noteId,
        riid: this.$route.query.riid,
        pnrId: this.$route.query.pnrId
      }
      queryOrgByRiid(paramsObj).then(res => {
        this.formDate.listFile = res.listFile
        this.formDate.title = res.listNote[0].title
        this.formDate.rinm = res.listNote[0].deptName
        this.formDate.note = res.listNote[0].note
        this.formDate.fbInfo = res.pnr.fbInfo
        this.formDate.backDate = res.pnr.fbTime
        this.$nextTick(function() {
          var imgObj = document.getElementById('note').getElementsByTagName('img')
          for (let i = 0; i < imgObj.length; i++) {
            var srcObj = param2Obj(imgObj[i].src)
            imgObj[i].src = `/nifaNote/riskConcern/showImage?imgPathEncode=${srcObj.imgPathEncode}` + '&token=' + getToken()
          }
        })
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    // 下载
    downAttach(val) {
      location.href = `nifaNote/note/downloadFile?attachId=${val}&token=${getToken()}`
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.CoupleBack{
  position: relative;
  .ql-toolbar.ql-snow{
    display: none
  }
  .el-textarea.is-disabled .el-textarea__inner{
    background-color: white;
    color:black
  }
  padding-top: 30px;
    .back {
    width: 45px;
    height: 45px;
    position: absolute;
    top: -19px;
    right: -20px;
    }
  .title {
    height: 55px;
    font-size: 16px;
    color: #001d38;
    margin: 0 24px;
    text-align: center;
    span {
      font-size: 12px;
      color: #666;
      margin: 0 50px;
    }
  }
  .contentDetail {
    margin-top: 20px;
    margin-bottom: 20px;
    overflow: auto;
    & p {
      text-indent: 20px;
      font-size: 0.9em;
      line-height: 20px;
    }
  }
  .cardStyle{
    .el-card__body{
      padding: 0;
    }
    .contentDe {
     margin: 0;
    // overflow: auto;
    width: 100%;
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;
    & p {
      margin: 0;
      // text-indent: 20px;
      font-size: 0.9em;
      // line-height: 20px;
    }
   }
  }
  .divBox{
    padding:10px 20px;
  }
  .btnBox{
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}
</style>
