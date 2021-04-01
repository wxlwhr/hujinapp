<template>
  <el-card class="newCope">
    <div slot="header" class="clearfix btnCard">
      <span>意见反馈</span>
      <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="反馈标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入" maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="内容" class="quillBox" prop="content">
            <!-- <el-input v-show="false" v-model="form.content" /> -->
            <!-- <quill-editor
              ref="myQuillEditor"
              v-model.trim="form.content"
              style="white-space: pre-wrap;"
              :options="editorOption"
            /> -->
            <editor ref="editor" :mobile-filter="true" @editorData="getEditorData" />
            <p class="quillMark">不能超过2500个字</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="附件上传" prop="fileName">
            <el-input v-show="false" v-model="form.fileName" placeholder="" />
            <el-upload
              ref="upload"
              :auto-upload="false"
              :on-change="handleChange"
              :file-list="fileList"
              :limit="10"
              :on-exceed="handleExceed"
              :before-remove="beforeClearFile"
              :on-remove="clearFile"
              :on-preview="fileDownload"
              :on-progress="handleProgress"
              :on-error="handleAvatarerr"
              :on-success="handleAvatarSuccess"
              :action="actionUrl"
              class="upload-demo"
            >
              <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
              <div slot="tip" class="el-upload__tip" style="font-size:12px;color:#303133;">只能上传.doc,.docx,.jpg,.png,.pdf,zip格式!且单个附件大小不超过10M</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="this.$route.query.type === '0'" class="bottonBtn">
      <el-button type="primary" @click="sendNode('form','0')">发布</el-button>
      <el-button @click="goBack">返 回</el-button>
    </div>
    <div v-else class="bottonBtn">
      <el-button type="primary" @click="sendNodeB('form','2')">发布</el-button>
      <el-button @click="goBack">返 回</el-button>
    </div>
  </el-card>
