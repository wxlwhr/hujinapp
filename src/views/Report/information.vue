<template>
  <el-card class="newCope">
    <div slot="header" class="clearfix btnCard">
      <span>投诉详情</span>
      <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="150px" disabled style="padding:0 25px;">
      <el-tabs v-model="activeName">
        <el-tab-pane label="投诉信息" name="0">
          <el-row>
            <el-col :span="24">
              <el-form-item label="被投诉机构名称" prop="rinm">
                <el-input v-model="form.rinm" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col v-if="form.complaintsType === '2'" :span="24">
              <el-form-item label="项目名称" prop="appName">
                <el-input v-model="form.appName" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="投诉类型" prop="complaintsType">
                <el-input v-model="complaintsType" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col v-if="form.complaintsType === '2'" :span="24">
              <el-form-item label="金融业务发生省市" prop="businessAddress">
                <el-input v-model="form.businessAddress" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col v-if="form.complaintsType === '1'" :span="24">
              <el-form-item label="App名称" prop="appName">
                <el-input v-model="form.appName" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="投诉事件发生时间段" prop="time">
                <el-input v-model="form.time" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="投诉标题" prop="title">
                <el-input v-model="form.title" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col v-if="form.complaintsType === '1'" :span="24">
              <el-form-item label="投诉类别" prop="complainantSort">
                <el-input v-model="form.complainantSort" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="投诉内容描述" prop="complainantInfo">
                <editor v-model="form.complainantInfo" :title="false" :disable="true" :mobile-filter="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" style="padding-top:10px">
              <el-form-item label="其他证据">
                <el-input v-model="fileName2" disabled style="width: 100%">
                  <template v-if="fileID2" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload2"><i class="el-icon-download">下载</i></span></template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="投诉人信息" name="1">
          <el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="联系人姓名" prop="complainantName">
                  <el-input v-model="form.complainantName" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="联系方式" prop="complainantPhone">
                  <el-input v-model="form.complainantPhone" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="投诉人所在省市" prop="complainantAddress">
                  <el-input v-model="form.complainantAddress" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-tab-pane>
        <el-tab-pane v-if="(this.$route.query.type === '2'|| this.$route.query.type === '3')&& form.processStatus === '已受理'" label="投诉处理" name="2">
          <el-row>
            <el-col :span="24">
              <el-form-item label="处理结果" prop="result">
                <el-input v-model="form.result" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="处理结果说明" prop="resultDetail">
                <el-input
                  v-model="form.resultDetail"
                  type="textarea"
                  :rows="5"
                  disabled
                  placeholder=""
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" style="padding-top:10px">
              <el-form-item label="附件信息" prop="title">
                <el-input v-model="fileName3" disabled style="width: 100%">
                  <template v-if="fileID3" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload3"><i class="el-icon-download">下载</i></span></template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div class="bottonBtn">
      <el-button v-if="this.$route.query.type === '1'" type="primary" @click="sendNodeCl('form')">处理</el-button>
      <el-button v-if="this.$route.query.type !== '3'" @click="goBack">返回</el-button>
      <el-button v-if="this.$route.query.type === '3'" type="primary" @click="goBack">返回</el-button>
    </div>
    <el-dialog :visible.sync="centerDialogCl" title="投诉处理" width="60%" center>
      <hr class="hrStyle">
      <br>
      <div style="padding: 0 20px">
        <el-form ref="reportFormCl" :model="reportFormCl" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="处理结果" prop="result">
                <el-select v-model="reportFormCl.result" placeholder="请选择">
                  <el-option
                    v-for="item in resultArr"
                    :key="item.codeKey"
                    :label="item.codeValue"
                    :value="item.codeValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="处理结果说明" prop="resultDetail">
                <el-input v-model="reportFormCl.resultDetail" :rows="5" type="textarea" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="附件上传" prop="fileName1">
                <el-input v-model="fileName1" disabled style="width: 100%">
                  <template slot="prepend">
                    <el-button v-show="fileName1" type="primary" @click="clearFile">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                    <el-upload
                      v-show="!fileName1"
                      ref="upload"
                      :auto-upload="false"
                      :on-change="handleChange"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :on-error="handleAvatarerr"
                      :action="actionUrl"
                      class="upload-demo"
                    >
                      <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                    </el-upload>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isReasonable('reportFormCl')">提 交</el-button>
        <el-button @click="centerDialogCl = false">关 闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import Editor from '@/components/Editor.vue'
