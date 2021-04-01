<template>
  <div v-loading.fullscreen.lock="uploadLoading" :element-loading-text="`文件正在上传，请勿离开！已上传： ${fileDataLen-isOver}/${fileDataLen}`" class="uploader-common">
    <div v-show="dragActive" id="dragAndDropArea" class="drop-active" />
    <div :before-upload="handleBefore" class="button-group clearfix">
      <span style="color:#F56C6C;font-size:12px;">*</span>
      <el-button :id="selectFileButton" :disabled="fileData.length>0" :class="selectFileButton" type="primary" plain style="display: inline-block">上传</el-button>
      <!-- <el-button :loading="flag" :disabled="isStart" type="primary" plain @click="startUpload">开始上传</el-button> -->
      <!-- <el-button :loading="flag2" :disabled="isStop" type="primary" plain @click="stopUpload">停止上传</el-button> -->
      <span style="color:#F56C6C;font-size:12px;">{{ showMsg }}</span>
      <!-- <span style="margin-left:20px;font-size:12px;">文件hash值（md5）:</span> -->
    </div>
    <el-table :data="fileData" tooltip-effect="dark">
      <el-table-column :index="indexFn" type="index" label="序号" width="80" />
      <el-table-column label="文件名称" prop="name" min-width="250" show-overflow-tooltip />
      <el-table-column label="文件大小" prop="formatSize" />
      <!-- <el-table-column label="MD5值" min-width="250" prop="md5" /> -->
      <!-- <el-table-column label="进度">
        <template slot-scope="scope">
          <div :id="scope.row.id">
            <el-progress :percentage="scope.row.percent" color="#8e71c7" />
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button :loading="scope.row.loading" type="text" @click="deleteFn(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Uploader from './upload'
// import { deleteaAttach } from '@/api/appbeian/register.js'
// import JsZip from 'jszip'
// getfileSizeApi
// import { deletefileApi, delBigannex, bigannex } from '@/api/sys-monitoringAnalysis/cueManage/interFileManage/fileTransfer.js'

