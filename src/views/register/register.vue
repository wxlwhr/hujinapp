<template>
  <el-card class="registerOne">
    <div slot="header" class="header">
      <div style="margin-left:5%">
        <img :src="bgMonitorImg" alt="">
      </div>
    </div>
    <h2 style="width:100%;text-align:center;margin-top:50px">金融机构注册</h2>
    <div class="baseBox">
      <el-form ref="form" :model="form" :rules="rules" class="basic-form">
        <fieldset class="fieldsetStyle">
          <legend style="margin-left: 40px; font-size:17px">机构基本信息</legend>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-alert
                :closable="false"
                title="如贵司已经在协会系统注册过，可先输入“统一社会信用代码”，已注册过的相关信息将会自动填写"
                center
                type="warning"
              />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="统一社会信用代码" prop="succ">
                <el-input
                  v-model.trim="form.succ"
                  placeholder="请输入"
                  clearable
                  maxlength="18"
                  @blur="searchSucc(form.succ)"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构名称" prop="rinm">
                <el-input v-model.trim="form.rinm" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构简称" prop="riam">
                <el-input v-model.trim="form.riam" placeholder="请输入" clearable />
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
                label="金融机构编码"
                prop="ficd"
              >
                <el-input
                  v-model.trim="form.ficd"
                  placeholder="请输入"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
            >
              <el-form-item
                label="LEI码（如有）"
                prop="lei"
              >
                <el-input
                  v-model.trim="form.lei"
                  placeholder="请输入"
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
                  placeholder="请输入"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="机构类别"
                prop="ficp"
              >
                <el-select v-model="form.ficp" placeholder="请选择" @change="isRequired(form.ficp)">
                  <el-option
                    v-for="item in jigou"
                    :key="item.codeKey"
                    :label="item.codeValue"
                    :value="item.codeValue"
                  />
                </el-select>
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
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
            >
              <el-form-item
                label="验证码"
                prop="verCode"
                class="radio_enter"
              >
                <el-input
                  v-model.trim="form.verCode"
                  placeholder="请输入"
                  style="width:160px"
                  clearable
                  @blur="isverCode(form.verCode)"
                />
                <el-button
                  :disabled="disabled"
                  plain
                  type="primary"
                  round
                  @click="getverific"
                >{{ btntxt }}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="单位联系邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="分公司数量" prop="departName">
                <el-input v-model.trim="form.departName" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="子公司数量" prop="quartersName">
                <el-input v-model.trim="form.quartersName" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="持有金融业务许可证的子公司数量" prop="fbln">
                <el-input v-model.trim="form.fbln" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="营业执照扫描件" prop="fileName">
                <el-input v-model="form.fileName" disabled style="width: 100%">
                  <template slot="prepend">
                    <el-button v-show="form.fileName" type="primary" @click="clearFile">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                    <el-upload
                      v-show="!form.fileName"
                      ref="upload"
                      :auto-upload="false"
                      :on-change="handleChange"
                      :on-progress="handleProgress"
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
                <div style="font-size:12px">只能上传.jpg,.png,.pdf格式!且不超过10M</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-form-item label="授权函" prop="fileName3">
                    <el-input v-model="form.fileName3" disabled style="width: 100%">
                      <template slot="prepend">
                        <el-button v-show="form.fileName3" type="primary" @click="clearFile3">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                        <el-upload
                          v-show="!form.fileName3"
                          ref="upload3"
                          :auto-upload="false"
                          :on-change="handleChange3"
                          :on-progress="handleProgress3"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess3"
                          :on-error="handleAvatarerr3"
                          :action="actionUrl3"
                          class="upload-demo"
                        >
                          <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                        </el-upload>
                      </template>
                    </el-input>
                    <div style="font-size:12px">只能上传.jpg,.png,.pdf格式!且不超过10M</div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <a href="./static/授权函模板.doc" style="color:#409eff;position:absolute;top:43px">模版下载<i class="el-icon-download el-icon--right" /></a>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="金融业务许可证（或备案证书）扫描件" prop="fileName2" class="radio_enter">
                <el-upload
                  ref="upload2"
                  :auto-upload="false"
                  :limit="30"
                  :on-change="handleChange2"
                  :on-exceed="handleExceed2"
                  :on-progress="handleProgress2"
                  :on-error="handleAvatarerr2"
                  :on-success="handleAvatarSuccess2"
                  :action="actionUrl2"
                  class="upload-demo"
                >
                  <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                  <div slot="tip" class="el-upload__tip" style="font-size:12px;color:#303133;">只能上传pdf、jpg、jpeg、png格式，且单个文件大小不超过10M</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset class="fieldsetStyle">
          <legend style="margin-left: 40px;font-size:17px">App发布情况</legend>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-alert
                :closable="false"
                title="仅需统计涉及资金交易和个人信息采集的APP数量，资讯发布类的APP无需统计"
                center
                type="warning"
              />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="总部发布App总数" prop="fblc">
                <el-input v-model.trim="form.fblc" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分公司发布App总数" prop="fblia">
                <el-input v-model.trim="form.fblia" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="持有金融业务许可证的子公司发布App总数" prop="opnm">
                <el-input v-model.trim="form.opnm" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset class="fieldsetStyle">
          <legend style="margin-left: 40px;font-size:17px">客户端软件安全内控管理制度</legend>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="开发规范" prop="fileName4" class="radio_enter">
                <el-upload
                  ref="upload4"
                  :auto-upload="false"
                  :limit="30"
                  :on-change="handleChange4"
                  :on-exceed="handleExceed4"
                  :on-progress="handleProgress4"
                  :on-error="handleAvatarerr4"
                  :on-success="handleAvatarSuccess4"
                  :action="actionUrl4"
                  class="upload-demo"
                >
                  <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                  <div slot="tip" class="el-upload__tip" style="font-size:12px;color:#303133;">只能上传.doc,.docx,.pdf格式!且单个文件大小不超过10M</div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运维管理文档" prop="fileName5" class="radio_enter">
                <el-upload
                  ref="upload5"
                  :auto-upload="false"
                  :limit="30"
                  :on-change="handleChange5"
                  :on-exceed="handleExceed5"
                  :on-progress="handleProgress5"
                  :on-error="handleAvatarerr5"
                  :on-success="handleAvatarSuccess5"
                  :action="actionUrl5"
                  class="upload-demo"
                >
                  <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                  <div slot="tip" class="el-upload__tip" style="font-size:12px;color:#303133;">只能上传.doc,.docx,.pdf格式!且单个文件大小不超过10M</div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="安全管理文档" prop="fileName6" class="radio_enter">
                <el-upload
                  ref="upload6"
                  :auto-upload="false"
                  :limit="30"
                  :on-change="handleChange6"
                  :on-exceed="handleExceed6"
                  :on-progress="handleProgress6"
                  :on-error="handleAvatarerr6"
                  :on-success="handleAvatarSuccess6"
                  :action="actionUrl6"
                  class="upload-demo"
                >
                  <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                  <div slot="tip" class="el-upload__tip" style="font-size:12px;color:#303133;">只能上传.doc,.docx,.pdf格式!且单个文件大小不超过10M</div>
                </el-upload>
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
                  :limit="30"
                  :on-change="handleChange7"
                  :on-exceed="handleExceed7"
                  :on-progress="handleProgress7"
                  :on-error="handleAvatarerr7"
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
        <fieldset class="fieldsetStyle">
          <legend style="margin-left: 40px;font-size:17px">机构联系信息</legend>
          <el-row
            :gutter="20"
          >
            <el-col
              :span="12"
            >
              <el-form-item
                label="设置登录密码"
                prop="setPassword"
              >
                <el-input
                  v-model.trim="form.setPassword"
                  type="password"
                  placeholder="密码为8到16位且包含大小写字母及数字"
                  autocomplete="new-password"
                  maxlength="16"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="12"
            >
              <el-form-item
                label="确认登录密码"
                prop="password"
              >
                <el-input
                  v-model.trim="form.password"
                  type="password"
                  placeholder="请确认密码"
                  autocomplete="new-password"
                  maxlength="16"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <div style="width:1100px;margin:auto">
          <el-form-item>
            <span style="color:red">*</span> <el-checkbox v-model="isVerification" />
            本机构保证报送的材料和信息真实、准确、完整、合规。
          </el-form-item>
        </div>
      </el-form>
      <div>
        <el-row style="text-align:center;padding-bottom:20px;">
          <el-col :span="24">
            <el-button :disabled="!isVerification" type="primary" @click="handlerSubmit('form')">注册</el-button>
            <el-button @click="handlerSubmitreturn">返回上一步</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script>