</template>
<script>
// import { getToken } from '@/utils/auth'
import { getUUIDWG } from '@/utils'
import { deleteaAttach, HXSearchFil } from '@/api/register/register.js'
import { getVivw } from '@/api/notice/details.js'
import Editor from '@/components/Editor.vue'
import { addOpinion } from '@/api/notice/copeAdvice.js'
import { getdqDate, Notice } from '@/utils/formValidate'
export default {
  components: {
    Editor
  },
  data() {
    const isValidNumber = (rule, value, callback) => {
      // const value1 = value.replace(/<\/?.+?>/g, '')
      // const value2 = value1.replace(/ /g, '')
      // console.log(value2.length)
      if (value == null || value === '<p><br></p>' || value === '') {
        callback(new Error('内容不能为空'))
      } else if (value.length > 2500) {
        callback(new Error(`输入文字(含图片)不能超过2500字,当前共${value.length}字符数`))
      } else {
        callback()
      }
    }
    return {
      dialogForm: {
        riid: '',
        registerProvince: '',
        registerCity: '',
        registerArea: ''
      },
      editorOption: {},
      fileList: [],
      remnant: 0,
      remnant2: 0,
      status: '',
      filterText: '',
      loading: null,
      flag: true,
      fileID: '',
      riidNum: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        title: '',
        content: '',
        fileName: ''
      },
      // rules
      rules: {
        fileName: [{ required: false, message: '请上传文件', trigger: 'change' }],
        radio: [{ required: true, message: '请选择', trigger: 'change' }],
        title: [{ required: true, message: '内容不能为空', trigger: 'change' }, { pattern: /^[^ ]+$/, message: '不能含有空格', trigger: 'change' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'change' }, { required: true, validator: isValidNumber, trigger: 'change' }]
      }
    }
  },
  computed: {
    // 上传地址
    actionUrl() {
      if (this.$route.query.id) {
        return `nifa-autonomy-file/upload/upload-attach?noteId=${this.$route.query.id}&ownSystem=28&ownBusiness=nifaReport`
      } else {
        return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=28&ownBusiness=nifaReport`
      }
    },
    paramsObj() {
      const obj = Object.assign({}, this.form)
      obj.createTime = getdqDate()
      obj.id = this.riidNum
      obj.orgId = this.$store.getters.riid
      obj.orgName = this.$store.getters.rinm
      obj.srnm = this.$store.getters.srnm
      delete obj.fileName
      return obj
    },
    paramsObjB() {
      const obj = Object.assign({}, this.form)
      delete obj.fileName
      delete obj.radio
      obj.id = this.$route.query.id
      return obj
    }
  },
  watch: {
    remnant() {
      if (this.remnant !== 0) {
        if (this.remnant === this.remnant2) {
          if (this.status === '0') { // 发布
            if (this.$route.query.id) {
              this.paramsObj.id = this.$route.query.id
              addOpinion(this.paramsObj).then(res => {
                this.$message({
                  message: '发布成功',
                  type: 'success'
                })
                this.loading.close()
                this.goBack()
              }).catch(res => {
                this.loading.close()
              })
            } else {
              addOpinion(this.paramsObj).then(res => {
                this.$message({
                  message: '发布成功',
                  type: 'success'
                })
                this.loading.close()
                this.goBack()
              }).catch(res => {
                this.loading.close()
              })
            }
          } else { // 已发布的修改后发布
            console.log('已发布的修改后发布')
            addOpinion(this.paramsObjB).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.loading.close()
              this.goBack()
            }).catch(res => {
              this.loading.close()
            })
          }
        }
      }
    }
  },

  // created() {
  //   this.editorOption = quillRedefine(
  //     {
  //       placeholder: '请输入正文',
  //       // 图片上传的设置
  //       // 图片上传的设置
  //       uploadConfig: {
  //         action: `nifa-autonomy-file/upload/uploadImage?token=${getToken()}`,
  //         // 你必须把返回的数据中所包含的图片地址 return 回去
  //         res: (respnse) => {
  //           return `nifa-autonomy-file/upload/showImage?imgPathEncode=${respnse.data.photoLinkPath}&token=${getToken()}`
  //         },
  //         name: 'img' // 图片上传参数名
  //       },
  //       toolOptions: [
  //         ['bold', 'italic', 'underline', 'strike'],
  //         ['blockquote', 'code-block'],
  //         [{ 'header': 1 }, { 'header': 2 }],
  //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //         [{ 'script': 'sub' }, { 'script': 'super' }],
  //         [{ 'indent': '-1' }, { 'indent': '+1' }],
  //         [{ 'direction': 'rtl' }],
  //         [{ 'size': ['small', false, 'large', 'huge'] }],
  //         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  //         [{ 'color': [] }, { 'background': [] }],
  //         [{ 'font': [] }],
  //         [{ 'align': [] }],
  //         ['clean', 'link', 'image', 'video']
  //       ]
  //     }
  //   )
  // },
  mounted() {
    this.$nextTick(function() {
      this.getData()
      this.riidNum = getUUIDWG()
    })
  },
  methods: {
    getEditorData(data) {
      this.form.content = data
      this.$refs.form.validateField('content')
    },
    beforeClearFile(file) {
      return this.$confirm(`此操作将永久删除该文件, 是否继续?`, '提示', { type: 'warning' })
    },
    clearFile(file, fileList) {
      if (fileList.length > 0) {
        this.form.fileName = fileList[0].name
      } else {
        this.form.fileName = ''
      }
      if (file.fileID) {
        deleteaAttach(file.fileID).then(res => {
        }).catch(() => {

        })
      }
    },

    handleProgress(event, file, fileList) {
      if (this.flag) {
        fileList.forEach(element => {
          if (element.fileID === undefined) {
            this.remnant2 += 1
            this.flag = false
          }
        })
      }
    },
    handleExceed() {
      this.$message.error('最多只能选择10个文件!')
    },
    handleChange(file, fileList) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        fileList.splice(fileList.indexOf(file), 1)
        return false
      }
      if (!Notice(file)) {
        fileList.splice(fileList.indexOf(file), 1)
      }
      if (fileList.length > 0) {
        this.form.fileName = fileList[0].name
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess(res) {
      setTimeout(() => {
        this.remnant += 1
      }, 1000)
      if (res.code !== 200) {
        this.handleAvatarerr()
      }
    },
    // 文件上传失败回调
    handleAvatarerr() {
      this.loading.close()
      this.form.fileName = ''
      this.flag = true
      this.$refs.upload.clearFiles()
      this.$confirm('您的附件上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    getData() {
      if (this.$route.query.id) {
        getVivw(this.$route.query.id).then(res => {
          for (var key in this.form) {
            this.form[key] = res[key]
          }
          this.$refs.editor.setContent(res.content)
          this.$refs.tree.setCheckedKeys(res.riidList)
          HXSearchFil(this.$route.query.id).then(res => {
            this.fileList = []
            res.forEach(element => {
              if (element.ownSystem === '20') {
                this.fileList.push({
                  name: element.originalName,
                  fileID: element.attachId
                })
                this.form.fileName = element.originalName
              }
            })
          })
        })
      }
    },
    fileDownload(file) {
      if (file.fileID) {
        location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
      }
    },
    // 确定后发布
    sendNodeB(formName, type) {
      console.log('已发布的修改后发布')
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('是否确定发布', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.status = type
            this.loading = this.$loading({
              lock: true
            })
            this.remnant = 0
            this.remnant2 = 0
            this.$refs.upload.submit()
            setTimeout(() => {
              if (this.remnant2 === 0) {
                addOpinion(this.paramsObjB).then(res => {
                  this.$message({
                    message: '发布成功',
                    type: 'success'
                  })
                  this.loading.close()
                  this.goBack()
                }).catch(res => {
                  this.loading.close()
                })
              }
            }, 1000)
          })
        } else {
          this.$confirm('您尚有未填写的必填项', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).catch(() => {})
        }
      })
    },
    sendNode(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('是否确定发布', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.status = type
            this.loading = this.$loading({
              lock: true
            })
            this.remnant = 0
            this.remnant2 = 0
            this.$refs.upload.submit()
            setTimeout(() => {
              if (this.remnant2 === 0) {
                if (this.$route.query.id) {
                  this.paramsObj.id = this.$route.query.id
                  addOpinion(this.paramsObj).then(res => {
                    this.$message({
                      message: '发布成功',
                      type: 'success'
                    })
                    this.loading.close()
                    this.goBack()
                  }).catch(res => {
                    this.loading.close()
                  })
                } else {
                  addOpinion(this.paramsObj).then(res => {
                    this.$message({
                      message: '发布成功',
                      type: 'success'
                    })
                    this.loading.close()
                    this.goBack()
                  }).catch(res => {
                    this.loading.close()
                  })
                }
              }
            }, 1000)
          })
        } else {
          this.$confirm('您尚有未填写的必填项', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).catch(() => {})
        }
      })
    },
    // 返回
    goBack() {
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
</script>
<style  lang="scss">
.newCope {
  .bottonBtn {
    margin-top: 10px;
    text-align: center;
  }
  //   .w-e-text img{
  //   width: inherit !important;
  // }
  .jgxqStyle{
  margin: 12px auto;
  border-color: #a2b9f0;
  border-radius: 6px 6px;
  padding: 30px 50px;
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
  }
}
</style>
