<template>
  <el-card class="newCope">
    <div slot="header" class="clearfix btnCard">
      <span>通知公告</span>
      <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="名称" prop="title">
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
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="发送范围机构" prop="noteType">
            <div class="treeStyle">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="行业" label-width="45px">
                    <el-select v-model="ficp" multiple collapse-tags placeholder="请选择" clearable>
                      <el-option
                        v-for="item in jigou"
                        :key="item.codeKey"
                        :label="item.codeValue"
                        :value="item.codeValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地区" label-width="45px">
                    <el-cascader
                      v-model="registerAddr"
                      :options="registerAddrArr"
                      collapse-tags
                      :props="{ checkStrictly: true,multiple: true }"
                      style="width:100%"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-top:10px">
                <el-col :span="12">
                  <el-form-item label="机构" label-width="45px">
                    <el-select
                      v-model="riidArr"
                      filterable
                      remote
                      multiple
                      collapse-tags
                      clearable
                      reserve-keyword
                      placeholder="请输入关键词搜索"
                      :remote-method="remoteMethod"
                    >

                      <el-option
                        v-for="item in jigouoptions"
                        :key="item.riid"
                        :label="item.rinm"
                        :value="item.riid"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="状态" label-width="45px">
                    <el-select v-model="currentState" multiple collapse-tags placeholder="请选择" clearable>
                      <el-option
                        v-for="item in currentStateArr"
                        :key="item.codeKey"
                        :label="item.codeValue"
                        :value="item.codeValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-top:10px">
                <el-col :span="24" style="text-align:right">
                  <el-button type="primary" icon="el-icon-search" @click="searchRange">点击筛选</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <!-- <el-col :span="7" style="margin-top:10px">
                  <el-form-item label="机构" label-width="50px">
                    <el-input
                      v-model="filterText"
                      placeholder="输入关键字进行过滤"
                    />
                  </el-form-item>
                </el-col> -->
                <el-col :span="24">
                  <el-tree
                    ref="tree"
                    v-model="form.noteType"
                    :default-expanded-keys="nodeKey"
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    :props="defaultProps"
                    @check-change="treeClick"
                  />
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="短信通知" prop="radio">
            <el-radio-group v-model="form.radio">
              <el-radio label="1">开启</el-radio>
              <el-radio label="2">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="this.$route.query.type === '0'" class="bottonBtn">
      <el-button type="primary" @click="sendNode('form','0')">发布</el-button>
      <el-button type="primary" @click="sendNode1('form','1')">保存</el-button>
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
// import { quillRedefine } from 'vue-quill-editor-upload'
import { announcement, announcementUP, certificationUnit } from '@/api/notice/newCope.js'
import { getdqDate, Notice } from '@/utils/formValidate'
import { getTree, getAdrr, getClock } from '@/api/general.js'
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
        ficp: '',
        riid: '',
        registerProvince: '',
        registerCity: '',
        registerArea: ''
      },
      ficp: [],
      currentState: [],
      registerAddr: [],
      riidArr: [],
      editorOption: {},
      jigouoptions: [],
      treeData: [],
      treeDataId: [],
      registerAddrArr: [],
      jigou: [],
      nodeKey: [],
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
        fileName: '',
        radio: '2',
        noteType: ''
      },
      currentStateArr: [
        {
          codeKey: '01',
          codeValue: '待提交'
        },
        {
          codeKey: '02',
          codeValue: '初审待审核'
        },
        {
          codeKey: '03',
          codeValue: '复审待审核'
        },
        {
          codeKey: '04',
          codeValue: '已备案'
        },
        {
          codeKey: '05',
          codeValue: '审核未通过'
        }
      ],
      // rules
      rules: {
        fileName: [{ required: false, message: '请上传文件', trigger: 'change' }],
        radio: [{ required: true, message: '请选择', trigger: 'change' }],
        title: [{ required: true, message: '内容不能为空', trigger: 'change' }, { pattern: /^[^ ]+$/, message: '不能含有空格', trigger: 'change' }],
        noteType: [{ required: false, message: '请选择机构', trigger: 'change' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'change' }, { required: true, validator: isValidNumber, trigger: 'change' }]
      }
    }
  },
  computed: {
    // 上传地址
    actionUrl() {
      if (this.$route.query.id) {
        return `nifa-autonomy-file/upload/upload-attach?noteId=${this.$route.query.id}&ownSystem=20&ownBusiness=nifaReport`
      } else {
        return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=20&ownBusiness=nifaReport`
      }
    },
    paramsObj() {
      const obj = Object.assign({}, this.form)
      delete obj.noteType
      obj.riidList = this.$refs.tree.getCheckedKeys().length > 0 ? this.$refs.tree.getCheckedKeys() : this.treeDataId
      obj.createTime = getdqDate()
      obj.id = this.riidNum
      obj.createDeptName = this.$store.getters.deptName
      obj.createUser = this.$store.getters.userId
      obj.createUserName = this.$store.getters.name
      obj.createDept = this.$store.getters.deptId
      return obj
    },
    paramsObjB() {
      const obj = Object.assign({}, this.form)
      delete obj.noteType
      delete obj.fileName
      delete obj.radio
      obj.riidList = this.$refs.tree.getCheckedKeys().length > 0 ? this.$refs.tree.getCheckedKeys() : this.treeDataId
      obj.id = this.$route.query.id
      return obj
    }
  },
  watch: {
    remnant() {
      if (this.remnant !== 0) {
        if (this.remnant === this.remnant2) {
          if (this.status === '0') { // 发布
            if (this.form.noteType === '') {
              this.paramsObj.allShow = '1'
            }
            if (this.$route.query.id) {
              this.paramsObj.id = this.$route.query.id
              announcementUP(this.paramsObj).then(res => {
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
              announcement(this.paramsObj).then(res => {
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
          } else if (this.status === '1') { // 保存
            if (this.form.noteType === '') {
              this.paramsObj.allShow = '1'
            }
            if (this.$route.query.id) {
              this.paramsObj.id = this.$route.query.id
              announcementUP(this.paramsObj).then(res => {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.loading.close()
                this.goBack()
              }).catch(res => {
                this.loading.close()
              })
            } else {
              announcement(this.paramsObj).then(res => {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.loading.close()
                this.goBack()
              }).catch(res => {
                this.loading.close()
              })
            }
          } else { // 已发布的修改后发布
            if (this.form.noteType === '') {
              this.paramsObjB.allShow = '1'
            }
            announcementUP(this.paramsObjB).then(res => {
              this.$message({
                message: '保存成功',
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
    getTree(this.dialogForm).then(res => {
      this.treeData = res
      this.nodeKey.push(res[0].id)
      res[0].children.forEach(element => {
        this.treeDataId.push(element.id)
      })
    })
    getClock('C5000000').then(res => {
      this.jigou = res
    })
    getAdrr().then(res => {
      this.registerAddrArr = res
    })
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
    remoteMethod(query) {
      certificationUnit({ 'rinm': query }).then(res => {
        this.jigouoptions = res
      })
    },
    searchRange() {
      this.form.noteType = ''
      let arrProv = ''
      let arrCity = ''
      let arrCount = ''
      const obj = Object.assign({}, this.dialogForm)
      obj.ficp = this.ficp.length > 0 ? this.ficp.join(',') : ''
      obj.currentState = this.currentState.length > 0 ? this.currentState.join(',') : ''
      obj.riid = this.riidArr.length > 0 ? this.riidArr.join(',') : ''
      this.registerAddr.forEach(item => {
        switch (item.length) {
          case 1:
            if (arrProv === '') {
              arrProv += item[0]
            } else {
              arrProv = arrProv + ',' + item[0]
            }
            break
          case 2:
            if (arrCity === '') {
              arrCity = item[1]
            } else {
              arrCity = arrCity + ',' + item[1]
            }
            break
          case 3:
            if (arrCount === '') {
              arrCount = item[2]
            } else {
              arrCount = arrCount + ',' + item[2]
            }
            break
          default:
            break
        }
      })
      obj.registerProvince = arrProv
      obj.registerCity = arrCity
      obj.registerArea = arrCount
      getTree(obj).then(res => {
        if (res[0].children.length > 0) {
          this.treeData = res
          this.nodeKey.push(res[0].id)
        } else {
          this.treeData = []
        }
      })
      //  this.treeData.splice(index, 1)
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
    treeClick() {
      if (this.$refs.tree.getCheckedNodes().length > 0) {
        this.form.noteType = this.$refs.tree.getCheckedNodes()[0].label
      } else {
        this.form.noteType = ''
        this.$refs['form'].clearValidate('ficp')
      }
    },
    getData() {
      if (this.$route.query.id) {
        getVivw(this.$route.query.id).then(res => {
          for (var key in this.form) {
            this.form[key] = res[key]
          }
          this.$refs.editor.setContent(res.content)
          this.$refs.tree.setCheckedKeys(res.riidList)
          if (res.riidList.length > 0) {
            this.form.noteType = res.riidList[0]
          } else {
            this.form.noteType = ''
          }
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
    // 保存
    sendNode1(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.status = type
          this.loading = this.$loading({
            lock: true
          })
          this.remnant = 0
          this.remnant2 = 0
          this.$refs.upload.submit()
          this.paramsObj.isRelease = '0'
          if (this.form.noteType === '') {
            this.paramsObj.allShow = '1'
          }
          setTimeout(() => {
            if (this.remnant2 === 0) {
              if (this.$route.query.id) {
                this.paramsObj.id = this.$route.query.id
                announcementUP(this.paramsObj).then(res => {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                  this.loading.close()
                  this.goBack()
                }).catch(res => {
                  this.loading.close()
                })
              } else {
                announcement(this.paramsObj).then(res => {
                  this.$message({
                    message: '保存成功',
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
    // 确定后发布
    sendNodeB(formName, type) {
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
            if (this.form.noteType === '') {
              this.paramsObjB.allShow = '1'
            }
            setTimeout(() => {
              if (this.remnant2 === 0) {
                announcementUP(this.paramsObjB).then(res => {
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
            this.paramsObj.isRelease = '1'
            this.paramsObj.releaseTime = this.paramsObj.createTime
            if (this.form.noteType === '') {
              this.paramsObj.allShow = '1'
            }
            setTimeout(() => {
              if (this.remnant2 === 0) {
                if (this.$route.query.id) {
                  this.paramsObj.id = this.$route.query.id
                  announcementUP(this.paramsObj).then(res => {
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
                  announcement(this.paramsObj).then(res => {
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
  }
}
</style>