// 接口方法
import {
  registPro,
  ozcdVivw,
  succVivw,
  isVerific,
  verific
  // ISocr,
} from '@/api/register/register.js'
import { getAdrr, getClock } from '@/api/general.js'
import Aes from '@/utils/Aes'
import { sm3 } from '@/utils/sm3'
import bgMonitor from '@/assets/login/logow.png'
import { getUUIDWG } from '@/utils'
import { Authorized, Xuekezheng, neiKong } from '@/utils/formValidate'
export default {
  name: 'Forum',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.password !== '') {
          this.$refs.form.validateField('password')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.setPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerAddrArr: [],
      options: [],
      isVerification: '', // 最后的承诺
      remnant: 0,
      remnant2: 0,
      bgMonitorImg: bgMonitor, // 图
      btntxt: '获取验证码',
      auth_time: 0, // 计时
      disabled: false,
      riidNum: '', // id
      flag: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: true,
      form: {
        srnm: '0', // 机构类型
        // 文件
        // osnm: '',
        fileName: '',
        fileName2: '',
        fileName3: '',
        fileName4: '',
        fileName5: '',
        fileName6: '',
        fileName7: '',
        currentState: '待提交',
        // 表单数据
        ficp: '', // 机构类别
        email: '', // 单位联系邮箱
        verCode: '', // 验证码
        password: '', // 确认登录密码
        succ: '', // 统一社会信用代码
        ficd: '', // 金融机构编码
        ozcd: '', // 组织机构代码（如有）
        fbln: '', // 持有金融业务许可证的子公司数量
        fblc: '', // 总部发布App总数
        fblia: '', // 分公司发布App总数
        lei: '', // LEI码（如有）
        opnm: '', // 持有金融业务许可证的子公司发布App总数
        registerAddr: [], // 法人机构注册地区
        officeAddr: '', // 详细地址
        monitorName: '', // 联系人
        managerTel: '', // 联系方式
        quartersName: '', // 子公司数量
        departName: '', // 分公司数量
        setPassword: '', // 设置登录密码
        rinm: '', // 机构名称
        riam: '', // 机构简称
        // registerCapital: 100,
        // cityDept: '37',
        // provinceDept: '27',
        buildTime: '2019-11-18'
        // osnm: '18',
        // icpNum: '19',
        // ifsb: '20',
        // bussScope: '21',
        // websit: '22',
        // srnt: '24',
        // srit: '25',
        // srid: '26',
        // isLongValid: '36', // 是否长期有效
        // postCode: '30',
        // isMemberCifa: '31',
        // isSignFdag: '32',
        // position: '35',
        // srTime: '2019-08-11',
        // signFdagNameBranch: '38',
        // sex: '39',
        // deptID1: '4',
        // deptID: '5'
      },
      rules: {
        fileName: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName2: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName3: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName4: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName5: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName6: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName7: [{ required: false, message: '请上传文件', trigger: 'change' }],
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
        ficd: [{ required: false, pattern: /^[A-Z]{1}[0-9]{13}$/, message: '请输入正确的金融机构编码', trigger: 'blur' }],
        verCode: [
          { required: true, message: '请输入您的6位验证码', trigger: 'blur', min: 6, max: 6 },
          { pattern: /^[0-9]+$/, message: '验证码必须为数字值', trigger: 'blur' }
        ],
        // 密码
        setPassword: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { message: '密码最少为8位最大为16位', trigger: 'blur' },
          {
            pattern: /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: '必须含大小写字母数字最多16位不含特殊符号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, validator: validatePass2, trigger: 'blur' },
          { message: '密码最少为8位最大为16位', trigger: 'blur' },
          {
            pattern: /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: '必须含大小写字母数字最多16位不含特殊符号',
            trigger: 'blur'
          }
        ],
        ficp: [{ required: true, message: '请选择机构类别', trigger: 'change' }],
        email: [
          { required: true, message: '内容不能为空最多输入50位', trigger: 'blur', max: 50 },
          { pattern: /^[a-z0-9A-Z]+([._\\-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+.){1,63}[a-z0-9A-Z]+$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        rinm: [
          { required: true, message: '请输入机构名称最多50个字符', trigger: 'blur', max: 50 }
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
      jigou: [],
      loading: null
    }
  },
  computed: {
    // 上传地址
    actionUrl() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=1&ownBusiness=nifaReport`
    },
    actionUrl2() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=2&ownBusiness=nifaReport`
    },
    actionUrl3() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=3&ownBusiness=nifaReport`
    },
    actionUrl4() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=4&ownBusiness=nifaReport`
    },
    actionUrl5() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=5&ownBusiness=nifaReport`
    },
    actionUrl6() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=6&ownBusiness=nifaReport`
    },
    actionUrl7() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=12&ownBusiness=nifaReport`
    },
    paramsObj() {
      const obj = Object.assign({}, this.form)
      delete obj.registerAddr
      obj.riid = this.riidNum
      obj.password = `${sm3(this.form.password)}`
      obj.setPassword = `${sm3(this.form.setPassword)}`
      return obj
    }
  },
  watch: {
    remnant() {
      if (this.remnant === this.remnant2) {
        registPro(this.paramsObj).then(res => {
          this.loading.close()
          this.$router.push({ path: '/waiting' })
        }).catch(() => {
          this.loading.close()
          setTimeout(() => {
            this.$router.go(0)
          }, 5000)
        })
      }
    }
  },
  mounted() {
    if (sessionStorage.getItem('routerName') === 'waiting') {
      this.$router.push({ path: '/login' })
    }
    this.$nextTick(function() {
      this.riidNum = getUUIDWG()
      this.getData()
    })
  },
  methods: {
    isRequired(val) {
      if (val === '保险集团（控股）公司' || val === '其他') {
        this.rules.ficd[0].required = false
        this.$refs['form'].clearValidate('ficd')
      } else {
        this.rules.ficd[0].required = true
      }
    },
    registerChange(val) {
      this.form.registerProvince = String(val[0])
      this.form.registerCity = String(val[1])
      this.form.registerArea = String(val[2])
    },
    // 获取验证码
    getverific() {
      if (this.form.managerTel) {
        this.disabled = true
        this.auth_time = 60
        var auth_timetimer = setInterval(() => {
          this.auth_time--
          this.btntxt = this.auth_time + '秒后再次发送'
          if (this.auth_time <= 0) {
            this.disabled = false
            clearInterval(auth_timetimer)
            this.btntxt = '获取验证码'
          }
        }, 1000)
        verific(Aes.encrypt(this.form.managerTel)).then(res => {})
      } else {
        this.$message({
          message: '请您先输入联系方式',
          type: 'warning'
        })
      }
    },
    isverCode(data) {
      if (data) {
        isVerific(this.form.managerTel, this.form.verCode).then(res => {
          if (res !== '验证码验证通过！') {
            this.$message({
              message: '短信验证码验证失败',
              type: 'warning'
            })
            this.form.verCode = ''
          }
        }).catch(() => {
          this.form.verCode = ''
        })
      }
    },
    downloadFn() {
      location.href = `nifa-autonomy-file/upload/download-file?flag=1`
    },
    searchSucc(data) {
      if (data) {
        succVivw({ succ: data }).then(res => {
          if (res !== null) {
            this.$message.error('该统一社会信用代码已被注册！')
            this.form.succ = ''
          } else {
            ozcdVivw({ ricd: data }).then(res => {
              if (res !== null) {
                this.$confirm('是否确定使用已有注册信息?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  center: true
                }).then(() => {
                  this.form.rinm = res.rinm
                  this.form.registerAddr = res.registerAddr
                  this.form.officeAddr = res.officeAddr
                  this.form.monitorName = res.monitorName
                  this.form.managerTel = res.managerTel
                }).catch(() => {})
              }
            })
          }
        })
      }
    },
    // 清文件名字
    clearFile() {
      this.form.fileName = ''
    },
    clearFile2() {
      this.form.fileName2 = ''
    },
    clearFile3() {
      this.form.fileName3 = ''
    },
    clearFile4() {
      this.form.fileName4 = ''
    },
    clearFile5() {
      this.form.fileName5 = ''
    },
    clearFile6() {
      this.form.fileName6 = ''
    },
    clearFile7() {
      this.form.fileName7 = ''
    },
    handleProgress(file, fileList) {
      if (this.flag) {
        this.remnant2 += 1
        this.flag = false
      }
    },
    handleProgress2(event, file, fileList) {
      if (this.flag2) {
        this.remnant2 += fileList.length
        this.flag2 = false
      }
    },
    handleProgress3(file, fileList) {
      if (this.flag3) {
        this.remnant2 += 1
        this.flag3 = false
      }
    },
    handleProgress4(event, file, fileList) {
      if (this.flag4) {
        this.remnant2 += fileList.length
        this.flag4 = false
      }
    },
    handleProgress5(event, file, fileList) {
      if (this.flag5) {
        this.remnant2 += fileList.length
        this.flag5 = false
      }
    },
    handleProgress6(event, file, fileList) {
      if (this.flag6) {
        this.remnant2 += fileList.length
        this.flag6 = false
      }
    },
    handleProgress7(event, file, fileList) {
      if (this.flag7) {
        this.remnant2 += fileList.length
        this.flag7 = false
      }
    },
    handleChange(file, fileList) {
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
        return false
      }
      if (!Authorized(file)) {
        this.form.fileName = ''
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
    handleChange2(file, fileList) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        fileList.splice(fileList.indexOf(file), 1)
        return false
      }
      if (!Xuekezheng(file)) {
        fileList.splice(fileList.indexOf(file), 1)
      }
    },
    handleExceed2() {
      this.$message.error('最多只能选择30个文件!')
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
      this.$confirm('您的金融业务许可证上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleChange3(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        this.form.fileName3 = fileList[0].name
      } else {
        this.form.fileName3 = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.form.fileName3 = ''
        return false
      }
      if (!Authorized(file)) {
        this.form.fileName3 = ''
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess3(res) {
      setTimeout(() => {
        this.remnant += 1
      }, 1000)
      if (res.code !== 200) {
        this.handleAvatarerr3()
      }
    },
    // 文件上传失败回调
    handleAvatarerr3() {
      this.remnant -= 1
      this.loading.close()
      this.flag3 = true
      this.form.fileName3 = ''
      this.$refs.upload3.clearFiles()
      this.$confirm('您的授权函上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleChange4(file, fileList) {
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
    handleExceed4() {
      this.$message.error('最多只能选择30个文件!')
    },
    // 上传文件成功的回调
    handleAvatarSuccess4(res) {
      setTimeout(() => {
        this.remnant += 1
      }, 1000)
      if (res.code !== 200) {
        this.handleAvatarerr4()
      }
    },
    // 文件上传失败回调
    handleAvatarerr4() {
      this.remnant -= 1
      this.flag4 = true
      this.form.fileName4 = ''
      this.$refs.upload4.clearFiles()
      this.$confirm('您的开发管理文档上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleChange5(file, fileList) {
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
    // 上传文件成功的回调
    handleAvatarSuccess5(res) {
      setTimeout(() => {
        this.remnant += 1
      }, 1000)
      if (res.code !== 200) {
        this.handleAvatarerr5()
      }
    },
    handleExceed5() {
      this.$message.error('最多只能选择30个文件!')
    },
    // 文件上传失败回调
    handleAvatarerr5() {
      this.remnant -= 1
      this.loading.close()
      this.flag5 = true
      this.form.fileName5 = ''
      this.$refs.upload5.clearFiles()
      this.$confirm('您的运维管理文档上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleChange6(file, fileList) {
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
    handleExceed6() {
      this.$message.error('最多只能选择30个文件!')
    },
    // 上传文件成功的回调
    handleAvatarSuccess6(res) {
      setTimeout(() => {
        this.remnant += 1
      }, 1000)
      if (res.code !== 200) {
        this.handleAvatarerr6()
      }
    },
    // 文件上传失败回调
    handleAvatarerr6() {
      this.remnant -= 1
      this.loading.close()
      this.flag6 = true
      this.form.fileName6 = ''
      this.$refs.upload6.clearFiles()
      this.$confirm('您的安全管理文档上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
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
      this.flag7 = true
      this.form.fileName7 = ''
      this.$refs.upload7.clearFiles()
      this.$confirm('您的其他文件上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    // 获取级联菜单的label
    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.value === value) { opt = itm.children; return itm }
        }
        return null
      })
    },
    // 获取国籍、金融机构编码、地址
    getData() {
      // 三级联动数据
      getAdrr().then(res => {
        this.registerAddrArr = res
      })
      getClock('C5000000').then(res => {
        this.jigou = res
      })
    },
    // 立即注册
    handlerSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证
          this.$confirm(
            '信息提交后不可更改，您的统一社会信用代码将作为您的登录名，请您牢记。',
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
            this.remnant = 0
            this.remnant2 = 0
            this.$refs.upload.submit()
            this.$refs.upload2.submit()
            this.$refs.upload3.submit()
            this.$refs.upload4.submit()
            this.$refs.upload5.submit()
            this.$refs.upload6.submit()
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
    // 返回上一页
    handlerSubmitreturn() {
      this.$confirm('确定返回上一步吗？返回后本页面填写信息将不会保存。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$router.push({ path: '/promise' })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消返回'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.registerOne{
      width: 100%;
  .el-card__header{
      height: 80px;
      line-height: 80px;
  }
  .radio_enter {
      > label {
        width: 100%;
        text-align: left;
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
