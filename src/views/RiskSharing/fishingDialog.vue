<template>
  <div class="dialog">
    <el-dialog title="查看" top="10vh" :visible.sync="lookVisible" :before-close="handleClose">
      <hr style="margin-bottom:20px;margin-top:10px">
      <div>
        <div>
          <el-row>
            <el-col>
              <span class="look_label">发现时间：</span>
              <span class="description">{{ dialogMsg.discoveryTime?dialogMsg.discoveryTime:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label">是否失活：</span>
              <span class="description">{{ dialogMsg.ifAlive==='0'?'未知': dialogMsg.ifAlive === '1'?'存活':'关停' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label" style="float: left;display: block">目标机构名称：</span>
              <span class="description">{{ dialogMsg.rinm?dialogMsg.rinm:'--' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="look_label" style="float: left;display: block">目标机构代码：</span>
              <span class="description">{{ dialogMsg.ricd?dialogMsg.ricd:'--' }}</span>
            </el-col>
          </el-row>
          <el-row v-if="from === '1' || from === '2' ">
            <el-col>
              <span class="look_label" style="float: left;display: block">服务商：</span>
              <span class="description">{{ dialogMsg.serviceProvider?dialogMsg.serviceProvider:'--' }}</span>
            </el-col>
          </el-row>
          <el-row v-if="from === '1'">
            <el-col>
              <span class="look_label" style="float: left;display: block">钓鱼网站域名：</span>
              <span class="description">{{ dialogMsg.domainName?dialogMsg.domainName:'--' }}</span>
            </el-col>
          </el-row>
          <el-row v-if="from === '2'">
            <el-col>
              <span class="look_label" style="float: left;display: block">仿冒APP应用名：</span>
              <span class="description">{{ dialogMsg.domainName?dialogMsg.domainName:'--' }}</span>
            </el-col>
          </el-row>
          <el-row v-if="from === '1'">
            <el-col>
              <span class="look_label" style="float: left;display: block">钓鱼网站URL：</span>
              <span class="description">{{ dialogMsg.url?dialogMsg.url:'--' }}</span>
            </el-col>
          </el-row>
          <el-row v-if="from === '2'">
            <el-col>
              <span class="look_label" style="float: left;display: block">仿冒App下载地址：</span>
              <span class="description">{{ dialogMsg.url?dialogMsg.url:'--' }}</span>
            </el-col>
          </el-row>
          <el-row v-if="from === '3'">
            <el-col>
              <span class="look_label" style="float: left;display: block">钓鱼公众号名称：</span>
              <span class="description">{{ dialogMsg.url?dialogMsg.url:'--' }}</span>
            </el-col>
          </el-row>
          <el-row v-if="from === '1'">
            <el-col>
              <span class="look_label" style="float: left;display: block">钓鱼网站IP：</span>
              <span class="description">{{ dialogMsg.ip?dialogMsg.ip:'--' }}</span>
            </el-col>
          </el-row>
          <el-row v-if="from === '3'">
            <el-col>
              <span class="look_label" style="float: left;display: block">钓鱼公众号编号：</span>
              <span class="description">{{ dialogMsg.ip?dialogMsg.ip:'--' }}</span>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col>
              <span class="look_label" style="float: left;display: block">监测平台名称：</span>
              <span class="description">{{ dialogMsg.monitorOtherName?dialogMsg.monitorOtherName:'--' }}</span>
            </el-col>
          </el-row> -->
          <el-row v-if="from === '2'">
            <el-col>
              <span class="look_label" style="float: left;display: block">仿冒App包名：</span>
              <span class="description">{{ dialogMsg.appPackage?dialogMsg.appPackage:'--' }}</span>
            </el-col>
          </el-row>
          <el-row v-if="from === '2'">
            <el-col>
              <span class="look_label" style="float: left;display: block">仿冒App的MD5：</span>
              <span class="description">{{ dialogMsg.appMd5?dialogMsg.appMd5:'--' }}</span>
            </el-col>
          </el-row>
          <el-row v-if="from === '2'">
            <el-col>
              <span class="look_label" style="float: left;display: block">被仿冒App名称：</span>
              <span class="description">{{ dialogMsg.befakedApp?dialogMsg.befakedApp:'--' }}</span>
            </el-col>
          </el-row>
          <el-row v-if="from === '3'">
            <el-col>
              <span class="look_label" style="float: left;display: block">被钓鱼公众号：</span>
              <span class="description">{{ dialogMsg.befakedApp?dialogMsg.befakedApp:'--' }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div>
        <div style="height:24px;line-height: 24px;font-size: 18px;color: #303133;marginTop:20px">反馈结果</div>
        <hr style="margin-bottom:20px;margin-top:20px">
        <el-form ref="lookForm" :model="lookForm" label-width="90px">
          <el-row>
            <el-col>
              <el-form-item label="是否采纳：">
                <el-radio-group v-model="lookForm.isAccept" :disabled="disable">
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
                <el-input v-model="lookForm.feedback" :disabled="disable" type="textarea" autocomplete="off" placeholder="请输入" />
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
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button v-if="!isXH" @click="lookCancel">取 消</el-button>
        <el-button type="primary" @click="lookSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fishingLook, fishingUpdate } from '@/api/RiskSharing.js'
import { HXSearchFil } from '@/api/appbeian/register.js'
import { neiKong } from '@/utils/formValidate'
export default {
  props: {
    disable: {
      type: Boolean
    },
    isXH: {
      type: Boolean
    },
    lookTips: {
      type: Boolean,
      default: false
    },
    lookVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    from: {
      type: String,
      default: ''
    },
    searchData: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogMsg: {
      },
      fileList: [],
      title: '',
      fileID: '',
      lookForm: {
        feedback: '',
        fileName: '',
        isAccept: 2,
        fileID: ''
      }
    }
  },
  computed: {
    actionUrl() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.id}&ownSystem=23&ownBusiness=nifaReport&flag=1`
    }
  },
  mounted() {
    fishingLook(this.id).then(res => {
      this.dialogMsg = res
      this.lookForm.feedback = res.feedback
      this.lookForm.isAccept = Number(res.isAccept)
    })
    this.getFileMeg()
  },
  methods: {
    goProductMsgDetail() {
      this.$router.push({
        name: 'productDetail',
        query: {
          type: true,
          id: this.dialogMsg.productId,
          riid: this.dialogMsg.productRiid,
          diaoyu: true,
          searchData: this.searchData
        }
      })
    },
    fileDownload() {
      location.href = `nifa-autonomy-file/upload/download/${this.lookForm.fileID}`
    },
    clearFile() {
      this.lookForm.fileName = ''
    },
    getFileMeg() {
      HXSearchFil(this.id).then(res => {
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
    uploadSuccess(res) {
      if (res.code !== 200) {
        this.uploadError()
      }
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
    lookSure() {
      if (this.isXH) {
        this.$emit('dialogHide', '取消')
      } else {
        if (this.lookTips) {
          this.$emit('dialogHide', '取消')
        } else {
          this.$refs.upload.submit()
          fishingUpdate({ id: this.dialogMsg.id, isAccept: this.lookForm.isAccept, feedback: this.lookForm.feedback }).then(res => {
            this.$message({
              message: '反馈成功！',
              type: 'success'
            })
            this.$emit('dialogHide', '确定')
            this.$emit('getlist')
          })
        }
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
    width: 25%;
    line-height: 30px;
    text-align: left;
    margin-right: 10px;
    font-weight: bold;
}
  .description{
    display: block;
    width: 70%;
    float: right;
    margin-top: 1.5%;
  }
}

</style>