export default {
  props: {
    showMsg: {
      type: String,
      default: ''
    },
    fileTabData: {
      type: Array,
      default: null
    },
    fileid: {
      type: String,
      default: ''
    },
    noteFileID: {
      type: String,
      default: ''
    },
    tokenURL: {
      type: String,
      default: ''
    },
    removeURL: {
      type: String,
      default: 'file-service/upload/remove'
    },
    uploadURL: {
      type: String,
      default: '' /** HTML5上传的URI */
    },
    selectFileButton: {
      type: String,
      default: 'i_select_files'
    },
    onProgress: {
      type: Function,
      default() {
        return function() {}
      }
    }
  },
  data() {
    return {
      myNoteId: '',
      fileID: '',
      flag: false,
      flag2: false,
      fileIndex: 0,
      fileData: [],
      temFile: [],
      dragActive: false,
      uploadLoading: false,
      fileDataLen: null,
      // 默认开始页码
      currentPage: 1,
      // 每页显示条数
      pagesize: 10,
      fileType: 0,
      isStop: true,
      isStart: true
    }
  },
  computed: {
    getUUID() {
      return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
      })
    },
    isOver() {
      return this.fileData.length
    },
    config() {
      var _this = this
      return {
        customered: true,
        browseFileId: this.selectFileButton /** 选择文件的ID, 默认: i_select_files */,
        browseFileBlockDisplay: 'inline-blcok',
        browseFileBtn: '' /** 显示选择文件的样式, 默认: `<div>请选择文件</div>` */,
        dragAndDropArea:
          'dragAndDropArea' /** 拖拽上传区域，Id（字符类型"i_select_files"）或者DOM对象, 默认: `i_select_files` */,
        dragAndDropTips:
          '<h3>把文件拖拽到这里</h3>' /** 拖拽提示, 默认: `<span>把文件拖拽到这里</span>` */,
        filesQueueId: 'i_stream_files_queue' /** 文件上传容器的ID, 默认: i_stream_files_queue */,
        filesQueueHeight: 200 /** 文件上传容器的高度（px）, 默认: 450 */,
        messagerId:
          'i_stream_message_container' /** 消息显示容器的ID, 默认: i_stream_message_container */,
        multipleFiles: true /** 多个文件一起上传, 默认: false */,
        onRepeatedFile: function(f) { // 判断是否重复上传
          let type = false
          _this.fileData.forEach(el => {
            if (el.name === f.name && el.size === f.size) {
              type = true
            }
          })
          if (type) {
            _this.$message.warning('文件：' + f.name + ' 大小：' + f.size + ' 已存在于上传队列中。')
            return false
          } else {
            return true
          }
        },
        autoUploading: false /** 选择文件后是否自动上传, 默认: true */,
        autoRemoveCompleted: false /** 是否自动删除容器中已上传完毕的文件, 默认: false */,
        autoRemoveCancel: true /** 服务器端是否自动删除取消上传的文件 , , 默认: true*/,
        maxSize: 524288000, //, /** 单个文件的最大大小，默认:1G */
        swfURL: 'swf/FlashUploader.swf' /** SWF文件的位置 */,
        tokenURL: 'nifa-autonomy-file/upload/token',
        removeURL: this.removeURL,
        uploadURL: 'nifa-autonomy-file/upload/upload?flag=1' /** HTML5上传的URI */,
        simLimit: 1 /** 单次最大上传文件个数 */,
        extFilters: ['.doc', '.docx', '.ipa', '.apk', '.jpg', '.png', '.pdf', '.rsa', '.zip'] /** 允许的文件扩展名, 默认: [] */,
        postVarsPerFile: {
          noteId: _this.fileID,
          ownSystem: '8',
          ownBusiness: 'nifaReport'
        },

        onSelect: function(file) {
          // _this.fileType = 0
          // file.forEach(res => {
          //   if ((res.name.substring(res.name.lastIndexOf('.') + 1)).toLowerCase() !== 'csv') {
          //     _this.fileType++
          //   }
          // })
          // 选择文件后的响应事件
          file.forEach((el, index) => {
            //  file.size / 1024 / 1024 < 500
            if (el.size > 524288000) {
              _this.$message({
                type: 'warning',
                message: '附件大小不能超过500MB'
              })
              _this.config.maxSize = 524288000
              return false
            }
          })
        },

        // 列表增加附件
        onAddTask: function(file, dat) {
          _this.isStart = false
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          _this.fileData.unshift(file)
          _this.fileDataLen = _this.fileData.length
        },
        dropFn: function(type) {
          _this.dragActive = type
        },
        onUploadProgress: function(params) {
          _this.$emit('uploadIn', false)
          var fileIndex = null
          params.totalPercent = '100'
          _this.fileData.forEach((file, index) => {
            if (params.id === file.id) {
              if (file.percent !== 100) {
                fileIndex = index
              }
            }
          })
          if (params.loaded === params.size) {
            params.percent = 100
            _this.$emit('yesNoFileNum', 1)
            _this.$emit('uploadIn', true)
          }
          _this.$set(_this.fileData[fileIndex], 'percent', params.percent)
        },
        onUploadSuccess: function(file, res) {
        },
        onUploadError: function() {
          // _this.$message({
          //   message: '文件上传出错',
          //   type: 'error'
          // })
        },
        onComplete: function(file) {
          // _this.fileData.forEach((item, index) => {
          //   if (item.id === file.id) {
          //     _this.fileData.splice(index, 1)
          //   }
          // })
          // _this.onProgress(file)
        },
        onCancel: function(file) {
          _this.fileData.forEach((item, index) => {
            if (item.id === file.id) {
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              _this.fileData.splice(index, 1)
            }
          })
        },
        //		onSelect: function(list) {alert('onSelect')}, /** 选择文件后的响应事件 */
        //		onMaxSizeExceed: function(size, limited, name) {alert('onMaxSizeExceed')}, /** 文件大小超出的响应事件 */
        //		onFileCountExceed: function(selected, limit) {alert('onFileCountExceed')}, /** 文件数量超出的响应事件 */
        //		onExtNameMismatch: function(name, filters) {alert('onExtNameMismatch')}, /** 文件的扩展名不匹配的响应事件 */

        //		onComplete: function(file) {alert('onComplete')}, /** 单个文件上传完毕的响应事件 */
        onQueueComplete: function() {
          _this.isStop = true
          _this.isStart = true
          _this.$emit('subNext')
          // _this.$message({
          //   message: '文件上传成功',
          //   type: 'success',
          //   showClose: true,
          //   duration: 6000
          // })
          // bigannex(_this.config.postVarsPerFile.noteId).then(res => {
          //   if (res.code === 200) {
          //   }
          // })
        } /** 所以文件上传完毕的响应事件 */
        //		onUploadError: function(status, msg) {alert('onUploadError')} /** 文件上传出错的响应事件 */
        //		onDestroy: function() {alert('onDestroy')} /** 文件上传出错的响应事件 */
      }
    }
  },
  watch: {
    // isOver(val) {
    //   for (var key in this.upload.uploadInfo) {
    //     if (this.upload.uploadInfo[key].uploadComplete) {
    //       delete this.upload.uploadInfo[key]
    //     }
    //   }
    //   this.upload.onAddTask()
    // },
    // config: {
    //   handler(newObj) {
    //     this.upload && this.upload.destroy()

    //     this.upload = new Uploader(newObj)
    //   },
    //   immediate: true
    // }
    noteFileID: {
      handler(newObj) {
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    setTimeout(() => {
      // this.fileID = this.$store.state.houtaizhi
      this.config.postVarsPerFile.noteId = this.$store.state.houtaizhi
    }, 1000)
    this.upload = new Uploader(this.config)
    // setTimeout(() => {
    // if (this.fileTabData.length > 0) {
    //   this.fileData = this.fileTabData
    // }
    // }, 500)
  },
  methods: {
    // 删除已上传的附件
    deleteFn(val) {
      this.$confirm('确定要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        val.row.loading = true
        this.fileData = []
        val.row.loading = false
        this.upload.cancelOne(val.row.id)
        // let id = ''
        // if (val.row.fileId === undefined) {
        //   id = val.row.attachId
        // } else {
        //   id = val.row.fileId
        // }
        // deleteaAttach(id).then(res => {
        //   this.fileData = []
        //   val.row.loading = false
        //   this.upload.cancelOne(val.row.id)
        // })
      })
    },
    // 计算附件大小
    allfileSize() {
      let sum = 0
      this.fileData.forEach(item => {
        const a = item.size
        sum += a
      })
      return sum
    },
    // 开始上传
    startUpload() {
      this.isStart = true
      this.isStop = false
      this.flag = true
      setTimeout(() => {
        this.flag = false
      }, 1000)
      this.upload.upload()
    },
    stopUpload() {
      this.isStop = true
      this.isStart = false
      this.flag2 = true
      setTimeout(() => {
        this.flag2 = false
      }, 1000)
      this.upload.stop()
    },
    cancelUpload() {
      this.upload.cancel()
    },
    // 取消
    deleteOne(scope) {
      if (scope.row.percent === 100) {
        // deletefileApi(scope.row.fileId).then(res => {
        //   if (res.code === 200) {
        //     this.upload.cancelOne(scope.row.id)
        //     // this.fileData.splice(scope.$index, 1)
        //   }
        // })
      } else {
        this.upload.cancelOne(scope.row.id)
        // this.fileData.splice(scope.$index, 1)
      }
    },
    handleBefore() {
    },
    uploadSuccess(file, response) {
    },
    indexFn(index) {
      return index + (this.currentPage - 1) * 10 + 1
    },
    handleSizeChange(size) {
      this.pagesize = size
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss">
.uploader-common {
  .drag-block {
    position: relative;
    min-height: 120px;
    text-align: center;
    width: 100%;
    height: 100%;
    border: 1px dashed #d9d9d9;
  }
  .initialize {
    height: 200px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    height: 180px;
    text-align: center;
    width: 90%;
    margin-left: 5%;
    &:hover {
      border-color: #409eff;
    }
  }
  .el-progress-bar {
    width: 85%;
  }
  .el-icon-upload {
    font-size: 48px;
    color: #c0c4cc;
    // margin: 40px 0 16px;
    line-height: 50px;
    &:before {
      content: '\E60D';
    }
  }

  .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: 0.6;
    text-align: center;
    background: #000;
  }

  .drop-active h3 {
    margin: -0.5em 0 0;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
    padding: 0;
  }
}
</style>
