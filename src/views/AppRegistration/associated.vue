<template>
  <el-card class="AppRegistrationVivw">
    <div slot="header" class="clearfix btnCard">
      <span>关联App</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules">
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">客户端软件信息</legend>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-col :span="12">
              <el-form-item label="包名" prop="packageName">
                <el-tooltip class="item" effect="dark" content="应用包名，作为应用的唯一标识，一般以域名反转形式标识,例如:cn.com.xxx" placement="top">
                  <i class="el-icon-question " />
                </el-tooltip>
                <el-input v-model="form.packageName" type="text" placeholder="包名" clearable :disabled="Disabled" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="软件名称" prop="appName">
                <el-input v-model="form.appName" type="text" placeholder="软件名称" clearable :disabled="Disabled" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="软件版本" prop="appVersion">
                <el-input v-model="form.appVersion" type="text" placeholder="软件版本" clearable :disabled="Disabled" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="APP备案类型" prop="recordType">
                <el-tooltip placement="top">
                  <div slot="content">
                    资金交易客户端应用软件：直接面向用户提供资金交易服务的移动金融客户端软件（包括，但不限于手机银行，支付App等）
                    <br>信息采集类客户端应用软件：不直接面向用户提供资金交易服务，但需采集个人敏感信息的移动金融客户端应用软件
                    <br>咨询查询类客户端应用软件：仅提供金融产品推介、信息查询、咨询推送等服务的移动金融客户端应用软件
                  </div>
                  <el-select v-model="form.recordType" placeholder="APP备案类型" clearable :disabled="Disabled">
                    <el-option v-for="(item,index) in lxList" :key="index" :label="item.name" :value="item.code" />
                  </el-select>
                </el-tooltip>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="是否支持IPv6" prop="leType" class="radio_enter">
                <el-radio-group v-model="form.ipv6">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col> -->
          </el-col>
          <el-col :span="8">
            <el-form-item label="APP产品类型" prop="productType">
              <el-select v-model="form.productType" placeholder="APP产品类型" clearable :disabled="Disabled" @change="getCode()">
                <el-option v-for="(item,index) in AppList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="语言类型" prop="leType" class="radio_enter">
              <el-radio-group v-model="form.leType" :disabled="Disabled">
                <el-radio label="0">中文</el-radio>
                <el-radio label="1">非中文</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="24">
              <el-form-item label="软件图标" prop="fileName" class="radio_enter radio_top">
                <el-tooltip class="item" effect="dark" content="应用图标应当与安装包中图标一致，清晰、无水印、不允许影印件和扫描件，若上传圆角图标则圆角半径70px最佳且背景透明，大小不超过2M，建议最佳尺寸（512x512px或1024x1024px）,建议最佳格式png、jpg。" placement="top">
                  <i class="el-icon-question" />
                </el-tooltip>
                <el-input v-show="false" v-model="form.fileName" placeholder="" />
                <el-upload
                  ref="upload"
                  class="avatar-uploader"
                  :auto-upload="false"
                  :action="actionUrl"
                  :on-success="handleAvatarSuccess"
                  :on-progress="handleProgress"
                  :on-change="handleChange"
                  :show-file-list="false"
                  :disabled="Disabled"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
              <el-input v-show="false" v-model="form.description" placeholder="" />
              <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请描述app功能，限500字" maxlength="500" :disabled="Disabled" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="APP应用页截图" prop="fileName2" class="radio_enter radio_bottom">
              <el-alert
                :closable="false"
                description="截图须与申报软件实际运行界面一致，应清晰展示应用主界面、主要功能页（资金交易或支付等）、版本信息页、隐私政策页（发布、生效或更新日期）等，但不应显示敏感信息。"
                style="height:35px;margin-bottom:10px"
                type="warning"
              />
              <el-tooltip class="item" effect="dark" content="单张图片大小不超过2M，建议最佳尺寸（1080x1920px）,建议最佳格式png、jpg。" placement="top">
                <i class="el-icon-question " />
              </el-tooltip>
              <el-input v-show="false" v-model="form.fileName2" placeholder="" />
              <el-upload
                ref="upload2"
                :class="{hide:Disabled}"
                :file-list="fileList2"
                :action="actionUrl2"
                list-type="picture-card"
                :on-change="handleChange2"
                :on-progress="handleProgress2"
                :on-success="handleAvatarSuccess2"
                :auto-upload="false"
                :disabled="Disabled"
              >
                <i slot="default" class="el-icon-plus" />
                <div slot="file" slot-scope="{file}">
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
                      @click="fileDownload2(file)"
                    >
                      <i class="el-icon-download" />
                    </span>
                    <span
                      v-if="!Disabled"
                      class="el-upload-list__item-delete"
                      @click="clearFile2(file)"
                    >
                      <i class="el-icon-delete" />
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="是否为本单位开发" prop="devlopType" class="radio_enter">
              <el-radio-group v-model="form.devlopType" disabled @change="clearSi">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第三方安全加固单位（如有）" prop="otherAssistOrg">
              <el-input v-model="form.otherAssistOrg" type="text" placeholder="第三方安全加固单位（如有）" clearable :disabled="Disabled" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第三方加固单位统一社会信用代码" prop="otherAssistOrgCode">
              <el-input v-model="form.otherAssistOrgCode" type="text" placeholder="第三方加固单位统一社会信用代码" clearable :disabled="Disabled" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.devlopType === 1" :gutter="20">
          <el-col :span="8">
            <el-form-item label="开发单位" prop="developer">
              <el-input v-model="form.developer" type="text" placeholder="开发单位" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开发单位单位统一社会信用代码" prop="creditCode">
              <el-input v-model="form.creditCode" type="text" placeholder="开发单位统一社会信用代码" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.devlopType === 1" :gutter="20">
          <el-col :span="12">
            <el-form-item label="代理公司营业执照电子影印件" prop="fileName3">
              <el-input v-model="form.fileName3" disabled style="width: 100%">
                <template slot="prepend">
                  <el-button v-show="form.fileName3" :disabled="Disabled" type="primary" @click="clearFile3">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                  <el-upload
                    v-show="!form.fileName3"
                    ref="upload3"
                    :auto-upload="false"
                    :on-change="handleChange3"
                    :show-file-list="false"
                    :on-progress="handleProgress3"
                    :on-success="handleAvatarSuccess3"
                    :on-error="handleAvatarerr3"
                    :action="actionUrl3"
                    :disabled="Disabled"
                    class="upload-demo"
                  >
                    <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                  </el-upload>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="ICP/SP许可电子影印件" prop="fileName4">
              <el-input v-model="form.fileName4" disabled style="width: 100%">
                <template slot="prepend">
                  <el-button v-show="form.fileName4" :disabled="Disabled" type="primary" @click="clearFile4">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                  <el-upload
                    v-show="!form.fileName4"
                    ref="upload4"
                    :auto-upload="false"
                    :on-change="handleChange4"
                    :show-file-list="false"
                    :on-progress="handleProgress4"
                    :on-success="handleAvatarSuccess4"
                    :on-error="handleAvatarerr4"
                    :disabled="Disabled"
                    :action="actionUrl4"
                    class="upload-demo"
                  >
                    <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                  </el-upload>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item v-if="isJurisdiction" label="应用权限" prop="appPermissions" class="radio_enter">
              <el-checkbox-group v-model="form.appPermissions" :disabled="Disabled">
                <el-checkbox v-for="item in regionalOptions" :key="item.codeKey" :label="item.codeKey">{{ item.codeValue }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入" maxlength="500" />
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">个人信息保护策略</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="隐私策略" prop="fileName5">
              <el-input v-model="form.fileName5" disabled style="width: 100%">
                <template slot="prepend">
                  <el-button v-show="form.fileName5" :disabled="Disabled" type="primary" @click="clearFile5">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                  <el-upload
                    v-show="!form.fileName5"
                    ref="upload5"
                    :auto-upload="false"
                    :on-change="handleChange5"
                    :show-file-list="false"
                    :on-progress="handleProgress5"
                    :on-success="handleAvatarSuccess5"
                    :on-error="handleAvatarerr5"
                    :action="actionUrl5"
                    :disabled="Disabled"
                    class="upload-demo"
                  >
                    <el-tooltip placement="top">
                      <div slot="content">包括隐私政策<br>个人信息收集使用的目的<br>个人信息使用结束后处理机制。</div>
                      <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                    </el-tooltip>
                  </el-upload>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset v-if="!Disabled" class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">认证机构</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="认证机构" prop="approveOrg">
              <el-tooltip class="item" effect="dark" content=" 选择该认证机构后，认证机构可查看申报机构的联系人信息" placement="top">
                <i class="el-icon-question " />
              </el-tooltip>
              <el-select
                v-model="form.approveOrg"
                filterable
                remote
                clearable
                reserve-keyword
                placeholder="请输入关键词搜索"
                :remote-method="remoteMethod"
                :loading="loading1"
                @change="changeOrgTest"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.rinm"
                  :value="item.riid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择检测机构" prop="orgId">
              <el-tooltip class="item" effect="dark" content=" 选择该检测机构后，检测机构可查看申报机构的联系人信息" placement="top">
                <i class="el-icon-question " />
              </el-tooltip>
              <el-select v-model="form.orgId" placeholder="请选择检测机构" clearable>
                <el-option v-for="(item,index) in optionsTest" :key="index" :label="item.rinm" :value="item.riid" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">客户端软件安装包</legend>
        <fileUpload ref="file" :fileid="this.$route.query.id" :extend1="riidNum" :show-msg="showMsg" :disabled="Disabled" @subNext="subNext" @delId="delId" />
      </fieldset>
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">其他信息</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="其他信息文件" prop="fileName1">
              <el-input v-model="form.fileName1" disabled style="width: 100%">
                <template slot="prepend">
                  <el-button v-show="form.fileName1" type="primary" @click="clearFile1">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                  <el-upload
                    v-show="!form.fileName1"
                    ref="upload1"
                    :auto-upload="false"
                    :on-change="handleChange1"
                    :show-file-list="false"
                    :on-progress="handleProgress1"
                    :on-success="handleAvatarSuccess1"
                    :action="actionUrl1"
                    class="upload-demo"
                  >
                    <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                  </el-upload>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
    </el-form>
    <div style="width:1100px;margin:auto">
      <el-col :span="24">
        <span>温馨提示：页面所有输入要素项提交完成，方可提交备案审核。</span>
      </el-col>
    </div>
    <div>
      <el-row style="text-align:center;padding-top:50px">
        <el-col :span="24">
          <el-button type="primary" @click="uploadFile('0')">提 交</el-button>
          <!-- <el-button type="primary" @click="uploadFile('1')">保 存</el-button> -->
          <el-button @click="goBack">返 回</el-button>
        </el-col>
      </el-row>
    </div>
    <workflow />
  </el-card>
</template>
<script>
import { commonValidate2, commonValidate2_appName } from '@/utils/formValidate'
import { statusComplate, saveGuanlian, certificationUnit, savePro, ApprecordDetails, HXSearchList, HXSearchFil } from '@/api/appbeian/register.js'// saveGuanlian
import { fileVerify, getdqDate, tupian } from '@/utils/formValidate'
import fileUpload from './uploaderchange.vue'
import { getUUIDWG } from '@/utils'
import { queryDetectionAuth } from '@/api/register/register.js'
import { getClock } from '@/api/general.js'
import { getNext, getUsers } from '@/api/workflow/index.js'
export default {
  components: {
    fileUpload
  },
  data() {
    return {
      optionsTest: [],
      fileList2: [],
      oldattachIds: [],
      deleteattachIds: [],
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      fileID: '',
      fileID1: '',
      fileID2: '',
      fileID3: '',
      fileID4: '',
      fileID5: '',
      isJurisdiction: false, // 应用权限
      regionalOptions: [],
      showMsg: '只能上传一个文件',
      Numtype: '',
      remnant: 0,
      remnant1: 0,
      riidNum: '',
      imageUrl: '',
      options: [],
      dialogImageUrl: '',
      dialogVisible: false,
      Disabled: false,
      loading1: false,
      loading: null,
      form: {
        ipv6: 1,
        historyAppId: '',
        orgId: '',
        appFilePath: '',
        detectionOrg: '',
        approveOrg: '',
        otherAssistOrgCode: '',
        flag: '1',
        packageName: '',
        appName: '',
        application: '',
        leType: '0',
        productType: '',
        recordType: '资金交易类',
        appVersion: '',
        otherAssistOrg: '',
        devlopType: 1,
        developer: '',
        creditCode: '',
        remark: '',
        description: '',
        appPermissions: null,
        detectionList: null,
        approveList: null,
        appApproveInfo: null,
        appDetectionInfo: null,
        // 文件
        fileName: '',
        fileName1: '',
        fileName2: '',
        fileName3: '',
        fileName4: '',
        fileName5: ''
      },
      bc: null,
      AppList: [
        {
          name: 'Android',
          code: 'Android'
        },
        {
          name: 'IOS',
          code: 'IOS'
        },
        {
          name: '其他',
          code: 'other'
        }
      ],
      lxList: [
        {
          name: '资金交易类',
          code: '资金交易类'
        },
        {
          name: '信息采集类',
          code: '信息采集类'
        },
        {
          name: '资讯查询类',
          code: '资讯查询类'
        }
      ],
      // 工作流参数
      workFlowParams: {},
      nextNodeAll: {},
      nextUserAll: {},
      rules: {
        description: [
          { required: true, message: '内容不能为空且最多500个字符', trigger: 'blur', max: 500 }, { validator: commonValidate2, trigger: 'blur' }
        ],
        packageName: [{ required: true, message: '请输入字母数字下划线和.-组成的字符，长度不超过100个字符', trigger: 'blur', max: 100 }, { pattern: /^[a-zA-Z0-9-\.-_]+$/g, message: '请输入字母数字下划线和.-组成的字符，长度不超过100个字符', trigger: 'blur' }],
        appName: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2_appName, trigger: 'blur' }],
        approveOrg: [{ required: true, message: '请输入', trigger: 'change' }],
        recordType: [{ required: true, message: '请选择', trigger: 'change' }],
        productType: [{ required: true, message: '请选择', trigger: 'change' }],
        otherAssistOrg: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        developer: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        creditCode: [
          { required: true, message: '请正确填写18位统一社会信用代码', trigger: 'blur', max: 18 },
          { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: '请正确填写18位统一社会信用代码', trigger: 'blur' }
        ],
        // otherAssistOrgCode: [{ required: false, message: '请正确填写18位统一社会信用代码', trigger: 'blur', max: 18 },
        //   { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: '请正确填写18位统一社会信用代码', trigger: 'blur' }],
        appVersion: [{ required: true, message: '请输入数字和.-组成的字符，长度不超过20个字符', trigger: 'blur', max: 20 },
          { pattern: /^[0-9-\.-]+$/g, message: '请输入数字和.-组成的字符，长度不超过20个字符', trigger: 'blur' }],
        leType: [{ required: true, message: '请输选', trigger: 'change' }],
        devlopType: [{ required: true, message: '请选择', trigger: 'change' }],
        appPermissions: [{ required: true, message: '请选择', trigger: 'change' }],
        fileName: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName1: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName2: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName3: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName4: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName5: [{ required: true, message: '请上传文件', trigger: 'change' }]
      }
    }
  },
  computed: {
    tokenURL() {
      return 'nifa-autonomy-file/upload/token'
    },
    uploadURL() {
      return 'nifa-autonomy-file/upload/upload'
    },
    // 上传地址
    actionUrl() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=7&ownBusiness=nifaReport&flag=1`
    },
    actionUrl1() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=13&ownBusiness=nifaReport&flag=1`
    },
    actionUrl2() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=15&ownBusiness=nifaReport&flag=1`
    },
    actionUrl3() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=9&ownBusiness=nifaReport&flag=1`
    },
    actionUrl4() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=10&ownBusiness=nifaReport&flag=1`
    },
    actionUrl5() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=11&ownBusiness=nifaReport&flag=1`
    },
    paramsObj() {
      const obj = Object.assign({}, this.form)
      obj.riid = this.$store.getters.riid
      obj.oldattachIds = this.oldattachIds.join(',')
      obj.deleteattachIds = this.deleteattachIds
      // obj.detectionOrg = this.form.orgId
      obj.workflow = this.workFlowParams
      obj.appPermissions = obj.appPermissions.join(',')
      return obj
    }
  },
  watch: {
    remnant() {
      if (this.remnant !== 0) {
        if (this.remnant === this.remnant1) {
          if (this.Numtype === '1') {
            this.paramsObj.updateTime = getdqDate()
            delete this.paramsObj.workflow
            savePro(this.paramsObj).then(res => {
              this.loading.close()
              this.$message({
                message: '保存成功',
                type: 'success' })
              this.$router.push({ name: 'AppRegistrationNew' })
            }).catch(() => {
              this.loading.close()
            })
          } else {
            this.paramsObj.updateTime = getdqDate()
            this.paramsObj.workflow = this.workFlowParams
            if (this.form.orgId !== '') {
              this.paramsObj.attr2 = '1'
            } else {
              this.paramsObj.attr2 = '0'
            }
            saveGuanlian(this.paramsObj).then(res => {
              this.getStatus('提交成功')
            }).catch(() => {
              this.loading.close()
              this.$message({
                message: '提交失败',
                type: 'error' })
            })
          }
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.type === '0') {
      this.Disabled = true
    }
    this.$nextTick(function() {
      this.riidNum = getUUIDWG()
      // this.$store.state.houtaizhi = this.riidNum
    })
    ApprecordDetails(this.$route.query.id).then(res => {
      for (var key in this.form) {
        this.form[key] = res[key]
      }
      if (this.form.ipv6 !== null) {
        this.form.ipv6 = Number(this.form.ipv6)
      }
      if (this.form.productType === 'Android') {
        getClock('C2000030').then(res => {
          this.regionalOptions = res
          this.isJurisdiction = true
        })
      } else if (this.form.productType === 'IOS') {
        getClock('C2000031').then(res => {
          this.regionalOptions = res
          this.isJurisdiction = true
        })
      } else {
        this.isJurisdiction = false
      }
      this.form.devlopType = 1
      this.form.historyAppId = res.id
      this.form.developer = res.rinm
      this.form.creditCode = res.succ
      if (res.appPermissions !== null) {
        this.form.appPermissions = this.form.appPermissions.split(',')
      }
      HXSearchFil(res.id).then(res => {
        res.forEach(element => {
          if (element.ownSystem === '7') {
            this.form.fileName = element.originalName
            this.fileID = element.attachId
            this.imageUrl = element.preview
            this.oldattachIds.push(element.attachId)
          } else if (element.ownSystem === '15') {
            this.form.fileName2 = element.originalName
            this.fileList2.push({
              url: element.preview,
              name: element.originalName,
              fileID: element.attachId,
              isShow: true
            })
            this.oldattachIds.push(element.attachId)
          } else if (element.ownSystem === '9') {
            this.form.fileName3 = element.originalName
            this.oldattachIds.push(element.attachId)
            this.fileID3 = element.attachId
          } else if (element.ownSystem === '10') {
            this.form.fileName4 = element.originalName
            this.oldattachIds.push(element.attachId)
            this.fileID4 = element.attachId
          } else if (element.ownSystem === '11') {
            this.form.fileName5 = element.originalName
            this.oldattachIds.push(element.attachId)
            this.fileID5 = element.attachId
          } else if (element.ownSystem === '13') {
            this.form.fileName1 = element.originalName
            this.oldattachIds.push(element.attachId)
            this.fileID1 = element.attachId
          }
        })
      })
      HXSearchList({ noteId: this.$route.query.id, ownSystem: '8' }).then(res => {
        res.forEach(element => {
          if (element.ownSystem === '8') {
            element.attachSize = Math.round(100 * (element.attachSize / 1048576)) / 100
            element.attachSize = isNaN(element.attachSize) ? 0 : parseFloat(element.attachSize).toFixed(1) + 'MB'
            this.tableData = res
            this.oldattachIds.push(element.attachId)
          }
        })
      })
      this.$nextTick(function() {
        this.$refs['form'].clearValidate()
      })
      // this.remoteMethod(this.form.approveOrg)
    })
  },
  methods: {
    erroeChange(e) {
      e.isShow = false
    },
    fileDownload2(file) {
      location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
    },
    clearFile2(file, fileList) {
      this.$refs.upload2.uploadFiles.splice(this.$refs.upload2.uploadFiles.indexOf(file), 1)
      if (this.$refs.upload2.uploadFiles.length > 0) {
        this.form.fileName2 = this.$refs.upload2.uploadFiles[0].name
      } else {
        this.form.fileName2 = ''
      }
      if (file.fileID) {
        this.deleteattachIds.push(file.fileID)
      }
    },
    delId(val) {
      this.deleteattachIds.push(val.row.fileId)
    },
    getStatus() {
      statusComplate(this.riidNum).then(res => {
        if (res === '待初审' || res === '已认证待初审') {
          this.loading.close()
          this.$message({
            message: '提交成功',
            type: 'success' })
          this.$router.push({ name: 'AppRegistrationNew' })
        } else {
          setTimeout(() => {
            this.getStatus()
          }, 1000)
        }
      })
    },
    uploadFile(Num) {
      this.Numtype = Num
      if (Num === '0') { // 提交
        if (this.$refs.file.fileData.length === 0) { // 说明没有需上传的文件
          this.showMsg = '请上传安装包相关文件'
          this.$message.error('请上传安装包相关文件')
        } else {
          this.showMsg = '只能上传一个文件'
          const arr = ['packageName', 'fileName', 'appName', 'appVersion', 'leType', 'fileName2', 'creditCode', 'devlopType', 'description', 'developer', 'appPermissions', 'productType', 'recordType', 'fileName5', 'approveOrg']
          for (var key in this.rules) {
            if (arr.indexOf(key) !== -1) {
              this.rules[key][0].required = true
            }
          }
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$confirm(
                '提交备案后将不可修改，请确认信息已准确无误填写？',
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
                ApprecordDetails(this.$route.query.id).then(res => {
                  if (res.isShare !== '1') {
                    this.$confirm('总部机构App的共享权限已关闭', '提示',
                      {
                        confirmButtonText: '返回上一页',
                        type: 'warning',
                        showClose: false,
                        showCancelButton: false,
                        closeOnClickModal: false,
                        center: true
                      }
                    ).then(() => {
                      this.loading.close()
                      this.$router.go(-1)
                    })
                  } else {
                    if (this.$refs.file.fileData[0].id) {
                      this.$refs.file.startUpload() // 调取断点续传上传文件的方法
                    } else {
                      this.sub()
                    }
                  }
                }).catch(() => {})
              }).catch(() => {})
            } else {
              this.$message.error('您尚有未填写的必填项')
              return false
            }
          })
        }
      }
    },
    subNext() {
      if (this.Numtype === '0') {
        this.sub() // 提交
      } else {
        this.submit()
      }
    },
    getCode() {
      if (this.form.productType === 'Android') {
        this.form.appPermissions = []
        getClock('C2000030').then(res => {
          this.regionalOptions = res
          this.isJurisdiction = true
        })
      } else if (this.form.productType === 'IOS') {
        this.form.appPermissions = []
        getClock('C2000031').then(res => {
          this.regionalOptions = res
          this.isJurisdiction = true
        })
      } else {
        this.form.appPermissions = []
        this.isJurisdiction = false
      }
    },
    // 认证单位
    remoteMethod(query) {
      certificationUnit({ 'auOrgName': query, 'type': '1' }).then(res => {
        this.options = res
      })
    },
    changeOrgTest(data) {
      this.optionsTest = []
      this.form.orgId = ''
      queryDetectionAuth({ riid: data }).then(res => {
        this.optionsTest = res
      })
    },
    handleRemove(file) {
      this.$refs.upload2.uploadFiles.splice(this.$refs.upload2.uploadFiles.indexOf(file), 1)
      if (this.$refs.upload2.uploadFiles.length > 0) {
        this.form.fileName2 = this.$refs.upload2.uploadFiles[0].name
      } else {
        this.form.fileName2 = ''
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 清文件名字
    clearSi(val) {
      if (val === 0) {
        this.form.developer = ''
        this.form.creditCode = ''
        this.form.fileName3 = ''
        this.form.fileName4 = ''
      }
    },
    clearFile1(file) {
      this.form.fileName1 = ''
      this.$refs.upload1.clearFiles()
      if (this.fileID1) {
        this.deleteattachIds.push(this.fileID1)
        this.fileID1 = ''
      }
    },
    clearFile3() {
      this.form.fileName3 = ''
      this.$refs.upload3.clearFiles()
      if (this.fileID3) {
        this.deleteattachIds.push(this.fileID3)
        this.fileID3 = ''
      }
    },
    clearFile4() {
      this.form.fileName4 = ''
      this.$refs.upload4.clearFiles()
      if (this.fileID4) {
        this.deleteattachIds.push(this.fileID4)
        this.fileID4 = ''
      }
    },
    clearFile5() {
      this.form.fileName5 = ''
      this.$refs.upload5.clearFiles()
      if (this.fileID5) {
        this.deleteattachIds.push(this.fileID5)
        this.fileID5 = ''
      }
    },
    handleProgress(file, fileList) {
      if (this.flag) {
        this.remnant1 += 1
        this.flag = false
      }
    },
    handleProgress1(event, file, fileList) {
      if (this.flag1) {
        this.remnant1 += 1
        this.flag1 = false
      }
    },
    handleProgress2(event, file, fileList) {
      if (this.flag2) {
        this.remnant1 += fileList.length
        this.flag2 = false
      }
    },
    handleProgress3(file, fileList) {
      if (this.flag3) {
        this.remnant1 += 1
        this.flag3 = false
      }
    },
    handleProgress4(event, file, fileList) {
      if (this.flag4) {
        this.remnant1 += 1
        this.flag4 = false
      }
    },
    handleProgress5(event, file, fileList) {
      if (this.flag5) {
        this.remnant1 += 1
        this.flag5 = false
      }
    },
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        this.form.fileName = fileList[0].name
        this.imageUrl = URL.createObjectURL(file.raw)
      } else {
        this.form.fileName = fileList[0].name
        this.imageUrl = URL.createObjectURL(file.raw)
      }
      const isLt10M = file.size / 1024 / 1024 < 260
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 260MB!')
        this.form.fileName = ''
        return false
      }
      if (!tupian(file)) {
        this.form.fileName = ''
        this.imageUrl = ''
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess(res, file) {
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
      this.form.fileName = ''
      this.flag = true
      this.loading.close()
      this.$confirm('您的软件图标上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleChange1(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        this.form.fileName1 = fileList[0].name
      } else {
        this.form.fileName1 = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 260
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 260MB!')
        this.form.fileName1 = ''
        return false
      }
      if (!fileVerify(file)) {
        this.form.fileName1 = ''
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess1(res) {
      setTimeout(() => {
        this.remnant += 1
      }, 1000)
      if (res.code !== 200) {
        this.handleAvatarerr1()
      }
    },
    // 文件上传失败回调
    handleAvatarerr1() {
      this.remnant -= 1
      this.loading.close()
      this.form.fileName1 = ''
      this.flag1 = true
      this.$confirm('您的其他信息文件失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleChange2(file, fileList) {
      if (fileList.length > 0) {
        this.form.fileName2 = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 260
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 260MB!')
      }
      if (fileList.length > 6) {
        this.$message.error('上传图片个数不能超过6张!')
        fileList.splice(fileList.indexOf(file), 1)
      }
      if (!tupian(file)) {
        fileList.splice(fileList.indexOf(file), 1)
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
      this.flag2 = true
      this.form.fileName2 = ''
      this.$confirm('您的App应用页截图上传失败请重新选择上传', '提示', {
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
      const isLt10M = file.size / 1024 / 1024 < 260
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 260MB!')
        this.form.fileName3 = ''
        return false
      }
      if (!fileVerify(file)) {
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
      this.$confirm('您的营业执照电子影印件上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleChange4(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        this.form.fileName4 = fileList[0].name
      } else {
        this.form.fileName4 = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 260
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 260MB!')
        this.form.fileName4 = ''
        return false
      }
      if (!fileVerify(file)) {
        this.form.fileName4 = ''
      }
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
      this.loading.close()
      this.flag4 = true
      this.form.fileName4 = ''
      this.$confirm('您的ICP/SP许可电子影印件上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleChange5(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        this.form.fileName5 = fileList[0].name
      } else {
        this.form.fileName5 = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 260
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 260MB!')
        this.form.fileName5 = ''
        return false
      }
      if (!fileVerify(file)) {
        this.form.fileName5 = ''
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
    // 文件上传失败回调文件上传失败回调
    handleAvatarerr5() {
      this.remnant -= 1
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
    sub(formName) {
      // recordChange 直接到协会
      getNext({ flowID: 'recordRelevance' }).then(res => {
        this.nextNodeAll = res
        this.nextNodeData = res.flowNextNode.nextNodes
        getUsers(this.nextNodeAll).then(res => {
          this.nextUserAll = res
          this.workFlowParams = Object.assign({}, this.nextUserAll)
          this.workFlowParams.flowNextNode = this.nextNodeAll.flowNextNode
          if (this.form.approveOrg) {
            this.options.forEach(item => {
              if (item.riid === this.form.approveOrg) {
                this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthorName = item.rinm
                this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthor = 'P_' + item.riid
              }
            })
          }
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
    },
    nextStep() {
      this.remnant = 0
      this.remnant1 = 0
      this.form.updateTime = getdqDate() // 更新时间
      this.form.addTime = getdqDate() // 提交审核时间
      this.form.riid = this.$store.getters.riid
      this.form.id = this.riidNum
      this.$refs.upload.submit()
      this.$refs.upload1.submit()
      this.$refs.upload2.submit()
      this.$refs.upload3.submit()
      this.$refs.upload4.submit()
      this.$refs.upload5.submit()
      setTimeout(() => {
        if (this.remnant1 === 0) {
          if (this.form.orgId !== '') {
            this.paramsObj.attr2 = '1'
          } else {
            this.paramsObj.attr2 = '0'
          }
          this.paramsObj.workflow = this.workFlowParams
          saveGuanlian(this.paramsObj).then(res => {
            this.getStatus('提交成功')
          }).catch(() => {
            this.loading.close()
            this.$message({
              message: '提交失败',
              type: 'error' })
          })
        }
      }, 1500)
    },
    submit() {
      this.remnant = 0
      this.remnant1 = 0
      this.form.riid = this.$store.getters.riid
      this.form.id = this.riidNum
      this.form.auditStatus = '待提交'
      this.form.updateTime = getdqDate()
      delete this.form.addTime
      this.$refs.upload.submit()
      this.$refs.upload1.submit()
      this.$refs.upload2.submit()
      this.$refs.upload3.submit()
      this.$refs.upload4.submit()
      this.$refs.upload5.submit()
      setTimeout(() => {
        if (this.remnant1 === 0) {
          delete this.paramsObj.org
          delete this.paramsObj.workflow
          savePro(this.paramsObj).then(res => {
            this.loading.close()
            this.$message({
              message: '保存成功',
              type: 'success' })
            this.$router.push({ name: 'AppRegistrationNew' })
          }).catch(() => {
            this.loading.close()
          })
        }
      }, 1500)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.el-image__inner{
    display: block;
    height: 150px;
    width:100%;
}
   .hide .el-upload--picture-card {
    display: none;
   }
.AppRegistrationVivw{
  .radio_top{
     .el-tooltip{
      position: absolute;
      top: 6.5%;
      left: 7.5%;
    }
  }
  .radio_bottom{
     .el-tooltip{
      position: absolute;
      top: 5%;
      left: 12%;
    }
  }
  .radio_enter {
    > label {
      width: 100%;
      text-align: left;
    }
  }
  .el-upload__tip {
    font-size: 17px;
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
}
</style>
