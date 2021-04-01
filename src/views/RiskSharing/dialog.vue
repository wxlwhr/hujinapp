<template>
  <div class="dialog">
    <el-dialog :title="title" top="10vh" :visible.sync="lookVisible" :before-close="handleClose">
      <hr style="margin-bottom:20px;margin-top:20px">
      <div>
        <div v-if="from === '监管'">
          <el-row>
            <el-col>
              <span class="look_label_jianguan">金融机构名称:</span>
              <span>{{ dialogMsg.rinm?dialogMsg.rinm:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label_jianguan">APP名称:</span>
              <span>{{ dialogMsg.appName?dialogMsg.appName:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label_jianguan">APP版本:</span>
              <span>{{ dialogMsg.appVersion?dialogMsg.appVersion:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label_jianguan">APP产品类型:</span>
              <span>
                <span v-if="dialogMsg.productType">
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
          <el-row>
            <el-col>
              <span class="look_label_jianguan">金融机构联系人:</span>
              <span>{{ dialogMsg.monitorName?dialogMsg.monitorName:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label_jianguan">联系电话:</span>
              <span>{{ dialogMsg.managerTel?dialogMsg.managerTel:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label_jianguan">监测平台名称:</span>
              <span>{{ dialogMsg.monitorOtherName?dialogMsg.monitorOtherName:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label_jianguan">机构类别:</span>
              <span>{{ dialogMsg.ficp?dialogMsg.ficp:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label_jianguan">创建时间:</span>
              <span>{{ dialogMsg.createTime?dialogMsg.createTime:'--' }}</span>
            </el-col>
          </el-row>
        </div>
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
              <span class="look_label">风险级别：</span>
              <span v-if="dialogMsg.riskLevel" class="description">
                <span v-if="dialogMsg.riskLevel === '0'" type="success" style="width:65px">
                  {{ '低风险' }}
                </span>
                <span v-else-if="dialogMsg.riskLevel === '1'" type="warning" style="width:65px">
                  {{ '中风险' }}
                </span>
                <span v-else-if="dialogMsg.riskLevel === '2'" type="danger" style="width:65px">
                  {{ '高风险' }}
                </span>
                <span v-else>
                  --
                </span>
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label">风险检测项：</span>
              <span class="description">{{ dialogMsg.item?dialogMsg.item:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label">风险类型：</span>
              <span class="description">{{ dialogMsg.riskType?dialogMsg.riskType:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label" style="float: left;display: block">风险描述：</span>
              <span class="description">{{ dialogMsg.description?dialogMsg.description:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label" style="float: left;display: block">联系人：</span>
              <span class="description">{{ dialogMsg.monitorName?dialogMsg.monitorName:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label" style="float: left;display: block">联系电话：</span>
              <span class="description">{{ dialogMsg.managerTel?dialogMsg.managerTel:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label" style="float: left;display: block">金融机构名称：</span>
              <span class="description">{{ dialogMsg.rinm?dialogMsg.rinm:'--' }}</span>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col>
              <span class="look_label" style="float: left;display: block">监测平台名称：</span>
              <span class="description">{{ dialogMsg.monitorOtherName?dialogMsg.monitorOtherName:'--' }}</span>
            </el-col>
          </el-row> -->
        </div>
      </div>
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
              <el-input v-model="lookForm.explain" :disabled="disable" type="textarea" autocomplete="off" placeholder="请输入" />
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
  </div>

</template>

<script>
import { modify } from '@/api/RiskSharing.js'
import { HXSearchFil } from '@/api/appbeian/register.js'
import { neiKong } from '@/utils/formValidate'
export default {
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
    if (this.from === '监管') {
      this.title = '详情信息：'
    } else {
      this.title = '检测结果：'
    }
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
          }
        })
      })
    },
    fileDownload() {
      location.href = `nifa-autonomy-file/upload/download/${this.lookForm.fileID}`
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
      this.lookForm.fileName = ''
      this.$confirm('您的文件上传失败请重新选择上传', '提示', {
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
        modify({ id: this.dialogMsg.id, isAccept: this.lookForm.accept, feedback: this.lookForm.explain }).then(res => {
          this.$message({
            message: '反馈成功！',
            type: 'success'
          })
          this.$emit('dialogHide', '确定')
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
