<template>
  <div class="dialog">
    <el-dialog title="报告内容" top="10vh" :visible.sync="lookVisible" :before-close="handleClose">
      <hr style="margin-bottom:20px;margin-top:10px">
      <div>
        <div v-if="from !== '监管'">
          <el-row>
            <el-col>
              <span class="look_label">APP名称：</span>
              <span class="description">{{ dialogMsg.appName?dialogMsg.appName:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label">版本号：</span>
              <span class="description">{{ dialogMsg.appVersion?dialogMsg.appVersion:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label" style="float: left;display: block">金融机构名称：</span>
              <span class="description">{{ dialogMsg.rinm?dialogMsg.rinm:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label" style="float: left;display: block">报告监测日期：</span>
              <span class="description">{{ dialogMsg.monitorTime?dialogMsg.monitorTime:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label_jianguan">APP产品类型:</span>
              <span>
                <span v-if="dialogMsg.productType" class="description">
                  <el-tag v-if="dialogMsg.productType==='Android'" style="width:60px;text-align:center">
                    {{ dialogMsg.productType }}
                  </el-tag>
                  <el-tag v-else-if="dialogMsg.productType==='IOS'" type="success" style="width:60px;text-align:center">
                    {{ dialogMsg.productType }}
                  </el-tag>
                  <el-tag v-else-if="dialogMsg.productType==='other'" type="warning" style="width:60px;text-align:center">
                    {{ dialogMsg.productType }}
                  </el-tag>
                </span>
                <span v-else>
                  --
                </span>
              </span>
            </el-col>
          </el-row>
          <el-row v-show="fileList.length>0">
            <el-col :span="24">
              <div class="look_label">附件下载：</div>
            </el-col>
            <el-col :span="24" style="margin-top:10px;">
              <el-row :gutter="20">
                <el-col v-for="item in fileList" :key="item.fileID" :span="6">
                  <el-image
                    style="width: 120px; height: 120px;border-radius: 6px 6px;"
                    :src="item.url"
                    :preview-src-list="item.srcList"
                  >
                    <div slot="error" class="el-image__error" style="cursor:pointer;color:#333" @click="fileDownload1(item)">
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
          </el-row>
        </div>
      </div>
      <div style="height:24px;line-height: 24px;font-size: 18px;color: #303133;marginTop:20px">反馈结果</div>
      <hr v-if="from !== '监管'" style="margin-bottom:20px;margin-top:20px">
      <el-form v-if="from !== '监管'" ref="lookForm" :model="lookForm" label-width="90px">
        <el-row>
          <el-col>
            <el-form-item label="是否采纳：">
              <el-radio-group v-model="lookForm.accept" :disabled="disable">
                <el-radio :label="0">未采纳</el-radio>
                <el-radio :label="1">已采纳</el-radio>
                <el-radio v-if="disable" :label="2">未处理</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="说明：">
              <el-input v-model="lookForm.explain" :disabled="disable" type="textarea" maxlength="200"
              show-word-limit autocomplete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="附件：" prop="fileName">
              <el-input v-if="!disable" v-model="lookForm.fileName" disabled style="width: 100%">
                <template slot="prepend">
                  <el-button v-show="lookForm.fileName" type="primary" @click="clearFile">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                  <el-upload
                    v-show="!lookForm.fileName"
                    ref="upload"
                    :auto-upload="false"
                    :on-change="uploadChange"
                    :show-file-list="false"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :action="actionUrl"
                    class="upload-demo"
                  >
                    <!-- <el-tooltip placement="top">
                      <div slot="content">包括隐私政策<br>个人信息收集使用的目的<br>个人信息使用结束后处理机制。</div>

                    </el-tooltip> -->
                    <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                  </el-upload>
                </template>
              </el-input>
              <el-input v-else v-model="lookForm.fileName" disabled style="width: 100%">
                <template v-if="lookForm.fileID" slot="append">
                  <span style="color:#409EFF;cursor:pointer" @click="fileDownload">
                    <i class="el-icon-download">下载</i>
                  </span>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button v-if="!disable" @click="lookCancel">取 消</el-button>
        <el-button type="primary" @click="lookSure">确 定</el-button>
      </div>
    </el-dialog>
    <workflow ref="referencePdf" />
  </div>
</template>

<script>
import { updateReport } from '@/api/RiskSharing.js'
import { HXSearchFil } from '@/api/appbeian/register.js'
import { neiKong } from '@/utils/formValidate'
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  props: {
    disable: {
      type: Boolean
    },
    fankui: {
      type: Boolean
    },
    dialogMsg: {
      type: Object,
      required: true
    },
    lookVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    workType: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [],
      title: '',
      fileID: '',
      riidNum: '',
      lookForm: {
        explain: '',
        accept: 1,
        fileName: '',
        fileID: ''
      }
    }
  },
  computed: {
    actionUrl() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=23&ownBusiness=nifaReport&flag=1`
    }
  },
  mounted() {
    if (this.fankui) {
      this.lookForm.accept = Number(this.dialogMsg.isAccept) === 2 ? 0 : Number(this.dialogMsg.isAccept)
    } else {
      this.lookForm.accept = Number(this.dialogMsg.isAccept)
    }
    this.lookForm.explain = this.dialogMsg.feedback
    this.riidNum = this.dialogMsg.id
    this.getFileMeg()
  },
  methods: {
    getFileMeg() {
      HXSearchFil(this.dialogMsg.id).then(res => {
        res.forEach(element => {
          if (element.ownSystem === '23') { // 23是风险共享里面的附件
            this.lookForm.fileName = element.originalName
            this.lookForm.fileID = element.attachId
          } else if (element.ownSystem === '29') {
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
    fileDownload() {
      location.href = `nifa-autonomy-file/upload/download/${this.lookForm.fileID}`
    },
    fileDownload1(row) {
      if (row.testmsg === 'pdf') {
        this.$refs.referencePdf.open(row.url, row.fileID)
      } else {
        location.href = `nifa-autonomy-file/upload/download/${row.fileID}`
      }
    },
    clearFile() {
      this.lookForm.fileName = ''
    },
    uploadChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        this.lookForm.fileName = fileList[0].name
      } else {
        this.lookForm.fileName = fileList[0].name
      }
      // const isLt10M = file.size / 1024 / 1024 < 260
      // if (!isLt10M) {
      //   this.$message.error('上传文件大小不能超过 260MB!')
      //   this.form.fileName5 = ''
      //   return false
      // }
      if (!neiKong(file)) {
        this.lookForm.fileName = ''
      }
    },
    uploadSuccess(res) {
      if (res.code !== 200) {
        this.uploadError()
      }
    },
    uploadError() {
      this.loading.close()
      this.flag5 = true
      this.form.fileName5 = ''
      this.$confirm('您的隐私策略上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    lookSure() {
      if (this.disable) {
        this.$emit('dialogHide', '取消')
      } else {
        this.$refs.upload.submit()
        updateReport({ id: this.dialogMsg.id, isAccept: this.lookForm.accept, feedback: this.lookForm.explain }).then(res => {
          this.$message({
            message: '反馈成功！',
            type: 'success'
          })
          this.$emit('dialogHide', '确定')
          this.$emit('getlist')
        })
      }
    },
    lookCancel() {
      this.$emit('dialogHide', '取消')
    },
    handleClose() {
      this.$emit('dialogHide', '取消')
    }
  }
}
</script>

<style lang="scss">
.dialog{
.el-dialog__headerbtn{
  display: none;
}
.el-dialog{
    width: 550px;
  }
  .el-form-item__label{
    display: inline-block;
    text-align: left;
  }
  .el-textarea__inner{
    height: 80px;
  }
 .look_label{
    display: inline-block;
    height: 30px;
    width: 100px;
    line-height: 30px;
    text-align: left;
    margin-right: 10px;
    font-weight: bold;
}
.look_label_jianguan{
  display: inline-block;
    height: 30px;
    width: 105px;
    line-height: 30px;
    text-align: left;
    margin-right: 10px;
    font-weight: bold;
}
  .description{
    display: block;
    width: 75%;
    float: right;
    margin-top: 1.5%;
  }
}

</style>
