<template>
  <el-card class="AppRegistrationVivw">
    <div slot="header" class="clearfix btnCard">
      <span>新增备案信息</span>
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
                <el-input v-model="form.packageName" type="text" placeholder="包名" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="软件名称" prop="appName">
                <el-input v-model="form.appName" type="text" placeholder="软件名称" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="软件版本" prop="appVersion">
                <el-input v-model="form.appVersion" type="text" placeholder="软件版本" clearable />
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
                  <el-select v-model="form.recordType" placeholder="APP备案类型" clearable>
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
              <el-select v-model="form.productType" placeholder="APP产品类型" clearable @change="getCode()">
                <el-option v-for="(item,index) in AppList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="语言类型" prop="leType" class="radio_enter">
              <el-radio-group v-model="form.leType">
                <el-radio :label="0">中文</el-radio>
                <el-radio :label="1">非中文</el-radio>
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
                  :on-change="handleChange"
                  :show-file-list="false"
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
              <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请描述app功能，限500字" maxlength="500" />
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
                :action="actionUrl7"
                list-type="picture-card"
                :on-change="handleChange2"
                :on-success="handleAvatarSuccess2"
                :auto-upload="false"
              >
                <!-- <i class="el-icon-plus" /> -->
                <i slot="default" class="el-icon-plus" />
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  >
                  <span v-if="file.url" class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in" />
                    </span>
                    <!-- <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download" />
                    </spa> -->
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
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
              <el-radio-group v-model="form.devlopType" @change="clearSi">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第三方安全加固单位（如有）" prop="otherAssistOrg">
              <el-input v-model="form.otherAssistOrg" type="text" placeholder="第三方安全加固单位（如有）" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第三方加固单位统一社会信用代码" prop="otherAssistOrgCode">
              <el-input v-model="form.otherAssistOrgCode" type="text" placeholder="第三方加固单位统一社会信用代码" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.devlopType === 1" :gutter="20">
          <el-col :span="8">
            <el-form-item label="开发单位" prop="developer">
              <el-input v-model="form.developer" type="text" placeholder="开发单位" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开发单位单位统一社会信用代码" prop="creditCode">
              <el-input v-model="form.creditCode" type="text" placeholder="开发单位统一社会信用代码" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.devlopType === 1" :gutter="20">
          <el-col :span="12">
            <el-form-item label="代理公司营业执照电子影印件" prop="fileName3">
              <el-input v-model="form.fileName3" disabled style="width: 100%">
                <template slot="prepend">
                  <el-button v-show="form.fileName3" type="primary" @click="clearFile3">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                  <el-upload
                    v-show="!form.fileName3"
                    ref="upload3"
                    :auto-upload="false"
                    :on-change="handleChange3"
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
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="ICP/SP许可电子影印件" prop="fileName4">
              <el-input v-model="form.fileName4" disabled style="width: 100%">
                <template slot="prepend">
                  <el-button v-show="form.fileName4" type="primary" @click="clearFile4">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                  <el-upload
                    v-show="!form.fileName4"
                    ref="upload4"
                    :auto-upload="false"
                    :on-change="handleChange4"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess4"
                    :on-error="handleAvatarerr4"
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
              <el-checkbox-group v-model="form.appPermissions">
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
                  <el-button v-show="form.fileName5" type="primary" @click="clearFile5">删除文件<i class="el-icon-delete-solid el-icon--right" /></el-button>
                  <el-upload
                    v-show="!form.fileName5"
                    ref="upload5"
                    :auto-upload="false"
                    :on-change="handleChange5"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess5"
                    :on-error="handleAvatarerr5"
                    :action="actionUrl5"

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
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">外部评估</legend>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="请选择外部评估方式">
              <el-select v-model="addVal" placeholder="请选择" @change="addWayChange">
                <el-option
                  v-for="item in addOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="addApp" :span="8">
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
          <el-col v-if="addApp" :span="8">
            <el-form-item label="检测机构" prop="orgId">
              <el-tooltip class="item" effect="dark" content=" 选择该检测机构后，检测机构可查看申报机构的联系人信息" placement="top">
                <i class="el-icon-question " />
              </el-tooltip>
              <el-select v-model="reportForm.orgId" placeholder="请选择检测机构" clearable>
                <el-option v-for="(item,index) in optionsTest" :key="index" :label="item.rinm" :value="item.riid" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="!addApp" :span="8">
            <el-form-item label="检测机构" prop="detectionOrg">
              <el-select
                v-model="form.detectionOrg"
                filterable
                remote
                clearable
                reserve-keyword
                placeholder="请输入关键词搜索"
                :remote-method="remoteMethod2"
                :loading="loading1"
              >
                <el-option
                  v-for="item in newOptionsTest"
                  :key="item.value"
                  :label="item.rinm"
                  :value="item.riid"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">客户端软件安装包</legend>
        <fileUpload ref="file" :show-msg="showMsg" @subNext="subNext" />
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
                    :on-success="handleAvatarSuccess1"
                    :on-error="handleAvatarerr1"
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
          <!-- <el-button type="primary" @click="submit111('form')">提交备案</el-button> -->
          <el-button type="primary" @click="uploadFile('0')">提 交</el-button>
          <el-button type="primary" @click="uploadFile('1')">保 存</el-button>
          <el-button @click="goBack">返 回</el-button>
        </el-col>
      </el-row>
    </div>
    <workflow />
  </el-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { commonValidate2, commonValidate2_appName } from '@/utils/formValidate'
