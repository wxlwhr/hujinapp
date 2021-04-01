<template>
  <el-card class="AppRegistrationDetailVivw">
    <div slot="header" class="clearfix btnCard">
      <span>备案信息修改</span>
      <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
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
              <el-input v-show="false" v-model="form.productType" placeholder="" />
              <el-select v-model="form.productType" placeholder="APP产品类型" clearable @change="getCode()">
                <el-option v-for="(item,index) in AppList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="语言类型" prop="leType" class="radio_enter">
              <el-radio-group v-model="form.leType">
                <el-radio label="0">中文</el-radio>
                <el-radio label="1">非中文</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="24">
              <el-form-item label="软件图标" prop="fileName" class="radio_enter radio_top">
                <el-tooltip class="item" effect="dark" content="应用图标应当与安装包中图标一致，清晰、无水印、不允许影印件和扫描件，若上传圆角图标则圆角半径70px最佳且背景透明，大小不超过2M，建议最佳尺寸（512x512px或1024x1024px）,建议最佳格式png、jpg。" placement="top">
                  <i class="el-icon-question " />
                </el-tooltip>
                <el-input v-show="false" v-model="form.fileName" placeholder="" />
                <el-upload
                  ref="upload"
                  class="avatar-uploader"
                  list-type="picture-card"
                  :auto-upload="false"
                  :action="actionUrl"
                  :on-success="handleAvatarSuccess"
                  :on-change="handleChange"
                  :before-upload="cancelUpload"
                  :show-file-list="false"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <!-- <el-image
                    v-if="imageUrl"
                    class="el-upload-list__item-thumbnail"
                    :src="imageUrl"
                  >
                    <div slot="error" class="el-image__error" style="cursor:pointer;color:#333">
                      格式不支持预览
                    </div>
                  </el-image> -->
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
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
                :file-list="fileListOne"
                :action="actionUrl2"
                list-type="picture-card"
                :on-change="handleChange2"
                :on-progress="handleProgress2"
                :on-success="handleAvatarSuccess2"
                :auto-upload="false"
              >
                <!-- <i class="el-icon-plus" /> -->
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
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download" />
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove1(file)"
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
            <!-- {{ form.appPermissions }} -->
            <el-form-item v-if="isJurisdiction" label="应用权限" prop="appPermissions" class="radio_enter">
              <el-checkbox-group v-model="form.appPermissions">
                <el-checkbox v-for="item in regionalOptions" :key="item.codeKey" :label="item.codeKey">{{ item.codeValue }}</el-checkbox>
              </el-checkbox-group>
              <!-- <el-select v-if="form.producttype!=='other'" v-model="form.appPermissions" multiple placeholder="请选择">
                <el-option v-for="item in regionalOptions" :key="item.value" :label="item.codeValue" :value="item.codeKey" />
              </el-select> -->
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
                    :on-progress="handleProgress5"
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
          <el-col :span="12">
            <el-form-item label="选择检测机构" prop="orgId">
              <el-select
                v-model="form.detectionOrg"
                filterable
                remote
                clearable
                reserve-keyword
                :disabled="isUpdate"
                placeholder="请选择检测机构"
                :remote-method="remoteMethodTest"
                @change="testChange"
              >
                <el-option v-for="(item,index) in optionsTest" :key="index" :label="item.rinm" :value="item.riid" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </fieldset>
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">客户端软件安装包</legend>
        <fileUpload ref="file" :fileid="this.$route.query.id" :extend1="riidNum2" :show-msg="showMsg" @subNext="subNext" @delId="delId" />
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
                    :on-progress="handleProgress1"
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
      <fieldset v-if="statusMess.length>0" class="fieldsetStyle" style="margin:0 auto">
        <legend style="margin-left: 40px;font-size:17px">审核记录</legend>
        <div style="margin-bottom:10px" shadow="never">
          <el-table :data="statusMess" tooltip-effect="dark">
            <el-table-column label="审核机构" prop="auditUserName" min-width="120" show-overflow-tooltip />
            <el-table-column label="审核人" prop="auditUser" min-width="100" show-overflow-tooltip />
            <el-table-column label="审核阶段" prop="currentState" min-width="120" show-overflow-tooltip />
            <el-table-column label="审核意见" prop="remark" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.remark?scope.row.remark:'--' }}
              </template>
            </el-table-column>
            <el-table-column label="审核时间" prop="auditTime" min-width="120" show-overflow-tooltip />
          </el-table>
        </div>
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
          <el-button v-if="$route.query.auditStatus === '待提交'" type="primary" @click="uploadFile('1')">保 存</el-button>
          <el-button @click="goBack">返 回</el-button>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import { queryDetectionAuth } from '@/api/register/register.js'
