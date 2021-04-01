<template>
  <el-card class="notice-detail">
    <div slot="header" class="clearfix btnCard">
      <span>通知详情</span>
      <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
    </div>
    <h2 style="text-align:center">{{ form.title }}</h2>
    <el-row :gutter="20">
      <el-col :span="12" style="text-align:right">
        <span style="font-size:14px;">发布部门：{{ form.createDeptName }} </span>
      </el-col>
      <el-col :span="12">
        <span style="font-size:14px;">发布日期：{{ form.createTime }} </span>
      </el-col>
    </el-row>
    <div class="divider divider-horizontal" />
    <el-row v-if="deptcode === 'S0000000000001'">
      <el-col :span="24">
        <span style="font-size: 13px;font-weight: 500;">发送部门</span>
      </el-col>
      <el-col :span="24" style="padding-top:10px">
        <el-input
          v-model="form.riid"
          type="textarea"
          :rows="5"
          disabled
          placeholder=""
        />
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <span style="font-size: 13px;font-weight: 500;">内容</span>
      </el-col>
      <el-col :span="24" style="padding-top:10px">
        <!-- <quill-editor
          id="note"
          ref="myQuillEditor"
          v-model="form.content"
          style="border: 1px solid #ccc;height:300px;white-space:pre-wrap;"
          disabled
        /> -->
        <editor v-model="form.content" :title="false" :disable="true" :mobile-filter="true" />
      </el-col>
    </el-row>
    <br>
    <el-row v-show="fileList.length>0">
      <el-col :span="24">
        <span style="font-size: 13px;font-weight: 500;">附件下载</span>
      </el-col>
      <el-col :span="24" style="margin-top:30px;">
        <el-row :gutter="20">
          <el-col v-for="item in fileList" :key="item.fileID" :span="3">
            <!-- <p style="color:#409EFF;cursor:pointer" @click="fileDownload2(item.fileID)">{{ item.name }}</p> -->
            <el-image
              style="width: 120px; height: 120px;border-radius: 6px 6px;"
              :src="item.url"
              :preview-src-list="item.srcList"
            >
              <div slot="error" class="el-image__error" style="cursor:pointer;color:#333" @click="fileDownload(item)">
                <pdf
                  v-if="item.testmsg==='pdf'"
                  :src="item.url"
                  :page="1"
                />
                <span v-else>格式不支持预览<br>请点击下载</span>
              </div>
            </el-image>
          </el-col>
        </el-row>
      </el-col>
      <!-- <el-col :span="12" style="padding-top:10px">
        <el-table :data="fileList" :show-header="false" style="width: 100%;" empty-text="暂无文件">
          <el-table-column prop="originalName" label="名称" show-overflow-tooltip />
          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <span style="color:#409EFF;cursor:pointer" @click="fileDownload(scope.row)">{{ scope.row.testmsg==='pdf'?'预览':'下载' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col> -->
    </el-row>
    <div style="text-align:center;padding-top:50px">
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
    <workflow ref="referencePdf" />
  </el-card>
</template>
<script>
import { getVivw } from '@/api/notice/details.js'
import { HXSearchFil } from '@/api/register/register.js'
import Editor from '@/components/Editor.vue'
// import { param2Obj } from '@/utils/index'
// import { getToken } from '@/utils/auth'
import pdf from 'vue-pdf'
export default {
  components: {
    Editor,
    pdf
  },
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      fileList: [],
      deptcode: this.$store.getters.deptcode,
      form: {
        title: '',
        createTime: '',
        content: '',
        riid: '',
        createDeptName: '',
        riidList: []
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getVivw(this.$route.query.id).then(res => {
        for (var key in res) {
          this.form[key] = res[key]
        }
      })
      // this.$nextTick(function() {
      //   var imgObj = document.getElementById('note').getElementsByTagName('img')
      //   for (let i = 0; i < imgObj.length; i++) {
      //     var srcObj = param2Obj(imgObj[i].src)
      //     imgObj[i].src = `nifa-autonomy-file/upload/showImage?imgPathEncode=${srcObj.imgPathEncode}` + '&token=' + getToken()
      //   }
      // })
      HXSearchFil(this.$route.query.id).then(res => {
        res.forEach(element => {
          if (element.ownSystem === '20') {
            this.fileList.push(
              {
                originalName: element.originalName,
                url: element.preview,
                srcList: [element.preview],
                testmsg: (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase(),
                fileID: element.attachId
              }
            )
          }
        })
      })
    },
    fileDownload(row) {
      if (row.testmsg === 'pdf') {
        this.$refs.referencePdf.open(row.url, row.fileID)
      } else {
        location.href = `nifa-autonomy-file/upload/download/${row.fileID}`
      }
    },
    goBack() {
      if (sessionStorage.getItem('routerName') === 'home-index') {
        this.$router.go(-1)
      } else {
        const obj = JSON.parse(this.$route.query.searchData)
        obj.ifReview = true
        this.$router.push({
          name: sessionStorage.getItem('routerName'),
          params: {
            searchData: obj,
            tabMsg: sessionStorage.getItem('tabMsg')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.notice-detail {
  // .ql-toolbar.ql-snow{
  //   display: none
  // }
   .w-e-toolbar{
    border:none !important;
  }
  // .w-e-text img{
  //   width: inherit !important;
  // }
  .w-e-text-container{
    border:1px solid #ccc !important;
  }
    .el-table .cell {
    text-align: left;
    color: #333;
  }
  .el-textarea__inner{
    resize: none;
  }
  .el-textarea.is-disabled .el-textarea__inner{
    background-color: #fff;
    word-break: break-all;
  }
  .el-input.is-disabled .el-input__inner{
     background-color: #fff;
  }
}
</style>