import { statusComplate, proChange, proChangeToTest, certificationUnit, savePro } from '@/api/appbeian/register.js'// proChange
import { fileVerify, getdqDate, tupian,neiKong } from '@/utils/formValidate'
import fileUpload from './uploader.vue'
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
      newOptionsTest: [],
      addApp: true,
      addVal: '金融科技产品认证',
      addOptions: [
        {
          value: '金融科技产品认证',
          label: '金融科技产品认证'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      optionsTest: [],
      reportForm: {
        approveResult: '',
        certificateNum: '',
        fileName: '',
        orgId: ''
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      matching: false,
      isJurisdiction: false, // 应用权限
      regionalOptions: [],
      showMsg: '只能上传一个文件',
      Numtype: '',
      remnant: 0,
      remnant1: 0,
      riidNum: '',
      imageUrl: '',
      options: [],
      list: [
        { value: '0', label: '北京互联网' },
        { value: '00', label: '北京互联网1' },
        { value: '000', label: '北京互联网12' },
        { value: '1', label: '上海互联网' }
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      loading1: false,
      loading: null,
      disabled: false,
      form: {
        ipv6: 1,
        detectionOrg: '',
        approveOrg: '',
        otherAssistOrgCode: '',
        flag: '1',
        packageName: '',
        appName: '',
        devlopType1: 1,
        application: '',
        leType: 0,
        productType: '',
        recordType: '资金交易类',
        appVersion: '',
        otherAssistOrg: '',
        devlopType: 0,
        testType: 0,
        developer: '',
        creditCode: '',
        remark: '',
        description: '',
        reportNum: '',
        appPermissions: [],
        // 文件
        fileName: '',
        fileName1: '',
        fileName2: '',
        fileName3: '',
        fileName4: '',
        fileName5: '',
        fileName6: '',
        fileName7: ''
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
      applicationList: [
        {
          name: '投资理财类',
          code: '投资理财类'
        },
        {
          name: '金融借贷类',
          code: '金融借贷类'
        },
        {
          name: '金融支付类',
          code: '金融支付类'
        },
        {
          name: '金融银行类',
          code: '金融银行类'
        },
        {
          name: '基金类',
          code: '基金类'
        },
        {
          name: '证券类',
          code: '证券类'
        },
        {
          name: '金融咨询类',
          code: '金融咨询类'
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
      CardType: [
        {
          name: '新增',
          code: '1'
        },
        {
          name: '更变',
          code: '2'
        },
        {
          name: '注销',
          code: '3'
        }
      ],
      // 工作流参数
      workFlowParams: {},
      nodeMatching: '',
      nextNodeAll: {},
      nextUserAll: {},
      message: '工作流组件',
      userData: [],
      userChecked: [], // 已选择的人员
      nextNodeData: [],
      nextNode: '',
      rules: {
        description: [
          { required: true, message: '内容不能为空且最多500个字符', trigger: 'blur', max: 500 }, { validator: commonValidate2, trigger: 'blur' }
        ],
        packageName: [{ required: true, message: '请输入字母数字下划线和.-组成的字符，长度不超过100个字符', trigger: 'blur', max: 100 }, { pattern: /^[a-zA-Z0-9-\.-_]+$/g, message: '请输入字母数字下划线和.-组成的字符，长度不超过100个字符', trigger: 'blur' }],
        appName: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2_appName, trigger: 'blur' }],
        approveOrg: [{ required: true, message: '请输入', trigger: 'change' }],
        detectionOrg: [{ required: true, message: '请输入', trigger: 'change' }],
        recordType: [{ required: true, message: '请选择', trigger: 'change' }],
        productType: [{ required: true, message: '请选择', trigger: 'change' }],
        otherAssistOrg: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        developer: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        creditCode: [
          { required: true, message: '请正确填写18位统一社会信用代码', trigger: 'blur', max: 18 },
          { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: '请正确填写18位统一社会信用代码', trigger: 'blur' }
        ],
        otherAssistOrgCode: [{ required: false, message: '请正确填写18位统一社会信用代码', trigger: 'blur', max: 18 },
          { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: '请正确填写18位统一社会信用代码', trigger: 'blur' }],
        appVersion: [{ required: true, message: '请输入数字和.-组成的字符，长度不超过20个字符', trigger: 'blur', max: 20 },
          { pattern: /^[0-9-\.-]+$/g, message: '请输入数字和.-组成的字符，长度不超过20个字符', trigger: 'blur' }],
        leType: [{ required: true, message: '请输选', trigger: 'change' }],
        reportNum: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        devlopType: [{ required: true, message: '请选择', trigger: 'change' }],
        appPermissions: [{ required: true, message: '请选择', trigger: 'change' }],
        fileName: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName1: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName2: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName3: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName4: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName5: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName6: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName7: [{ required: false, message: '请上传文件', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'businessFlag',
      'permissions_routers',
      'workFlow2business',
      'RIID'
    ]),
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
    // actionUrl2() {
    //   return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=14&ownBusiness=nifaReport&flag=1`
    // },
    actionUrl3() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=9&ownBusiness=nifaReport&flag=1`
    },
    actionUrl4() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=10&ownBusiness=nifaReport&flag=1`
    },
    actionUrl5() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=11&ownBusiness=nifaReport&flag=1`
    },
    actionUrl7() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=15&ownBusiness=nifaReport&flag=1`
    },
    paramsObj() {
      const obj = Object.assign({}, this.form)
      obj.detectionOrg = obj.detectionOrg === '' ? this.reportForm.orgId : obj.detectionOrg
      obj.workflow = this.workFlowParams
      if (obj.appPermissions instanceof Array) {
        obj.appPermissions = obj.appPermissions.join(',')
      }
      return obj
    }
  },
  watch: {
    remnant() {
      if (this.remnant !== 0) {
        if (this.remnant === this.remnant1) {
          if (this.bc) {
            this.paramsObj.updateTime = getdqDate()
            delete this.paramsObj.workflow
            if (this.addApp) {
              this.paramsObj.appFilePath = '2'
            } else {
              this.paramsObj.appFilePath = '1'
            }
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
            if (this.reportForm.orgId !== '') {
              this.paramsObj.attr2 = '1'
            } else {
              this.paramsObj.attr2 = '0'
            }
            if (this.addApp) {
              proChange(this.paramsObj, this.form.approveOrg).then(res => {
                this.getStatus('提交成功')
              }).catch(() => {
                this.loading.close()
                this.$message({
                  message: '提交失败',
                  type: 'error' })
              })
            } else {
              proChangeToTest(this.paramsObj, this.form.approveOrg).then(res => {
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
    businessFlag(val) {
      if (val) this.nextStep()
      this.$store.dispatch('changeFlag', false)
    }
  },
  created() {
    if (this.$route.query.num === '1') {
      this.rowData = JSON.parse(sessionStorage.getItem('rowData'))
      this.rowData.appPermissions = this.rowData.appPermissions.split(',')
      for (var key in this.form) {
        this.form[key] = this.rowData[key]
      }
      if (this.form.ipv6 !== null) {
        this.form.ipv6 = Number(this.form.ipv6)
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.riidNum = getUUIDWG()
      this.$store.state.houtaizhi = this.riidNum
      // sessionStorage.setItem('riidNum', this.riidNum)
    })
    // this.getCode()
  },
  methods: {
    addWayChange(val) {
      if (val === '金融科技产品认证') {
        this.addApp = true
        this.form.detectionOrg = ''
      } else if (val === '其他') {
        this.addApp = false
        this.form.approveOrg = ''
        this.reportForm.orgId = ''
      }
    },
    getStatus(data) {
      statusComplate(this.riidNum).then(res => {
        if (res === '待提交检测' || res === '已认证待初审' || res === '待初审' || res === '待检测') {
          this.status = true
          this.loading.close()
          this.$message({
            message: '提交成功',
            type: 'success' })
          this.$router.push({ name: 'AppRegistrationNew' })
        } else {
          setTimeout(() => {
            this.getStatus(data)
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
                this.$refs.file.startUpload() // 调取断点续传上传文件的方法
              }).catch(() => {})
            } else {
              this.$message.error('您尚有未填写的必填项')
              return false
            }
          })
        }
      } else { // 保存
        for (var key1 in this.rules) {
          if (key1 !== 'appName' && key1 !== 'packageName') {
            this.rules[key1][0].required = false
          }
        }
        if (this.$refs.file.fileData.length === 0) {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.loading = this.$loading({
                lock: true
              })
              this.submit()
            } else {
              this.$message.error('您尚有未填写的必填项')
              return false
            }
          })
        } else {
          this.showMsg = '只能上传一个文件'
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.loading = this.$loading({
                lock: true
              })
              this.$refs.file.startUpload() // 调取断点续传上传文件的方法
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
    remoteMethod2(query) {
      certificationUnit({ 'auOrgName': query, 'type': '2' }).then(res => {
        this.newOptionsTest = res
      })
    },
    changeOrgTest(data) {
      this.optionsTest = []
      this.reportForm.orgId = ''
      queryDetectionAuth({ riid: data }).then(res => {
        this.optionsTest = res
      })
    },
    // remoteMethod(query) {
    //   if (query !== '') {
    //     this.loading = true
    //     setTimeout(() => {
    //       this.loading = false
    //       this.options = this.list.filter(item => {
    //         return item.label.indexOf(query) > -1
    //       })
    //     }, 200)
    //   } else {
    //     this.options = []
    //   }
    // },
    handleRemove(file) {
      this.$refs.upload2.uploadFiles.splice(this.$refs.upload2.uploadFiles.indexOf(file), 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
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
    clearSi1(val) {

    },
    clearFile() {
      this.form.fileName = ''
    },
    clearFile1() {
      this.form.fileName1 = ''
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
    handleAvatarSuccess88(res, file) {
      this.remnant += 1
    },
    handleChange7(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        this.form.fileName7 = fileList[0].name
      } else {
        this.form.fileName7 = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 260
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 260MB!')
        this.form.fileName7 = ''
        return false
      }
      if (!fileVerify(file)) {
        this.form.fileName7 = ''
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess7() {
      this.remnant += 1
    },
    // 文件上传失败回调
    handleAvatarerr7() {
      this.remnant -= 1
      this.loading.close()
      this.form.fileName7 = ''
      this.$confirm('您的App应用页截图上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
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
      this.remnant += 1
      this.imageUrl = URL.createObjectURL(file.raw)
      if (res.code !== 200) {
        this.handleAvatarerr()
      }
    },
    // 文件上传失败回调
    handleAvatarerr() {
      this.remnant -= 1
      this.form.fileName = ''
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
      this.remnant += 1
      if (res.code !== 200) {
        this.handleAvatarerr1()
      }
    },
    // 文件上传失败回调
    handleAvatarerr1() {
      this.remnant -= 1
      this.loading.close()
      this.form.fileName1 = ''
      this.$confirm('您的其他信息文件失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleChange2(file, fileList) {
      if (fileList.length > 1) {
        this.form.fileName2 = fileList[0].name
      } else {
        this.form.fileName2 = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 260
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 260MB!')
        this.form.fileName2 = ''
        return false
      }
      if (fileList.length > 6) {
        this.$message.error('上传图片个数不能超过6张!')
        fileList.splice(fileList.indexOf(file), 1)
      }
      if (!tupian(file)) {
        this.form.fileName2 = ''
        fileList.splice(fileList.indexOf(file), 1)
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess2(res) {
      this.remnant += 1
      if (res.code !== 200) {
        this.handleAvatarerr7()
      }
    },
    // 文件上传失败回调
    handleAvatarerr2() {
      this.remnant -= 1
      this.loading.close()
      this.form.fileName2 = ''
      this.$confirm('您的客户软件安装包上传失败请重新选择上传', '提示', {
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
    handleAvatarSuccess3() {
      this.remnant += 1
    },
    // 文件上传失败回调
    handleAvatarerrIcon() {
      this.remnant -= 1
      this.loading.close()
      this.form.fileName = ''
      this.$confirm('您的软件图标上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    // 文件上传失败回调
    handleAvatarerr3() {
      this.remnant -= 1
      this.loading.close()
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
    handleAvatarSuccess4() {
      this.remnant += 1
    },
    // 文件上传失败回调
    handleAvatarerr4() {
      this.remnant -= 1
      this.loading.close()
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
      if (!neiKong(file)) {
        this.form.fileName5 = ''
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess5(res) {
      this.remnant += 1
      if (res.code !== 200) {
        this.handleAvatarerr5()
      }
    },
    // 文件上传失败回调文件上传失败回调
    handleAvatarerr5() {
      this.remnant -= 1
      this.loading.close()
      this.form.fileName5 = ''
      this.$confirm('您的隐私策略上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleChange6(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        this.form.fileName6 = fileList[0].name
      } else {
        this.form.fileName6 = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 260
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 260MB!')
        this.form.fileName6 = ''
        return false
      }
      if (!fileVerify(file)) {
        this.form.fileName6 = ''
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess6() {
      this.remnant += 1
    },
    // 文件上传失败回调
    handleAvatarerr6() {
      this.remnant -= 1
      this.loading.close()
      this.form.fileName6 = ''
      this.$confirm('您的报告盖章页电子影印件上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    sub(formName) {
      this.bc = false
      this.loading = this.$loading({
        lock: true
      })
      const obj = {}
      if (this.addApp) {
        obj.flowID = 'record'
      } else {
        obj.flowID = 'recordDetection'
      }
      getNext(obj).then(res => {
        this.nextNodeAll = res
        this.nextNodeData = res.flowNextNode.nextNodes
        getUsers(this.nextNodeAll).then(res => {
          this.nextUserAll = res
          // const arr = res.flowNextResource.nextNodes[0].authors.Author.selectAuthor.split(';')
          // const array = res.flowNextResource.nextNodes[0].authors.Author.selectAuthorName.split(';')
          // this.userData = arr.map((codeName, i) => ({ codeName, codeId: array[i] }))
          this.workFlowParams = Object.assign({}, this.nextUserAll)
          this.workFlowParams.flowNextNode = this.nextNodeAll.flowNextNode
          if (this.addApp) {
            if (this.form.approveOrg) {
              this.options.forEach(item => {
                if (item.riid === this.form.approveOrg) {
                  this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthorName = item.rinm
                  this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthor = 'P_' + item.riid
                }
              })
            }
          } else {
            if (this.form.detectionOrg) {
              this.newOptionsTest.forEach(item => {
                if (item.riid === this.form.detectionOrg) {
                  this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthorName = item.rinm
                  this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthor = 'P_' + item.riid
                }
              })
            }
          }
          this.nextStep()
          // if (this.matching) {
          //   this.nextStep()
          // } else {
          //   this.$message({
          //     message: '当前认证机构未配置，请联系管理员',
          //     type: 'error' })
          //   this.loading.close()
          //   return
          // }
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
    submit111(formName) {
      for (var key in this.rules) {
        if (key !== 'fileName4') {
          this.rules[key][0].required = true
        }
      }
      if (this.$refs.file.fileData.length === 0) {
        this.$message({
          message: '您需要上传客户端软件安装包',
          type: 'warning'
        })
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.bc = false
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
            this.$store.dispatch('workFlow', { flowID: 'record' })
            this.$store.dispatch('openWorkFlow', true)
          }).catch(() => {})
        }
      })
    },
    nextStep() {
      this.submit1()
    },
    submit1() {
      this.remnant = 0
      this.remnant1 = 0
      this.form.updateTime = getdqDate() // 更新时间
      this.form.addTime = getdqDate() // 提交审核时间
      this.form.riid = this.$store.getters.riid
      this.form.id = this.riidNum
      this.loading = this.$loading({
        lock: true
      })
      if (this.form.fileName) {
        this.remnant1 += 1
        this.$refs.upload.submit()
      }
      if (this.form.fileName1) {
        this.remnant1 += 1
        this.$refs.upload1.submit()
      }
      if (this.form.fileName2) {
        this.remnant1 += 1
        this.$refs.upload2.submit()
      }
      if (this.form.fileName3) {
        this.remnant1 += 1
        this.$refs.upload3.submit()
      }
      if (this.form.fileName4) {
        this.remnant1 += 1
        this.$refs.upload4.submit()
      }
      if (this.form.fileName5) {
        this.remnant1 += 1
        this.$refs.upload5.submit()
      }
      if (this.form.fileName6) {
        this.remnant1 += 1
        this.$refs.upload6.submit()
      }
      if (this.form.fileName7) {
        this.remnant1 += 1
        this.$refs.upload7.submit()
      }
      setTimeout(() => {
        if (this.remnant1 === 0) {
          if (this.reportForm.orgId !== '') {
            this.paramsObj.attr2 = '1'
          } else {
            this.paramsObj.attr2 = '0'
          }
          this.paramsObj.workflow = this.workFlowParams
          if (this.addApp) {
            proChange(this.paramsObj, this.form.approveOrg).then(res => {
              this.getStatus('提交成功')
            }).catch(() => {
              this.loading.close()
              this.$message({
                message: '提交失败',
                type: 'error' })
            })
          } else {
            proChangeToTest(this.paramsObj, this.form.approveOrg).then(res => {
              this.getStatus('提交成功')
            }).catch(() => {
              this.loading.close()
              this.$message({
                message: '提交失败',
                type: 'error' })
            })
          }
        }
      }, 1000)
    },
    submit() {
      this.bc = true
      this.remnant = 0
      this.remnant1 = 0
      this.form.riid = this.$store.getters.riid
      this.form.id = this.riidNum
      this.form.auditStatus = '待提交'
      this.form.updateTime = getdqDate()
      delete this.form.addTime
      if (this.form.fileName) {
        this.remnant1 += 1
        this.$refs.upload.submit()
      }
      if (this.form.fileName1) {
        this.remnant1 += 1
        this.$refs.upload1.submit()
      }
      if (this.form.fileName2) {
        this.remnant1 += 1
        this.$refs.upload2.submit()
      }
      if (this.form.fileName3) {
        this.remnant1 += 1
        this.$refs.upload3.submit()
      }
      if (this.form.fileName4) {
        this.remnant1 += 1
        this.$refs.upload4.submit()
      }
      if (this.form.fileName5) {
        this.remnant1 += 1
        this.$refs.upload5.submit()
      }
      if (this.form.fileName6) {
        this.remnant1 += 1
        this.$refs.upload6.submit()
      }
      if (this.form.fileName7) {
        this.remnant1 += 1
        this.$refs.upload7.submit()
      }
      setTimeout(() => {
        if (this.remnant1 === 0) {
          delete this.paramsObj.org
          delete this.paramsObj.workflow
          if (this.addApp) {
            this.paramsObj.appFilePath = '2'
          } else {
            this.paramsObj.appFilePath = '1'
          }
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
      }, 1000)
    },
    goBack() {
      this.$router.go(-1)
    },
    addCase() {
      this.$router.push({
        name: 'AppRegistrationVivw'
      })
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