import { commonValidate2, commonValidate2_appName } from '@/utils/formValidate'
import {
  statusComplate,
  proChange, // 备案信息
  submitChange, // 修改提交审核
  deleteaAttach,
  HXSearchList,
  HXSearchFil,
  certificationUnit,
  ApprecordDetails,
  savePro, // app备案新增保存
  majorChange, // 重大变更
  registRiid,
  rzWorkFlow,
  proChangeToTest
} from '@/api/appbeian/register.js'
import { getUUIDWG } from '@/utils'
import { fileVerify, getdqDate, tupian } from '@/utils/formValidate'
import fileUpload from './uploaderchange.vue'
import { getClock } from '@/api/general.js'
// import { getUUIDWG } from '@/utils'
import {
  getNext, // 获取下一个节点参数
  getUsers, // 获取人员
  flowTodo, // 获取审核列表参数
  getButton
} from '@/api/workflow/index.js'
export default {
  components: {
    fileUpload
  },
  data() {
    return {
      statusMess: [
      ],
      optionsTest: [],
      reportForm: {
        approveResult: '',
        certificateNum: '',
        fileName: '',
        orgId: ''
      },
      testData: {},
      status: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      Numtype: '',
      riidNum2: '', // 对比文件前后是否发生变化
      showMsg: '只能上传一个文件',
      disabled: false,
      fileListOne: [],
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      options: [],
      remnant: 0,
      remnant2: 0,
      riidNum: '',
      rowData: null,
      fileID: '',
      fileID1: '',
      fileID2: '',
      fileID3: '',
      fileID4: '',
      fileID5: '',
      fileID6: '',
      loading: null,
      loading1: null,
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: true,
      bc: null,
      isUpdate: false,
      deleteattachIds: [], // 删除的附件或者照片的id
      oldattachIds: [], // 回显时候的照片或者附件id
      form: {
        ipv6: 1,
        flag: '',
        id: '',
        approveOrg: '',
        otherAssistOrgCode: '',
        packageName: '',
        appName: '',
        devlopType1: null,
        application: '',
        leType: null,
        productType: '',
        recordType: '',
        appVersion: '',
        otherAssistOrg: '',
        devlopType: null,
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
        fileName7: '',
        approveInfo: {
          rinm: ''
        }
      },
      isJurisdiction: false, // 应用权限
      regionalOptions: [],
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
      rules: {
        otherAssistOrgCode: [{ required: false, message: '请正确填写18位统一社会信用代码', trigger: 'blur', max: 18 },
          { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: '请正确填写18位统一社会信用代码', trigger: 'blur' }],
        approveOrg: [{ required: true, message: '请输入', trigger: 'blur' }],
        description: [
          { required: true, message: '内容不能为空且最多500个字符', trigger: 'blur', max: 500 }, { validator: commonValidate2, trigger: 'blur' }
        ],
        leType: [{ required: true, message: '请选择', trigger: 'change' }],
        packageName: [{ required: true, message: '请输入字母数字下划线和.-组成的字符，长度不超过100个字符', trigger: 'blur', max: 100 }, { pattern: /^[a-zA-Z0-9-\.-_]+$/g, message: '请输入字母数字下划线和.-组成的字符，长度不超过100个字符', trigger: 'blur' }],
        bao: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        appName: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2_appName, trigger: 'blur' }],
        recordType: [{ required: true, message: '请选择', trigger: 'change' }],
        productType: [{ required: true, message: '请选择', trigger: 'change' }],
        otherAssistOrg: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        developer: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        creditCode: [
          { required: true, message: '请正确填写18位统一社会信用代码', trigger: 'blur', max: 18 },
          { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: '请正确填写18位统一社会信用代码', trigger: 'blur' }
        ],
        appVersion: [{ required: true, message: '请输入数字和.-组成的字符，长度不超过20个字符', trigger: 'blur', max: 20 },
          { pattern: /^[0-9-\.-]+$/g, message: '请输入数字和.-组成的字符，长度不超过20个字符', trigger: 'blur' }],
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
    tokenURL() {
      return 'nifa-autonomy-file/upload/token'
    },
    uploadURL() {
      return 'nifa-autonomy-file/upload/upload'
    },
    // 上传地址
    actionUrl() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=7&ownBusiness=nifaReport`
    },
    actionUrl2() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=15&ownBusiness=nifaReport`
    },
    actionUrl3() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=9&ownBusiness=nifaReport`
    },
    actionUrl4() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=10&ownBusiness=nifaReport`
    },
    actionUrl5() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=11&ownBusiness=nifaReport`
    },
    actionUrl1() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=13&ownBusiness=nifaReport`
    },
    paramsObj() {
      const obj = Object.assign({}, this.form)
      if (obj.appPermissions instanceof Array) {
        obj.appPermissions = obj.appPermissions.join(',')
      }
      obj.detectionOrg = this.form.detectionOrg
      // obj.extend1 = this.riidNum2
      return obj
    }
  },
  watch: {
    remnant() {
      if (this.remnant !== 0) {
        if (this.remnant === this.remnant2) {
          delete this.paramsObj.workflow
          if (this.bc) {
            this.paramsObj.updateTime = getdqDate()
            this.paramsObj.oldattachIds = this.oldattachIds.join(',')
            this.paramsObj.deleteattachIds = this.deleteattachIds
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
            if (this.$route.query.num === '2' && this.$route.query.update !== '重大变更') {
              this.paramsObj.workflow = this.workFlowParams
              this.paramsObj.oldattachIds = this.oldattachIds.join(',')
              this.paramsObj.deleteattachIds = this.deleteattachIds
              submitChange(this.paramsObj).then(res => {
                this.getStatus('提交审核成功')
              }).catch(() => {
                this.loading.close()
                this.$message({
                  message: '提交审核失败',
                  type: 'error' })
              })
            } else if (this.$route.query.update === '重大变更' && this.rowData.auditStatus !== '检测退至金融机构' && this.rowData.auditStatus !== '认证退至金融机构' && this.rowData.auditStatus !== '协会退至金融机构') {
              this.paramsObj.updateTime = getdqDate()
              this.paramsObj.workflow = this.workFlowParams
              this.paramsObj.workflow.flowID = 'recordDetectionMajorChange'
              this.paramsObj.oldattachIds = this.oldattachIds.join(',')
              this.paramsObj.deleteattachIds = this.deleteattachIds
              majorChange(this.paramsObj).then(res => {
                this.getStatus('提交审核成功')
              }).catch(() => {
                this.loading.close()
                this.$message({
                  message: '提交审核失败',
                  type: 'error' })
              })
            } else if (this.$route.query.update === '重大变更' && this.rowData.auditStatus === '协会退至金融机构') {
              this.paramsObj.flag = '4'// 跨级退回提交时flag是3，不跨级是2,4是金融直接到协会
              // const obj = this.$route.query.from === '列表' ? this.testData : JSON.parse(this.$route.query.queryData)
              this.paramsObj.workflow = this.workFlowParams
              this.paramsObj.workflow.nodeName = '检测机构'
              this.paramsObj.workflow.flowID = 'recordDetectionMajorChange'
              this.paramsObj.oldattachIds = this.oldattachIds.join(',')
              this.paramsObj.deleteattachIds = this.deleteattachIds
              proChangeToTest(this.paramsObj, this.form.approveOrg).then(res => {
                this.getStatus('提交审核成功')
              }).catch(() => {
                this.loading.close()
                this.$message({
                  message: '提交审核失败',
                  type: 'error' })
              })
            } else if (this.$route.query.update === '重大变更' && this.rowData.auditStatus === '检测退至金融机构') {
              this.paramsObj.flag = '2'// 跨级退回提交时flag是3，不跨级是2
              // const obj = this.$route.query.from === '列表' ? this.testData : JSON.parse(this.$route.query.queryData)
              this.paramsObj.workflow = this.workFlowParams
              this.paramsObj.workflow.nodeName = '检测机构'
              this.paramsObj.workflow.flowID = 'recordDetectionMajorChange'
              this.paramsObj.oldattachIds = this.oldattachIds.join(',')
              this.paramsObj.deleteattachIds = this.deleteattachIds
              proChangeToTest(this.paramsObj, this.form.approveOrg).then(res => {
                this.getStatus('提交审核成功')
              }).catch(() => {
                this.loading.close()
                this.$message({
                  message: '提交审核失败',
                  type: 'error' })
              })
            } else if (this.$route.query.update === '重大变更' && this.rowData.auditStatus === '认证退至金融机构') {
              this.paramsObj.workflow = this.workFlowParams
              this.paramsObj.oldattachIds = this.oldattachIds.join(',')
              this.paramsObj.deleteattachIds = this.deleteattachIds
              proChange(this.paramsObj, this.form.approveOrg).then(res => {
                this.getStatus('提交审核成功')
              }).catch(() => {
                this.loading.close()
                this.$message({
                  message: '提交审核失败',
                  type: 'error' })
              })
            } else {
              this.paramsObj.workflow = this.workFlowParams
              this.paramsObj.oldattachIds = this.oldattachIds.join(',')
              this.paramsObj.deleteattachIds = this.deleteattachIds
              if (this.paramsObj.auditStatus === '审核未通过' || this.paramsObj.auditStatus === '审核不通过') {
                this.paramsObj.auditStatus = '待提交检测'
              }
              if (this.rowData.auditStatus === '检测退至金融机构') {
                if (this.form.approveInfo) {
                  this.paramsObj.flag = '3'
                  const obj = this.$route.query.from === '列表' ? this.testData : JSON.parse(this.$route.query.queryData)
                  // obj.flowResult = this.paramsObj.workflow.flowResult
                  this.paramsObj.workflow = obj
                  proChange(this.paramsObj, this.form.approveOrg).then(res => {
                    this.getStatus('提交审核成功')
                  }).catch(() => {
                    this.loading.close()
                    this.$message({
                      message: '提交审核失败',
                      type: 'error' })
                  })
                } else {
                  this.paramsObj.flag = '2'
                  this.paramsObj.workflow.flowID = 'recordDetection'
                  proChangeToTest(this.paramsObj, this.form.approveOrg).then(res => {
                    this.getStatus('提交审核成功')
                  }).catch(() => {
                    this.loading.close()
                    this.$message({
                      message: '提交审核失败',
                      type: 'error' })
                  })
                }
              } else {
                proChange(this.paramsObj, this.form.approveOrg).then(res => {
                  this.getStatus('提交审核成功')
                }).catch(() => {
                  this.loading.close()
                  this.$message({
                    message: '提交审核失败',
                    type: 'error' })
                })
              }
            }
          }
        }
      }
    }
  },
  created() {
    this.riidNum = this.$route.query.id
    // this.rowData = JSON.parse(sessionStorage.getItem('rowData'))
    // this.riidNum = this.rowData.id
  },
  mounted() {
    this.riidNum2 = getUUIDWG()
    ApprecordDetails(this.$route.query.id).then(res => {
      this.rowData = res
      if ((this.$route.query.num === '2' && this.$route.query.name !== '重大变更') || this.rowData.auditStatus === '协会退至金融机构') {
        this.isUpdate = true
      }

      // this.riidNum = this.rowData.id
      for (var key in this.rowData) {
        this.form[key] = this.rowData[key]
      }
      if (this.rowData.ipv6 !== null) {
        this.form.ipv6 = Number(this.rowData.ipv6)
      }
      if (res.auditStatus === '待提交' || res.auditStatus === '审核未通过') {
        this.form.flag = '1'
      } else if (res.auditStatus === '检测退至金融机构') {
        this.form.flag = '3'
      } else {
        this.form.flag = '2'
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
      if (this.form.appPermissions !== null) {
        this.form.appPermissions = this.form.appPermissions.split(',')
      } else {
        this.form.appPermissions = []
      }
      // this.$nextTick(function() {
      //   this.$refs['form'].clearValidate()
      // })
      this.vivw()
      if (this.form.approveInfo) {
        this.remoteMethod(this.form.approveInfo.rinm)
        if (this.form.detectionInfo) {
          // this.optionsTest.push(this.form.detectionInfo)
          // this.form.detectionOrg = this.form.detectionInfo.riid
        } else {
          this.changeOrgTest(this.form.approveOrg)
          this.form.detectionOrg = this.form.detectionOrg
        }
      }
      if (this.form.detectionInfo) {
        this.optionsTest.push(this.form.detectionInfo)
        this.form.detectionOrg = this.form.detectionInfo.riid
      }
    })
    flowTodo(this.$route.query.id).then(res => {
      const obj = {
        name: res === null ? '' : res.name,
        sendSubjectionName: res === null ? '' : res.sendSubjectionName,
        subjectionId: res === null ? '' : res.subjectionId,
        trackId: res === null ? '' : res.trackId,
        workId: res === null ? '' : res.workId
      }
      rzWorkFlow(obj).then(res => {
        const obj0 = {
          name: res === null ? '' : res.name,
          sendSubjectionName: res.sendSubjectionName || '',
          subjectionId: res.subjectionId,
          trackId: res.trackId,
          workId: res.workId
        }
        if (res.formData && res.formData.data.auditStatus) {
          getButton(obj0).then(res => {
            this.testData = res
          })
        }
      })
    })
  },
  methods: {
    testChange(val) {
      this.form.detectionOrg = val
    },
    remoteMethodTest(query) {
      certificationUnit({ 'auOrgName': query, 'type': '2' }).then(res => {
        this.optionsTest = res
      })
    },
    cancelUpload(file) {
    },
    erroeChange(e) {
      e.isShow = false
    },
    changeOrgTest(data) {
      this.optionsTest = []
      this.form.detectionOrg = ''
      queryDetectionAuth({ riid: data }).then(res => {
        this.optionsTest = res
      })
    },
    getStatus(data) {
      statusComplate(this.riidNum).then(res => {
        if (res === '待提交检测' || res === '已认证待初审' || res === '已检测待初审' || res === '待检测' || res === '复审待审核') {
          this.loading.close()
          this.$message({
            message: '提交审核成功',
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
                if (this.$refs.file.fileData[0].id) {
                  this.$refs.file.startUpload() // 调取断点续传上传文件的方法
                } else {
                  this.sub()
                }
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
              if (this.$refs.file.fileData[0].id) {
                this.$refs.file.startUpload() // 调取断点续传上传文件的方法
              } else {
                this.submit()
              }
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
    delId(val) {
      this.deleteattachIds.push(val.row.fileId)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
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
    // 工作流提交审核
    sub(formName) {
      this.bc = false
      this.loading = this.$loading({
        lock: true
      })
      const obj = {}
      // else if (this.$route.query.update === '重大变更' && (this.rowData.auditStatus === '检测退至金融机构' || this.rowData.auditStatus === '认证退至金融机构')) {
      //   obj.flowID = 'recordMajorChange'
      // }
      if (this.$route.query.num === '2' && this.$route.query.update !== '重大变更') {
        obj.flowID = 'recordChange'
      } else if (this.$route.query.update === '重大变更') {
        obj.flowID = 'recordDetectionMajorChange'// 其他方式重大变更
      } else {
        obj.flowID = 'record'
      } if (this.rowData.auditStatus === '协会退至金融机构') {
        getNext(this.testData).then(res => {
          this.nextNodeAll = res
          this.nextNodeData = res.flowNextNode.nextNodes
          getUsers(this.nextNodeAll).then(res => {
            this.nextUserAll = res
            const arr = res.flowNextResource.nextNodes[0].authors.Author.selectAuthor.split(';')
            const array = res.flowNextResource.nextNodes[0].authors.Author.selectAuthorName.split(';')
            this.userData = arr.map((codeName, i) => ({ codeName, codeId: array[i] }))
            this.workFlowParams = Object.assign({}, this.nextUserAll)
            this.workFlowParams.flowNextNode = this.nextNodeAll.flowNextNode
            // if (this.$route.query.update !== '更新') {
            //   if (this.form.detectionOrg) {
            //     this.optionsTest.forEach(item => {
            //       if (item.riid === this.form.detectionOrg) {
            //         this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthorName = item.rinm
            //         this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthor = 'P_' + item.riid
            //       }
            //     })
            //   }
            // }
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
      } else if (this.rowData.auditStatus === '检测退至金融机构' && this.form.approveInfo) {
        getNext(obj).then(res => {
          this.nextNodeAll = res
          this.nextNodeData = res.flowNextNode.nextNodes
          getUsers(this.nextNodeAll).then(res => {
            this.nextUserAll = res
            const arr = res.flowNextResource.nextNodes[0].authors.Author.selectAuthor.split(';')
            const array = res.flowNextResource.nextNodes[0].authors.Author.selectAuthorName.split(';')
            this.userData = arr.map((codeName, i) => ({ codeName, codeId: array[i] }))
            this.workFlowParams = Object.assign({}, this.nextUserAll)
            this.workFlowParams.flowNextNode = this.nextNodeAll.flowNextNode
            if (this.$route.query.update !== '更新') {
              if (this.form.detectionOrg) {
                this.optionsTest.forEach(item => {
                  if (item.riid === this.form.detectionOrg) {
                    this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthorName = item.rinm
                    this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthor = 'P_' + item.riid
                  }
                })
              }
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
      } else if (this.rowData.auditStatus === '认证退至金融机构' || (this.rowData.auditStatus === '检测退至金融机构' && !this.form.approveInfo)) {
        getNext(this.testData).then(res => {
          this.nextNodeAll = res
          this.nextNodeData = res.flowNextNode.nextNodes
          getUsers(this.nextNodeAll).then(res => {
            this.nextUserAll = res
            const arr = res.flowNextResource.nextNodes[0].authors.Author.selectAuthor.split(';')
            const array = res.flowNextResource.nextNodes[0].authors.Author.selectAuthorName.split(';')
            this.userData = arr.map((codeName, i) => ({ codeName, codeId: array[i] }))
            this.workFlowParams = Object.assign({}, this.nextUserAll)
            this.workFlowParams.flowNextNode = this.nextNodeAll.flowNextNode
            if (this.$route.query.update !== '更新') {
              if (this.form.detectionOrg) {
                this.optionsTest.forEach(item => {
                  if (item.riid === this.form.detectionOrg) {
                    this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthorName = item.rinm
                    this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthor = 'P_' + item.riid
                  }
                })
              }
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
      } else {
        getNext(obj).then(res => {
          this.nextNodeAll = res
          this.nextNodeData = res.flowNextNode.nextNodes
          getUsers(this.nextNodeAll).then(res => {
            this.nextUserAll = res
            const arr = res.flowNextResource.nextNodes[0].authors.Author.selectAuthor.split(';')
            const array = res.flowNextResource.nextNodes[0].authors.Author.selectAuthorName.split(';')
            this.userData = arr.map((codeName, i) => ({ codeName, codeId: array[i] }))
            this.workFlowParams = Object.assign({}, this.nextUserAll)
            this.workFlowParams.flowNextNode = this.nextNodeAll.flowNextNode
            if (this.$route.query.update !== '更新') {
              if (this.form.detectionOrg) {
                this.optionsTest.forEach(item => {
                  if (item.riid === this.form.detectionOrg) {
                    this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthorName = item.rinm
                    this.workFlowParams.flowNextResource.nextNodes[0].authors.Author.selectAuthor = 'P_' + item.riid
                  }
                })
              }
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
      }
    },
    // 认证单位
    remoteMethod(query) {
      certificationUnit({ 'auOrgName': query, 'type': '1' }).then(res => {
        if (res.length !== 0) {
          this.options = res
        } else {
          this.form.approveOrg = ''
        }
      })
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
    // 图片回显
    vivw() {
      registRiid(this.rowData.id).then(res => {
        this.statusMess = res
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
      // 图片回显

      // HXSearchFil({ noteId: this.rowData.id }).then(res => {
      HXSearchFil(this.rowData.id).then(res => {
        res.forEach(element => {
          if (element.ownSystem === '7') {
            this.oldattachIds.push(element.attachId)
            this.form.fileName = element.originalName
            this.fileID = element.attachId
            this.imageUrl = element.preview
          } else if (element.ownSystem === '15') {
            this.oldattachIds.push(element.attachId)
            this.form.fileName2 = element.originalName
            this.fileID2 = element.attachId
            const obj = {
              url: element.preview,
              fileID: this.fileID2,
              name: element.originalName,
              isShow: true
            }
            this.fileListOne.push(obj)
          } else if (element.ownSystem === '9') {
            this.oldattachIds.push(element.attachId)
            this.form.fileName3 = element.originalName
            this.fileID3 = element.attachId
          } else if (element.ownSystem === '10') {
            this.oldattachIds.push(element.attachId)
            this.form.fileName4 = element.originalName
            this.fileID4 = element.attachId
          } else if (element.ownSystem === '11') {
            this.oldattachIds.push(element.attachId)
            this.form.fileName5 = element.originalName
            this.fileID5 = element.attachId
          } else if (element.ownSystem === '12') {
            this.oldattachIds.push(element.attachId)
            this.form.fileName6 = element.originalName
            this.fileID6 = element.attachId
          } else if (element.ownSystem === '13') {
            this.oldattachIds.push(element.attachId)
            this.form.fileName1 = element.originalName
            this.fileID1 = element.attachId
          } else if (element.ownSystem === '18') {
            this.oldattachIds.push(element.attachId)
          } else if (element.ownSystem === '19') {
            this.oldattachIds.push(element.attachId)
          }
        })
      })
    },
    handleProgress(file, fileList) {
      if (this.flag) {
        this.remnant2 += 1
        this.flag = false
      }
    },
    handleProgress1(file, fileList) {
      if (this.flag1) {
        this.remnant2 += 1
        this.flag1 = false
      }
    },
    handleProgress2(event, file, fileList) {
      if (this.flag2) {
        fileList.forEach(element => {
          if (element.fileID === undefined) {
            this.remnant2 += 1
            this.flag2 = false
          }
        })
      }
    },
    handleProgress3(file, fileList) {
      if (this.flag3) {
        this.remnant2 += 1
        this.flag3 = false
      }
    },
    handleProgress4(file, fileList) {
      if (this.flag4) {
        this.remnant2 += 1
        this.flag4 = false
      }
    },
    handleProgress5(file, fileList) {
      if (this.flag5) {
        this.remnant2 += 1
        this.flag5 = false
      }
    },
    handleProgress6(file, fileList) {
      if (this.flag6) {
        this.remnant2 += 1
        this.flag6 = false
      }
    },
    handleProgress7(file, fileList) {
      if (this.flag7) {
        this.remnant2 += 1
        this.flag7 = false
      }
    },
    // 图片删除
    handleRemove1(file) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (file.fileID) {
          this.deleteattachIds.push(file.fileID)
        }
        this.$refs.upload2.uploadFiles.splice(this.$refs.upload2.uploadFiles.indexOf(file), 1)
      }).catch(() => {

      })
    },
    // 清文件名字
    clearFile() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.fileName = ''
        this.$refs.upload.clearFiles()
        if (this.fileID) {
          this.deleteattachIds.push(this.fileID)
          this.fileID = ''
        }
      }).catch(() => {

      })
    },
    clearFile1() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.fileName1 = ''
        this.$refs.upload1.clearFiles()
        if (this.fileID1) {
          this.deleteattachIds.push(this.fileID1)
          this.fileID1 = ''
        }
      }).catch(() => {

      })
    },
    clearFile7() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.fileName7 = ''
        this.$refs.upload7.clearFiles()
        if (this.fileID7) {
          this.deleteattachIds.push(this.fileID7)
          this.fileID7 = ''
        }
      }).catch(() => {

      })
    },
    // clearFile2() {
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.form.fileName2 = ''
    //     this.$refs.upload2.clearFiles()
    //     if (this.fileID2) {
    //       deleteaAttach(this.fileID2).then(res => {
    //         this.$message({
    //           message: '删除成功',
    //           type: 'success' })
    //       }).catch(() => {

    //       })
    //       this.fileID2 = ''
    //     }
    //   }).catch(() => {

    //   })
    // },
    clearFile3() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.fileName3 = ''
        this.$refs.upload3.clearFiles()
        if (this.fileID3) {
          this.deleteattachIds.push(this.fileID3)
          this.fileID3 = ''
        }
      }).catch(() => {

      })
    },
    clearFile4() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.fileName4 = ''
        this.$refs.upload4.clearFiles()
        if (this.fileID4) {
          this.deleteattachIds.push(this.fileID4)
          this.fileID4 = ''
        }
      }).catch(() => {

      })
    },
    clearFile5() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.fileName5 = ''
        this.$refs.upload5.clearFiles()
        if (this.fileID5) {
          this.deleteattachIds.push(this.fileID5)
          this.fileID5 = ''
        }
      }).catch(() => {

      })
    },
    clearFile6() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.fileName6 = ''
        this.$refs.upload6.clearFiles()
        if (this.fileID6) {
          this.deleteattachIds.push(this.fileID6)
          this.fileID6 = ''
        }
      }).catch(() => {

      })
    },
    handleChange7(file, fileList) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.fileName = ''
        this.$refs.upload.clearFiles()
        if (this.fileID) {
          deleteaAttach(this.fileID).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success' })
          }).catch(() => {

          })
          this.fileID = ''
        }
      }).catch(() => {

      })
    },
    // 上传文件成功的回调
    handleAvatarSuccess7() {
      this.remnant += 1
    },
    // 文件上传失败回调
    handleAvatarerr7() {
      this.remnant -= 1
      this.loading.close()
      this.flag7 = true
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
      document.getElementsByTagName('body')[0].style.overflow = 'scroll'
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
      this.loading.close()
      this.flag = true
      this.form.fileName = ''
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
      this.flag1 = true
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
      if (fileList.length > 0) {
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
      this.flag2 = true
      this.form.fileName2 = ''
      this.$confirm('您的签名文件信息上传失败请重新选择上传', '提示', {
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
    handleAvatarSuccess4() {
      this.remnant += 1
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
      this.remnant += 1
      if (res.code !== 200) {
        this.handleAvatarerr5()
      }
    },
    // 文件上传失败回调
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
      this.flag6 = true
      this.form.fileName6 = ''
      this.$confirm('您的报告盖章页电子影印件上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    nextStep() {
      this.submit1()
    },
    submit1() {
      this.remnant = 0
      this.remnant2 = 0
      this.form.updateTime = getdqDate() // 更新时间
      this.form.addTime = getdqDate() // 提交审核时间
      this.form.riid = this.$store.getters.riid
      this.form.id = this.riidNum
      this.loading = this.$loading({
        lock: true
      })
      this.$refs.upload.submit()
      this.$refs.upload1.submit()
      this.$refs.upload2.submit()
      if (this.form.devlopType === 1) {
        this.$refs.upload3.submit()
        this.$refs.upload4.submit()
      }
      this.$refs.upload5.submit()
      // this.$refs.upload6.submit()
      // this.$refs.upload7.submit()
      setTimeout(() => {
        if (this.remnant2 === 0) {
          delete this.paramsObj.workflow
          if (this.$route.query.num === '2' && this.$route.query.update !== '重大变更') {
            this.paramsObj.workflow = this.workFlowParams
            this.paramsObj.oldattachIds = this.oldattachIds.join(',')
            this.paramsObj.deleteattachIds = this.deleteattachIds
            submitChange(this.paramsObj).then(res => {
              this.getStatus('提交审核成功')
            }).catch(() => {
              this.loading.close()
              this.$message({
                message: '提交审核失败',
                type: 'error' })
            })
          } else if (this.$route.query.update === '重大变更' && this.rowData.auditStatus !== '检测退至金融机构' && this.rowData.auditStatus !== '认证退至金融机构' && this.rowData.auditStatus !== '协会退至金融机构') {
            this.paramsObj.updateTime = getdqDate()
            this.paramsObj.workflow = this.workFlowParams
            this.paramsObj.workflow.flowID = 'recordDetectionMajorChange'
            this.paramsObj.oldattachIds = this.oldattachIds.join(',')
            this.paramsObj.deleteattachIds = this.deleteattachIds
            majorChange(this.paramsObj).then(res => {
              this.getStatus('提交审核成功')
            }).catch(() => {
              this.loading.close()
              this.$message({
                message: '提交审核失败',
                type: 'error' })
            })
          } else if (this.$route.query.update === '重大变更' && this.rowData.auditStatus === '协会退至金融机构') {
            this.paramsObj.flag = '4'// 跨级退回提交时flag是3，不跨级是2,4是金融直接到协会
            // const obj = this.$route.query.from === '列表' ? this.testData : JSON.parse(this.$route.query.queryData)
            this.paramsObj.workflow = this.workFlowParams
            this.paramsObj.workflow.nodeName = '检测机构'
            this.paramsObj.workflow.flowID = 'recordDetectionMajorChange'
            this.paramsObj.oldattachIds = this.oldattachIds.join(',')
            this.paramsObj.deleteattachIds = this.deleteattachIds
            proChangeToTest(this.paramsObj, this.form.approveOrg).then(res => {
              this.getStatus('提交审核成功')
            }).catch(() => {
              this.loading.close()
              this.$message({
                message: '提交审核失败',
                type: 'error' })
            })
          } else if (this.$route.query.update === '重大变更' && this.rowData.auditStatus === '检测退至金融机构') {
            this.paramsObj.flag = '2'// 跨级退回提交时flag是3，不跨级是2
            // const obj = this.$route.query.from === '列表' ? this.testData : JSON.parse(this.$route.query.queryData)
            this.paramsObj.workflow = this.workFlowParams
            this.paramsObj.workflow.nodeName = '检测机构'
            this.paramsObj.workflow.flowID = 'recordDetectionMajorChange'
            this.paramsObj.oldattachIds = this.oldattachIds.join(',')
            this.paramsObj.deleteattachIds = this.deleteattachIds
            proChangeToTest(this.paramsObj, this.form.approveOrg).then(res => {
              this.getStatus('提交审核成功')
            }).catch(() => {
              this.loading.close()
              this.$message({
                message: '提交审核失败',
                type: 'error' })
            })
          } else if (this.$route.query.update === '重大变更' && this.rowData.auditStatus === '认证退至金融机构') {
            this.paramsObj.workflow = this.workFlowParams
            this.paramsObj.oldattachIds = this.oldattachIds.join(',')
            this.paramsObj.deleteattachIds = this.deleteattachIds
            proChange(this.paramsObj, this.form.approveOrg).then(res => {
              this.getStatus('提交审核成功')
            }).catch(() => {
              this.loading.close()
              this.$message({
                message: '提交审核失败',
                type: 'error' })
            })
          } else {
            this.paramsObj.workflow = this.workFlowParams
            this.paramsObj.oldattachIds = this.oldattachIds.join(',')
            this.paramsObj.deleteattachIds = this.deleteattachIds
            if (this.paramsObj.auditStatus === '审核未通过' || this.paramsObj.auditStatus === '审核不通过') {
              this.paramsObj.auditStatus = '待提交检测'
            }
            if (this.rowData.auditStatus === '检测退至金融机构') {
              if (this.form.approveInfo) {
                this.paramsObj.flag = '3'
                const obj = this.$route.query.from === '列表' ? this.testData : JSON.parse(this.$route.query.queryData)
                // obj.flowResult = this.paramsObj.workflow.flowResult
                this.paramsObj.workflow = obj
                proChange(this.paramsObj, this.form.approveOrg).then(res => {
                  this.getStatus('提交审核成功')
                }).catch(() => {
                  this.loading.close()
                  this.$message({
                    message: '提交审核失败',
                    type: 'error' })
                })
              } else {
                this.paramsObj.flag = '2'
                this.paramsObj.workflow.flowID = 'recordDetection'
                proChangeToTest(this.paramsObj, this.form.approveOrg).then(res => {
                  this.getStatus('提交审核成功')
                }).catch(() => {
                  this.loading.close()
                  this.$message({
                    message: '提交审核失败',
                    type: 'error' })
                })
              }
            } else if (this.rowData.auditStatus === '认证退至金融机构') {
              proChange(this.paramsObj, this.form.approveOrg).then(res => {
                this.getStatus('提交审核成功')
              }).catch(() => {
                this.loading.close()
                this.$message({
                  message: '提交审核失败',
                  type: 'error' })
              })
            } else {
              proChange(this.paramsObj, this.form.approveOrg).then(res => {
                this.getStatus('提交审核成功')
              }).catch(() => {
                this.loading.close()
                this.$message({
                  message: '提交审核失败',
                  type: 'error' })
              })
            }
          }
        }
      }, 1000)
    },
    submit(formName) {
      this.bc = true
      this.remnant = 0
      this.remnant2 = 0
      this.form.riid = this.$store.getters.riid
      this.form.id = this.riidNum
      this.form.auditStatus = '待提交'
      this.form.updateTime = getdqDate()
      delete this.form.addTime
      this.loading = this.$loading({
        lock: true
      })
      this.$refs.upload.submit()
      this.$refs.upload1.submit()
      this.$refs.upload2.submit()
      if (this.form.devlopType === 1) {
        this.$refs.upload3.submit()
        this.$refs.upload4.submit()
      }
      this.$refs.upload5.submit()
      // this.$refs.upload6.submit()
      // this.$refs.upload7.submit()
      setTimeout(() => {
        if (this.remnant2 === 0) {
          delete this.paramsObj.org
          this.paramsObj.oldattachIds = this.oldattachIds.join(',')
          this.paramsObj.deleteattachIds = this.deleteattachIds
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
      if (sessionStorage.getItem('routerName') === 'home-index') {
        this.$router.go(-1)
      } else {
        const obj = JSON.parse(this.$route.query.searchData)
        obj.ifReview = true
        this.$router.push({
          name: sessionStorage.getItem('routerName'),
          params: {
            tabMsg: { tabMsg: sessionStorage.getItem('tabMsg') },
            searchData: obj
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.el-image__inner{
    height: 150px;
    width:100%;
    margin-bottom: 10px;
}
.el-table__header{
    width: 100% !important;
}
.el-table__body{
    width: 100% !important;
}
.AppRegistrationDetailVivw{
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
      left:12%;
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
