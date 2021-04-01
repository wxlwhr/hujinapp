<template>
  <el-card class="registerStyleRz">
    <div slot="header" class="clearfix btnCard">
      <span>注册信息维护</span>
      <el-tag v-if="form.currentState==='待提交'" type="info" style="margin-left:30px">{{ form.currentState }}</el-tag>
      <el-tag v-if="form.currentState==='初审待审核' || form.currentState==='复审待审核'" type="warning" style="margin-left:30px">{{ form.currentState }}</el-tag>
      <el-tag v-if="form.currentState==='已备案'" type="success" style="margin-left:30px">{{ form.currentState }}</el-tag>
      <el-tag v-if="form.currentState==='审核未通过'" type="danger" style="margin-left:30px">{{ form.currentState }}</el-tag>
      <a v-if="this.$route.query.type === '0'" :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
    </div>
    <div class="baseBox">
      <el-form ref="form" :model="form" :rules="rules" class="basic-form" :disabled="isTrue()&&isxiu">
        <fieldset class="fieldsetStyle">
          <legend style="margin-left: 40px; font-size:17px">机构基本信息</legend>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="统一社会信用代码" prop="succ">
                <el-input
                  v-model.trim="form.succ"
                  placeholder="请输入"
                  clearable
                  maxlength="18"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构名称" prop="rinm">
                <el-input v-model.trim="form.rinm" placeholder="机构名称" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构简称" prop="riam">
                <el-input v-model.trim="form.riam" placeholder="机构简称" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="组织机构代码（如有）"
                prop="ozcd"
              >
                <el-input
                  v-model.trim="form.ozcd"
                  placeholder="请输入"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
            >
              <el-form-item
                label="法人机构注册地区"
                prop="registerAddr"
              >
                <el-cascader
                  v-model="form.registerAddr"
                  :options="registerAddrArr"
                  clearable
                  @change="registerChange"
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
            >
              <el-form-item
                label="详细地址"
                prop="officeAddr"
              >
                <el-input
                  v-model.trim="form.officeAddr"
                  placeholder="详细地址"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
          >
            <el-col
              :span="8"
            >
              <el-form-item
                label="联系人"
                prop="monitorName"
              >
                <el-input
                  v-model.trim="form.monitorName"
                  placeholder="请输入"
                  clearable
                  :disabled="rolecode"
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
            >
              <el-form-item
                label="联系方式"
                prop="managerTel"
              >
                <el-input
                  v-model.trim="form.managerTel"
                  placeholder="请输入"
                  clearable
                  :disabled="rolecode"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否会员" prop="isMemberCifa">
                <el-select v-model="form.isMemberCifa" placeholder="请选择">
                  <el-option
                    v-for="item in huiyuanArr"
                    :key="item.codeKey"
                    :label="item.codeValue"
                    :value="item.codeKey"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="官网地址" prop="websit">
                <el-input v-model="form.websit" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位联系邮箱" prop="email">
                <el-input v-model="form.email" placeholder="单位联系邮箱" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成立时间" prop="crTime">
                <el-date-picker
                  v-model="form.crTime"
                  :picker-options="pickerOptions1"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="公司简介" prop="bussScope">
                <el-input v-model="form.bussScope" type="textarea" :rows="3" placeholder="请输入" maxlength="500" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="资质荣誉" prop="mainNetBuss">
                <el-input v-model="form.mainNetBuss" type="textarea" :rows="3" placeholder="请输入" maxlength="500" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="公司Logo" prop="fileName2" class="radio_enter">
                <el-input v-show="false" v-model="form.fileName2" placeholder="" />
                <el-upload
                  ref="upload2"
                  :class="{hide:isTrue()&&isxiu}"
                  :file-list="fileList2"
                  :action="actionUrl2"
                  list-type="picture-card"
                  :on-change="handleChange2"
                  :on-progress="handleProgress2"
                  :on-success="handleAvatarSuccess2"
                  :on-error="handleAvatarerr2"
                  :auto-upload="false"
                >
                  <i slot="default" class="el-icon-plus" />
                  <div slot="file" slot-scope="{file}">
                    <!-- <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    > -->
                    <el-image
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      @error="erroeChange(file)"
                    >
                      <div slot="error" class="el-image__error" style="cursor:pointer;color:#333">
                        格式不支持预览
                      </div>
                    </el-image>
                    <span class="el-upload-list__item-actions">
                      <span
                        v-if="file.isShow"
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in" />
                      </span>
                      <span
                        v-if="file.fileID"
                        class="el-upload-list__item-delete"
                        @click="fileDownload2()"
                      >
                        <i class="el-icon-download" />
                      </span>
                      <span
                        v-if="!isTrue()||!isxiu"
                        class="el-upload-list__item-delete"
                        @click="clearFile2(file)"
                      >
                        <i class="el-icon-delete" />
                      </span>
                    </span>
                  </div>
                </el-upload>
                <div style="font-size:12px">只能上传.jpg,.png格式!且不超过10M</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="营业执照扫描件" prop="fileName" class="radio_enter">
                <el-input v-show="false" v-model="form.fileName" placeholder="" />
                <el-upload
                  ref="upload"
                  :class="{hide:isTrue()&&isxiu}"
                  :file-list="fileList1"
                  :action="actionUrl"
                  list-type="picture-card"
                  :on-change="handleChange"
                  :on-progress="handleProgress"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleAvatarerr"
                  :auto-upload="false"
                >
                  <i slot="default" class="el-icon-plus" />
                  <div slot="file" slot-scope="{file}">
                    <!-- <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    > -->
                    <el-image
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      @error="erroeChange(file)"
                    >
                      <div slot="error" class="el-image__error" style="cursor:pointer;color:#333">
                        格式不支持预览
                      </div>
                    </el-image>
                    <span class="el-upload-list__item-actions">
                      <span
                        v-if="file.isShow"
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in" />
                      </span>
                      <span
                        v-if="file.fileID"
                        class="el-upload-list__item-delete"
                        @click="fileDownload()"
                      >
                        <i class="el-icon-download" />
                      </span>
                      <span
                        v-if="!isTrue()||!isxiu"
                        class="el-upload-list__item-delete"
                        @click="clearFile(file)"
                      >
                        <i class="el-icon-delete" />
                      </span>
                    </span>
                  </div>
                </el-upload>
                <div style="font-size:12px">只能上传.jpg,.png,.pdf格式!且不超过10M</div>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset class="fieldsetStyle">
          <legend style="margin-left: 40px;font-size:17px">其他文件</legend>
          <el-row>
            <el-col :span="8">
              <el-form-item label="其他文件" prop="fileName7" class="radio_enter">
                <el-upload
                  ref="upload7"
                  :auto-upload="false"
                  :file-list="fileList7"
                  :limit="30"
                  :on-change="handleChange7"
                  :on-exceed="handleExceed7"
                  :on-remove="clearFile7"
                  :on-progress="handleProgress7"
                  :on-error="handleAvatarerr7"
                  :on-preview="fileDownload7"
                  :on-success="handleAvatarSuccess7"
                  :action="actionUrl7"
                  class="upload-demo"
                >
                  <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                  <div slot="tip" class="el-upload__tip" style="font-size:12px;color:#303133;">只能上传.doc,.docx,.pdf格式!且单个文件大小不超过10M</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset v-show="statusMess.length>0" class="fieldsetStyle">
          <legend style="margin-left: 40px;font-size:17px">审核记录</legend>
          <el-table :data="statusMess" tooltip-effect="dark" style="width:100%">
            <el-table-column label="审核机构" prop="auditUser" min-width="120" show-overflow-tooltip />
            <el-table-column label="审核人" prop="auditUserName" min-width="100" show-overflow-tooltip />
            <el-table-column label="审核阶段" prop="currentState" min-width="120" show-overflow-tooltip />
            <el-table-column label="审核意见" prop="remark" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.remark?scope.row.remark:'--' }}
              </template>
            </el-table-column>
            <!-- <el-table-column label="审核备注" prop="userName5" min-width="120" show-overflow-tooltip /> -->
            <el-table-column label="审核时间" prop="auditTime" min-width="120" show-overflow-tooltip />
          </el-table>
        </fieldset>
      </el-form>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <div>
        <el-row style="text-align:center;padding-bottom:20px">
          <el-col :span="24">
            <el-button v-if="form.currentState==='已备案'" type="primary" @click="xiugai">修改机构信息</el-button>
            <el-button :disabled="isTrue()&&isxiu" type="primary" @click="handlerSubmit('form','0')">提交审核</el-button>
            <el-button v-if="form.currentState !=='已备案'" :disabled="isTrue()" type="primary" @click="handlerSubmit1('form','1')">保存</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script>