import { getClock } from '@/api/general.js'
import { reportFileUpload } from '@/utils/formValidate'
import { inform, update } from '@/api/report.js'
import { HXSearchFil } from '@/api/appbeian/register.js'
export default {
  components: {
    Editor
  },
  data() {
    return {
      complainantSortOptions: [],
      fileName3: '',
      fileID3: '',
      fileID2: '',
      fileName2: '',
      fileName1: '',
      complaintsType: '',
      reportFormQr: {
        queren: '',
        comment: ''
      },
      reportFormCl: {
        result: '',
        resultDetail: ''
      },
      activeName: '0',
      centerDialogCl: false,
      fileList: [],
      fileArr: [],
      loading: null,
      form: {
        rinm: '',
        time: '',
        complaintsType: '',
        businessAddress: '',
        appName: '',
        complainantStartTime: '',
        complainantEndTime: '',
        title: '',
        complainantSort: '',
        complainantInfo: '',
        complainantName: '',
        complainantPhone: '',
        complainantAddress: ''
      },
      querenArr: [
        {
          codeKey: '01',
          codeValue: '确认'
        },
        {
          codeKey: '02',
          codeValue: '已解决'
        }
      ],
      resultArr: [
        {
          codeKey: '已核实并处理',
          codeValue: '已核实并处理'
        },
        {
          codeKey: '确认不予受理',
          codeValue: '确认不予受理'
        },
        {
          codeKey: '其他',
          codeValue: '其他'
        }
      ],
      rules: {
        title: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { pattern: /^[^ ]+$/, message: '不能含有空格', trigger: 'blur' }],
        result: [{ required: true, message: '请选择', trigger: 'change' }],
        resultDetail: [{ required: true, message: '内容不能为空且最多500个字符', trigger: 'blur', max: 500 }],
        rinm: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { pattern: /^[^ ]+$/, message: '不能含有空格', trigger: 'blur' }],
        appName: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { pattern: /^[^ ]+$/, message: '不能含有空格', trigger: 'blur' }],
        complainantInfo: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { pattern: /^[^ ]+$/, message: '不能含有空格', trigger: 'blur' }],
        complainantPhone: [{ required: true, message: '内容不能为空', trigger: 'blur' }, { pattern: /^[^ ]+$/, message: '不能含有空格', trigger: 'blur' }]

      }
    }
  },
  computed: {
    actionUrl() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.$route.query.id}&ownSystem=27&ownBusiness=nifaReport`
    }
  },
  mounted() {
    getClock('C6100000').then(res1 => {
      this.complainantSortOptions = res1
      inform(this.$route.query.id).then(res => {
        this.form = res
        this.form.complainantName = this.form.complainantName ? this.form.complainantName : '暂无'
        this.form.complainantAddress = this.form.complainantAddress ? this.form.complainantAddress : '暂无'
        this.form.time = res.complainantStartTime ? res.complainantStartTime.substr(0, 10) + ' 至 ' + res.complainantEndTime.substr(0, 10) : '暂无'
        if (this.form.complaintsType === '2') {
          this.form.businessAddress = this.form.businessAddress ? this.form.businessAddress.substr(0, this.form.businessAddress.length - 1) : ''
        }
        this.complaintsType = res.complaintsType === '1' ? '金融移动客户端备案投诉' : '金融科技创新投诉'
        this.form.complainantSort = res.complainantSort.length > 0 ? this.complainantSortOptions.filter(item => item.codeKey === res.complainantSort)[0].codeValue : '暂无'
      })
    })
    HXSearchFil(this.$route.query.id).then(res => {
      res.forEach(element => {
        if (element.ownSystem === '26') {
          this.fileName2 = element.originalName
          this.fileID2 = element.attachId
        } else if (element.ownSystem === '27') {
          this.fileName3 = element.originalName
          this.fileID3 = element.attachId
        }
      })
    })
  },
  methods: {
    clearFile() {
      this.fileName1 = ''
    },
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        this.fileName1 = fileList[0].name
      } else {
        this.fileName1 = fileList[0].name
      }
      // const isLt10M = file.size / 1024 / 1024 < 260
      // if (!isLt10M) {
      //   this.$message.error('上传文件大小不能超过 260MB!')
      //   this.form.fileName5 = ''
      //   return false
      // }
      if (!reportFileUpload(file)) {
        this.fileName1 = ''
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess(res) {
      if (res.code !== 200) {
        this.handleAvatarerr()
      }
    },
    // 文件上传失败回调
    handleAvatarerr() {
      this.fileName1 = ''
      this.$confirm('您的其他证据上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    sendNodeCl() {
      this.centerDialogCl = true
    },
    isReasonable() {
      this.$refs.reportFormCl.validate((valid) => {
        if (valid) {
          this.$confirm(
            '确认信息已准确无误填写？',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }
          ).then(() => {
            this.loading = this.$loading({
              lock: true
            })
            this.$refs.upload.submit()
            this.reportFormCl.id = this.$route.query.id
            this.reportFormCl.processStatus = '已受理'
            update(this.reportFormCl).then(res => {
              this.loading.close()
              this.$message({
                type: 'success',
                message: '处理成功'
              })
              this.$router.push({
                name: 'reportXH'
              })
            })
            this.centerDialogCl = false
          }).catch(() => {})
        } else {
          this.$message.error('您尚有未填写的必填项')
          return false
        }
      })
    },
    fileDownload2() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID2}`
    },
    fileDownload3() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID3}`
    },
    // 返回
    goBack() {
      const obj = JSON.parse(this.$route.query.searchData)
      obj.ifReview = true
      this.$router.push({
        name: sessionStorage.getItem('routerName'),
        params: {
          searchData: obj
        }
      })
    }
  }
}
</script>
<style  lang="scss">
.newCope {
  .bottonBtn {
    margin-top: 10px;
    text-align: center;
  }
  .jgxqStyle{
  margin: 12px auto;
  border-color: #a2b9f0;
  border-radius: 6px 6px;
  padding: 30px 50px;
  }
  .treeStyle{
   padding: 10px;
   min-height: 400px;
   max-height: 400px;
   overflow:scroll;
   border: 1px solid #ccc;
   .el-input__inner:focus{
    border-color: #409EFF;
   }
   .el-input__inner{
    border-color: #C0C4CC;
   }
  }
      .el-input-group__append button.el-button,
    .el-input-group__append div.el-select .el-input__inner,
    .el-input-group__append div.el-select:hover .el-input__inner,
    .el-input-group__prepend button.el-button,
    .el-input-group__prepend div.el-select .el-input__inner,
    .el-input-group__prepend div.el-select:hover .el-input__inner {
      color: #ffffff;
      background: #409eff;
    }
  .quillBox{
    .el-form-item__error{
      position: initial;
    }
    .quillMark{padding:0;margin:0;}
    .ql-editor{height: 300px;}
  }
}
</style>