// 接口方法
import {
  upData,
  flowRecord,
  registVivw,
  registRiid,
  HXSearchFil
} from '@/api/register/register.js'
import { getAdrr } from '@/api/general.js'
import { mapGetters } from 'vuex'
import { getUUIDWG } from '@/utils'
import { getNext, getUsers } from '@/api/workflow/index.js'
import bgMonitor from '@/assets/login/logow.png'
import { Authorized, neiKong, tupian } from '@/utils/formValidate'
export default {
  name: 'Forum',
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      isxiu: true,
      options: [],
      statusMess: [],
      fileIdArr: [],
      remnant: 0,
      remnant2: 0,
      bgMonitorImg: bgMonitor,
      btntxt: '获取验证码',
      disabled: false,
      status: '',
      fileList1: [],
      fileList2: [],
      fileList7: [],
      dialogImageUrl: '',
      dialogVisible: false,
      guanxiabumen: [],
      registerAddrArr: [],
      riidNum: '',
      fileID: '',
      fileID2: '',
      fileID3: '',
      flag: true,
      flag2: true,
      flag7: true,
      form: {
        srnm: '3', // 机构类型
        currentState: '待提交',
        // 文件
        fileName: '', // 营业执照
        fileName2: '', // 营业执照
        fileName7: '',
        // 表单数据
        succ: '', // 统一社会信用代码
        email: '', // 单位联系邮箱
        rinm: '', // 机构名称
        riam: '', // 机构简称
        ozcd: '', // 组织机构代码（如有）
        registerAddr: [], // 法人机构注册地区
        officeAddr: '', // 详细地址
        monitorName: '', // 联系人
        managerTel: '', // 联系方式
        verCode: '', // 验证码
        setPassword: '', // 设置登录密码
        password: '', // 确认登录密码
        websit: '', // 网址
        crTime: '', // 成立时间
        bussScope: '', // 简介
        isMemberCifa: '', // 是否会员
        mainNetBuss: '', // 资质
        buildTime: '2019-11-18'
      },
      huiyuanArr: [
        {
          codeKey: '0',
          codeValue: '是'
        },
        {
          codeKey: '1',
          codeValue: '否'
        }
      ],
      rules: {
        crTime: [{ required: true, message: '请选择', trigger: 'change' }],
        fileName: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName2: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName7: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileNum: [{ required: false, message: '相关文号最多30位', trigger: 'blur', max: 30 }],
        email: [
          { required: true, message: '内容不能为空最多输入50位', trigger: 'blur', max: 50 },
          { pattern: /^[a-z0-9A-Z]+([._\\-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+.){1,63}[a-z0-9A-Z]+$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        ozcd: [
          { required: false, message: '请按正确格式填写组织机构代码', trigger: 'blur', max: 14 },
          { pattern: /^[0-9A-Za-z]{8}-[A-Za-z0-9]{1}$/, message: '请按正确格式填写组织机构代码', trigger: 'blur' }
        ],
        fblia: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        fblc: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        opnm: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        departName: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        quartersName: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        fbln: [
          { required: false, message: '最多30个字符', trigger: 'blur', max: 30 },
          { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
        ],
        lei: [
          { required: false, message: 'LEI最多30位', trigger: 'blur', max: 30 },
          { pattern: /^[0-9a-zA-Z]+$/, message: '只能输入数字或者字母', trigger: 'blur' }
        ],
        verCode: [
          { required: true, message: '请输入您的6位验证码', trigger: 'blur', min: 6, max: 6 },
          { pattern: /^[0-9]+$/, message: '验证码必须为数字值', trigger: 'blur' }
        ],
        ficp: [{ required: true, message: '请选择机构类别', trigger: 'change' }],
        rinm: [
          { required: true, message: '请输入机构名称最多50个字符', trigger: 'blur', max: 50 }
        ],
        isMemberCifa: [{ required: true, message: '请选择', trigger: 'change' }],
        bussScope: [
          { required: true, message: '请输入公司简介最多500个字符', trigger: 'blur', max: 500 }
        ],
        mainNetBuss: [
          { required: false, message: '请输入资质荣誉最多500个字符', trigger: 'blur', max: 500 }
        ],
        websit: [
          { required: true, message: '请输入公司网址', trigger: 'blur' },
          { pattern: /\./, message: '网址必须包含.' }
        ],
        riam: [
          { required: false, message: '请输入机构简称最多30个字符', trigger: 'blur', max: 30 }
        ],
        succ: [
          {
            required: true,
            message: '请正确填写18位统一社会信用代码',
            trigger: 'blur',
            min: 18,
            max: 18
          },
          { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: '请正确填写18位统一社会信用代码', trigger: 'blur' }
        ],
        registerAddr: [{ required: true, message: '请选择注册地区', trigger: 'change' }],
        officeAddr: [{ required: true, message: '内容不能为空且最多50位', trigger: 'blur', max: 50 }],
        monitorName: [
          { required: true, message: '请输入联系人最多30个字符', trigger: 'blur', max: 30 }
        ],
        managerTel: [
          { required: true, message: '请填写正确的联系方式', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请填写正确的联系方式', trigger: 'blur' }
        ]
      },
      workFlowParams: {},
      nextNodeAll: {},
      message: '工作流组件',
      loading: null

    }
  },
  computed: {
    ...mapGetters(['riid', 'rolecode']),
    // 上传地址
    actionUrl() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riid}&extend1=${this.riidNum}&ownSystem=1&ownBusiness=nifaReport`
    },
    actionUrl2() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riid}&extend1=${this.riidNum}&ownSystem=14&ownBusiness=nifaReport`
    },
    actionUrl7() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riid}&extend1=${this.riidNum}&ownSystem=12&ownBusiness=nifaReport`
    },
    paramsObj() {
      const obj = Object.assign({}, this.form)
      delete obj.registerAddr
      obj.fileIds = this.fileIdArr.length > 0 ? this.fileIdArr.join(',') : ''
      obj.workflow = this.workFlowParams
      obj.extend1 = this.riidNum
      return obj
    }
  },
  watch: {
    remnant() {
      if (this.remnant !== 0) {
        if (this.remnant === this.remnant2) {
          if (this.status === '0') {
            flowRecord(this.paramsObj).then(res => {
              this.loading.close()
              this.$message({
                message: '提交审核成功',
                type: 'success'
              })
              this.vivw()
            }).catch(() => {
              this.loading.close()
            })
          } else {
            upData(this.paramsObj).then(res => {
              this.loading.close()
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.vivw()
            }).catch(() => {
              this.loading.close()
            })
          }
        }
      }
    }
  },
  mounted() {
    getAdrr().then(res => {
      this.registerAddrArr = res
    })
    this.$nextTick(function() {
      this.riidNum = getUUIDWG()
      this.vivw()
    })
  },
  methods: {
    erroeChange(e) {
      e.isShow = false
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    isTrue() {
      if (this.form.currentState !== '初审待审核' && this.form.currentState !== '复审待审核' && this.form.currentState !== '已备案') {
        return false
      } else {
        return true
      }
    },
    nextStep() {
      this.remnant = 0
      this.remnant2 = 0
      this.$refs.upload.submit()
      this.$refs.upload2.submit()
      this.$refs.upload7.submit()
      setTimeout(() => {
        if (this.remnant2 === 0) {
          flowRecord(this.paramsObj).then(res => {
            this.loading.close()
            this.$message({
              message: '提交审核成功',
              type: 'success' })
            this.vivw()
          }).catch(() => {
            this.loading.close()
          })
        }
      }, 1200)
    },
    registerChange(val) {
      this.form.registerProvince = String(val[0])
      this.form.registerCity = String(val[1])
      this.form.registerArea = String(val[2])
    },
    xiugai() {
      this.isxiu = false
    },
    vivw() {
      this.isxiu = true
      this.flag = true
      this.flag2 = true
      this.flag7 = true
      registVivw(this.riid).then(res => {
        for (var key in res) {
          this.form[key] = res[key]
        }
        this.form.registerAddr = []
        if (this.form.registerArea) {
          this.form.registerAddr[0] = Number(this.form.registerProvince)
          this.form.registerAddr[1] = Number(this.form.registerCity)
          this.form.registerAddr[2] = Number(this.form.registerArea)
        }
        registRiid(res.riid).then(res => {
          this.statusMess = res
        })
      })
      HXSearchFil(this.riid).then(res => {
        this.fileList1 = []
        this.fileList2 = []
        this.fileList7 = []
        res.forEach(element => {
          if (element.ownSystem === '1') {
            this.form.fileName = element.originalName
            this.fileID = element.attachId
            const obj = {
              url: element.preview,
              fileID: element.attachId,
              name: element.originalName,
              isShow: true
            }
            this.fileList1.push(obj)
          } else if (element.ownSystem === '14') {
            this.form.fileName2 = element.originalName
            this.fileID2 = element.attachId
            const obj = {
              url: element.preview,
              fileID: element.attachId,
              name: element.originalName,
              isShow: true
            }
            this.fileList2.push(obj)
          } else if (element.ownSystem === '12') {
            this.fileList7.push({
              name: element.originalName,
              fileID: element.attachId
            })
            this.form.fileName7 = element.originalName
          }
        })
      })
    },
    fileDownload() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID}`
    },
    fileDownload2() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID2}`
    },
    fileDownload7(file) {
      if (file.fileID) {
        location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
      }
    },
    // 清文件名字
    clearFile() {
      this.form.fileName = ''
      this.$refs.upload.clearFiles()
      if (this.fileID) {
        this.fileIdArr.push(this.fileID)
        this.fileID = ''
      }
    },
    clearFile2() {
      this.form.fileName2 = ''
      this.$refs.upload2.clearFiles()
      if (this.fileID2) {
        this.fileIdArr.push(this.fileID2)
        this.fileID2 = ''
      }
    },
    clearFile7(file, fileList) {
      if (fileList.length > 0) {
        this.form.fileName7 = fileList[0].name
      } else {
        this.form.fileName7 = ''
      }
      if (file.fileID) {
        this.fileIdArr.push(file.fileID)
      }
    },
    handleProgress(file, fileList) {
      if (this.flag) {
        this.remnant2 += 1
        this.flag = false
      }
    },
    handleChange(file, fileList) {
      if (this.fileID) {
        this.fileIdArr.push(this.fileID)
        this.fileID = ''
      }
      if (fileList.length > 1) {
        fileList.shift()
        this.form.fileName = fileList[0].name
      } else {
        this.form.fileName = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.form.fileName = ''
        this.$refs.upload.clearFiles()
        return false
      }
      if (!Authorized(file)) {
        this.form.fileName = ''
        this.$refs.upload.clearFiles()
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
      this.remnant -= 1
      this.loading.close()
      this.form.fileName = ''
      this.flag = true
      this.$refs.upload.clearFiles()
      this.$confirm('您的营业执照上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleProgress2(file, fileList) {
      if (this.flag2) {
        this.remnant2 += 1
        this.flag2 = false
      }
    },
    handleChange2(file, fileList) {
      if (this.fileID2) {
        this.fileIdArr.push(this.fileID2)
        this.fileID2 = ''
      }
      if (fileList.length > 1) {
        fileList.shift()
        this.form.fileName2 = fileList[0].name
      } else {
        this.form.fileName2 = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.form.fileName2 = ''
        this.$refs.upload2.clearFiles()
        return false
      }
      if (!tupian(file)) {
        this.form.fileName2 = ''
        this.$refs.upload2.clearFiles()
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess2(res) {
      setTimeout(() => {
        this.remnant += 1
      }, 1000)
      if (res.code !== 200) {
        this.handleAvatarerr2()
      }
    },
    // 文件上传失败回调
    handleAvatarerr2() {
      this.remnant -= 1
      this.loading.close()
      this.form.fileName2 = ''
      this.flag2 = true
      this.$refs.upload2.clearFiles()
      this.$confirm('您的营业执照上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleProgress7(event, file, fileList) {
      if (this.flag7) {
        fileList.forEach(element => {
          if (element.fileID === undefined) {
            this.remnant2 += 1
            this.flag7 = false
          }
        })
      }
    },
    handleChange7(file, fileList) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        fileList.splice(fileList.indexOf(file), 1)
        return false
      }
      if (!neiKong(file)) {
        fileList.splice(fileList.indexOf(file), 1)
      }
    },
    handleExceed7() {
      this.$message.error('最多只能选择30个文件!')
    },
    // 上传文件成功的回调
    handleAvatarSuccess7(res) {
      setTimeout(() => {
        this.remnant += 1
      }, 1000)
      if (res.code !== 200) {
        this.handleAvatarerr7()
      }
    },
    // 文件上传失败回调
    handleAvatarerr7() {
      this.remnant -= 1
      this.loading.close()
      this.form.fileName7 = ''
      this.flag7 = true
      this.$refs.upload7.clearFiles()
      this.$confirm('您的其他文件上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    // 提交审核
    handlerSubmit(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.status = type
          // 验证
          this.$confirm(
            '提交审核后将不可修改，请确认信息已准确无误填写？',
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
            if (this.form.currentState !== '已备案') {
              this.form.flowType = '0'
            } else {
              this.form.flowType = '1'
            }
            getNext({ flowID: 'organRegister' }).then(res => {
              this.nextNodeAll = res
              getUsers(this.nextNodeAll).then(res => {
                this.workFlowParams = Object.assign({}, res)
                this.workFlowParams.flowNextNode = this.nextNodeAll.flowNextNode
                this.nextStep()
              }).catch(() => {
                this.loading.close()
                this.$message({
                  message: '获取审核人员失败',
                  type: 'error' })
              })
            }).catch(() => {
              this.loading.close()
              this.$message({
                message: '获取审核节点失败',
                type: 'error' })
            })
          }).catch(() => {})
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
    handlerSubmit1(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.status = type
          delete this.form.flowType
          delete this.paramsObj.workflow
          delete this.paramsObj.currentStates
          // 验证
          this.loading = this.$loading({
            lock: true
          })
          this.remnant = 0
          this.remnant2 = 0
          this.$refs.upload.submit()
          this.$refs.upload2.submit()
          this.$refs.upload7.submit()
          setTimeout(() => {
            if (this.remnant2 === 0) {
              upData(this.paramsObj).then(res => {
                this.loading.close()
                this.$message({
                  message: '保存成功',
                  type: 'success' })
                this.vivw()
              }).catch(() => {
                this.loading.close()
              })
            }
          }, 1200)
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

<style lang="scss">
.registerStyleRz{
   .hide .el-upload--picture-card {
    display: none;
   }
  .radio_enter {
      > label {
        width: 100%;
        text-align: left;
      }
    }
    .styleone{
      color: red;
      position: absolute;
      top: 10px;
      right: 485px;
    }
    .anniu {
      width: 25%;
      margin: -20px auto 20px auto;
      display: flex;
    }
    .lei {
      position: relative;
      top: 36px;
      left: -20px;
    }
    .fieldset {
      width: 1100px;
      margin: 12px auto;
      border-color: #a2b9f0;
      border-radius: 6px 6px;
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
    .el-card__body {
      padding: 0;
    }
    .baseBox {
      .basic-form {
        padding: 5px;
      }
      .el-input--medium {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
      .el-cascader {
        width: 100%;
      }
    }
}
</style>
