<template>
  <el-card class="AppRegistration AuthenticationTest">
    <div slot="header" class="clearfix btnCard">
      <span>App备案信息详情</span>
      <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
    </div>
    <el-form ref="form" :model="form" :rules="rules" disabled>
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">客户端软件信息</legend>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-upload
              class="avatar-uploader"
              :action="actionUrl"
              :show-file-list="false"
            >
              <el-image
                v-if="imageUrl"
                class="avatar"
                :src="imageUrl"
                @click="imgClick"
              >
                <div slot="error" class="el-image__error" style="cursor:pointer;color:#333">
                  格式不支持预览
                </div>
              </el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-col>
          <el-col :span="20">
            <el-col :span="12">
              <span> 包名: {{ form.packageName }}</span>
            </el-col>
            <el-col :span="12">
              <span> 是否为本单位开发: {{ form.devlopType===0?'是':'否' }}</span>
            </el-col>
            <el-col :span="12" style="margin-top:25px">
              <span> 软件名称: {{ form.appName }}</span>
            </el-col>
            <el-col :span="12" style="margin-top:25px">
              <span> 开发单位: {{ form.developer?form.developer:'无' }}</span>
            </el-col>
            <el-col :span="12" style="margin-top:25px">
              <span> 软件版本: {{ form.appVersion }}</span>
            </el-col>
            <el-col :span="12" style="margin-top:25px">
              <span> 开发单位统一社会信用代码: {{ form.creditCode?form.creditCode:'无' }}</span>
            </el-col>
            <el-col :span="12" style="margin-top:25px">
              <span> 语言类型: {{ form.leType === '0'?'中文':'非中文' }}</span>
            </el-col>
            <!-- <el-col :span="12" style="margin-top:25px">
              <span> 是否支持IPv6: {{ form.ipv6 === 0?'是':'否' }}</span>
            </el-col> -->
            <!-- <el-col :span="12" style="margin-top:25px">
              <span> 认证机构:{{ form.approveOrg }}</span>
            </el-col> -->
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="APP应用页截图" prop="fileName7" class="radio_enter">
              <el-alert
                :closable="false"
                description="截图须与申报软件实际运行界面一致，应清晰展示应用主界面、主要功能页（资金交易或支付等）、版本信息页、隐私政策页（发布、生效或更新日期）等，但不应显示敏感信息。"
                style="height:35px;margin-bottom:10px"
                type="warning"
              />
              <el-upload
                :action="actionUrl"
                :file-list="fileListOne"
                list-type="picture-card"
                :auto-upload="false"
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
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download" />
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
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
              <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请描述app功能，限500字" maxlength="500" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="第三方安全加固单位" prop="otherAssistOrg">
              <el-input v-model="form.otherAssistOrg" type="text" placeholder="" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="第三方加固单位统一社会信用代码" prop="otherAssistOrgCode">
              <el-input v-model="form.otherAssistOrgCode" type="text" placeholder="" maxlength="18" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="代理公司营业执照电子影印件" prop="fileName3">
              <el-input v-model="form.fileName3" disabled style="width: 100%">
                <template v-if="fileID3" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload3"><i class="el-icon-download">下载</i></span></template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="ICP/SP许可电子影印件" prop="fileName4">
              <el-input v-model="form.fileName4" disabled style="width: 100%">
                <template v-if="fileID4" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload4"><i class="el-icon-download">下载</i></span></template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="APP产品类型" prop="productType">
              <el-select v-model="form.productType" placeholder="APP产品类型" clearable>
                <el-option v-for="(item,index) in AppList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
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
                <template v-if="fileID5" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload5"><i class="el-icon-download">下载</i></span></template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset v-if="form.reportNum === ''" class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">外部评估</legend>
        <el-row :gutter="20">
          <el-col v-if="$route.query.appFilePath === '2'" :span="12">
            <el-form-item label="认证单位" required>
              <el-input v-model="form.approveInfo.rinm" type="text" :rows="3" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检测单位">
              <el-input v-model="form.detectionInfo.rinm" type="text" :rows="3" />
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">客户端软件安装包</legend>
        <el-table :data="tableData">
          <el-table-column label="序号" type="index" width="80" />
          <el-table-column label="文件名称" prop="originalName" min-width="250" show-overflow-tooltip />
          <el-table-column label="文件大小" width="80" prop="attachSize" />
          <el-table-column label="MD5值" min-width="250" prop="md5" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <p type="text" style="color:#409EFF;cursor:pointer" @click="fileDownload8(scope.row.attachId)">下载</p>
            </template>
          </el-table-column>
        </el-table>
      </fieldset>
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">其他信息</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="其他信息文件" prop="fileName1">
              <el-input v-model="form.fileName1" disabled style="width: 100%">
                <template v-if="fileID1" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload1"><i class="el-icon-download">下载</i></span></template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset v-if="form.auditStatus === '已备案'&&form.appIconPath !== '1'" class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">检测信息</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="检测结果" prop="checkResult">
              <el-select v-model="reportForm1.checkResult" placeholder="检测结果" clearable>
                <el-option v-for="(item,index) in jcList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报告编号" prop="reportNum">
              <el-input v-model="reportForm1.reportNum" type="text" placeholder="报告编号" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="检测报告文件" prop="fileName1">
              <el-input v-model="form.fileName18" disabled style="width: 100%">
                <template slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload18"><i class="el-icon-download">下载</i></span></template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse v-model="activeNames" @change="handleChange10">
          <el-collapse-item v-for="(itema,indexa) in testShowData" :key="indexa" :title="itema.label" :name="indexa">
            <el-table
              v-if="testShowData.length !== 0"
              :data="itema.children"
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-row>
                    <el-row v-for="(item,index) in props.row.children" :key="index" :span="24">
                      <el-form-item :label="item.label">
                        <el-radio-group v-model="item.result" @change="fn(props.row.children,props.row)">
                          <el-radio label="0">符合</el-radio>
                          <el-radio label="1">不符合</el-radio>
                          <el-radio label="2">不适用</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-row>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="序号" type="index" width="50" />
              <el-table-column
                label="检测项目"
                prop="label"
              />
              <el-table-column label="检测结果">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.result" @change="fb(scope)">
                    <el-radio label="0">符合</el-radio>
                    <el-radio label="1">不符合</el-radio>
                    <el-radio label="2">不适用</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </fieldset>
      <fieldset v-if="form.auditStatus === '已备案' && $route.query.appFilePath === '2'&&form.appIconPath !== '1'" class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">认证信息</legend>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="认证结果" prop="approveResult">
              <el-select v-model="reportForm.approveResult" placeholder="认证结果" clearable>
                <el-option v-for="(item,index) in jcList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证书编号" prop="certificateNum">
              <el-input v-model="reportForm.certificateNum" type="text" placeholder="证书编号" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="认证证书" prop="fileName1">
              <el-input v-model="form.fileName19" disabled style="width: 100%">
                <template slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload19"><i class="el-icon-download">下载</i></span></template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse v-model="activeNames1" @change="handleChange11">
          <el-collapse-item v-for="(itema,indexa) in authenticationShowData" :key="indexa" :title="itema.label" :name="indexa">
            <el-table
              v-if="authenticationShowData.length !== 0"
              :data="itema.children"
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-row>
                    <el-row v-for="(item,index) in props.row.children" :key="index" :span="24">
                      <el-form-item :label="item.label">
                        <el-radio-group v-model="item.result" @change="fn(props.row.children,props.row)">
                          <el-radio label="0">符合</el-radio>
                          <el-radio label="1">不符合</el-radio>
                          <el-radio label="2">不适用</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-row>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="序号" type="index" width="50" />
              <el-table-column
                label="检测项目"
                prop="label"
              />
              <el-table-column label="检测结果">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.result" @change="fb(scope)">
                    <el-radio label="0">符合</el-radio>
                    <el-radio label="1">不符合</el-radio>
                    <el-radio label="2">不适用</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </fieldset>
      <fieldset v-show="statusMess.length>0" class="fieldsetStyle" style="margin:0 auto">
        <legend style="margin-left: 40px;font-size:17px">审核记录</legend>
        <div style="margin-bottom:10px" shadow="never">
          <el-table :data="statusMess" tooltip-effect="dark">
            <el-table-column label="审核机构" prop="auditUserName" show-overflow-tooltip />
            <el-table-column label="审核人" prop="auditUser" show-overflow-tooltip />
            <el-table-column label="审核阶段" prop="currentState" show-overflow-tooltip />
            <el-table-column label="审核意见" prop="remark" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.remark?scope.row.remark:'--' }}
              </template>
            </el-table-column>
            <el-table-column label="审核时间" prop="auditTime" show-overflow-tooltip />
          </el-table>
        </div>
      </fieldset>
    </el-form>
    <br>
    <div>
      <el-row style="text-align:center;">
        <el-col :span="24">
          <el-button v-if="this.$route.query.Num==='1'" type="primary" @click="submit('form')">审核</el-button>
          <!-- <el-button v-if="this.$route.query.Num==='1'" type="primary" @click="submit1('form')">退回修改</el-button> -->
          <!-- <el-button type="primary">暂 存</el-button> -->
          <el-button type="primary" @click="goBack">返回</el-button>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import { commonValidate2 } from '@/utils/formValidate'
import {
  proChange,
  HXSearchFil,
  HXSearchList,
  certificationUnit,
  registRiid,
  ApprecordDetails,
  rzWorkFlow,
  getNewTree
} from '@/api/appbeian/register.js'
import { getClock } from '@/api/general.js'
export default {
  data() {
    return {
      testShowData: [],
      RZWriteData: [],
      authenticationShowData: [],
      testShow1: [],
      testShow2: [],
      testShow3: [],
      activeNames: [],
      activeNames1: [],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      options: [],
      remnant: 0,
      remnant1: 6,
      disabled: false,
      centerDialogVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      rowData: null,
      tableData: [],
      loading: null,
      statusMess: [
      ],
      fileListOne: [
      ],
      imageUrl: '',
      fileID: '',
      fileID1: '',
      fileID2: '',
      fileID3: '',
      fileID4: '',
      fileID5: '',
      fileID6: '',
      fileID7: '',
      fileID18: '',
      fileID19: '',
      custRecoTbData: [
      ],
      reportForm1: {
        checkResult: '',
        reportNum: '',
        fileName: '',
        orgId: ''
      },
      reportForm: {
        approveResult: '',
        certificateNum: '',
        fileName: '',
        orgId: ''
      },
      form: {
        ipv6: 1,
        approveInfo: {
          succ: '',
          rinm: ''
        },
        detectionInfo: {
          succ: '',
          rinm: ''
        },
        appIconPath: '',
        appName: '',
        productType: '',
        description: '',
        application: '社交类型',
        devlopType1: 1,
        recordType: '',
        appVersion: '',
        endorseInfo: '',
        devlopType: '',
        otherAssistOrg: '',
        developer: '',
        creditCode: '',
        remark: '',
        reportNum: '',
        appPermissions: [],
        approveList: [],
        detectionList: [],
        // 文件
        fileName: '',
        fileName11: '',
        fileName1: '',
        fileName2: '',
        fileName3: '',
        fileName4: '',
        fileName5: '',
        fileName7: '',
        fileName6: '',
        fileName19: '',
        fileName18: ''
      },
      isJurisdiction: false, // 应用权限
      regionalOptions: [],
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
      jcList: [
        {
          name: '合格',
          code: '0'
        },
        {
          name: '不合格',
          code: '1'
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
      testWriteData: [],
      rules: {
        bao: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        appName: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        recordType: [{ required: false, message: '请选择', trigger: 'change' }],
        productType: [{ required: false, message: '请选择', trigger: 'change' }],
        otherAssistOrg: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        developer: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        creditCode: [
          { required: false, message: '请正确填写18位统一社会信用代码', trigger: 'blur', max: 18 },
          { pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: '请正确填写18位统一社会信用代码', trigger: 'blur' }
        ],
        appVersion: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        reportNum: [{ required: false, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        devlopType: [{ required: false, message: '请选择', trigger: 'change' }],
        appPermissions: [{ required: false, message: '请选择', trigger: 'change' }],
        fileName: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName1: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName2: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName3: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName4: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName5: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName6: [{ required: false, message: '请上传文件', trigger: 'change' }],
        fileName7: [{ required: false, message: '请上传文件', trigger: 'change' }]
      }
    }
  },
  computed: {
    // 上传地址
    actionUrl() {
      return `api/file/upload/upload-attach?noteId=&ownSystem=aml-identify&ownBusiness=identify`
    }
  },
  created() {
    getNewTree('1').then(res => {
      // this.custRecoTbData = res
      this.testWriteData = res[0].children || []
    })
    getNewTree('2').then(res => {
      // this.custRecoTbData = res
      this.RZWriteData = res[0].children || []
    })
  },
  mounted() {
    if (this.$route.query.Num === '0') {
      ApprecordDetails(this.$route.query.id).then(res => {
        this.rowData = res
        for (var key in this.rowData) {
          if (this.form[key] instanceof Array) {
            this.form[key] = this.rowData[key] || []
          } else if (this.form[key] instanceof String || Number) {
            this.form[key] = this.rowData[key] || ''
          } else if (this.form[key] instanceof Object) {
            this.form[key] = this.rowData[key] || {}
          } else {
            this.form[key] = this.rowData[key]
          }
        }
        if (this.rowData.ipv6 !== null) {
          this.form.ipv6 = Number(this.rowData.ipv6)
        }
        this.form.devlopType = res.devlopType
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
        // if (res.approveInfo) {
        //   this.form.approveInfo.rinm = res.approveInfo
        // } else {
        //   this.form.approveInfo.rinm = ''
        // }
        if (res.appDetectionInfo) {
          this.reportForm1.reportNum = res.appDetectionInfo.reportNum
          this.reportForm1.checkResult = res.appDetectionInfo.checkResult
          this.form.detectionList = res.detectionList
          if (res.detectionList !== null) {
            this.testShowData = res.detectionList ? res.detectionList[0].children : []
          }
        }
        if (res.appApproveInfo) {
          this.reportForm.certificateNum = res.appApproveInfo.certificateNum
          this.reportForm.approveResult = res.appApproveInfo.approveResult
          this.form.approveList = res.approveList
          if (res.approveList !== null) {
            this.authenticationShowData = res.approveList ? res.approveList[0].children : []
          }
        }
        if (res.appPermissions !== null && res.appPermissions.length !== 0) {
          this.form.appPermissions = this.form.appPermissions.split(',')
        }
        this.$nextTick(function() {
          this.$refs['form'].clearValidate()
        })
        this.vivw()
        this.remoteMethod(this.form.approveOrg)
      })
    } else {
      this.workDetail()
    }
  },
  methods: {
    imgClick() {
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
    },
    erroeChange(e) {
      e.isShow = false
    },
    handleChange10(val) {
    },
    handleChange11(val) {
    },
    // 认证单位
    remoteMethod(query) {
      certificationUnit({ 'auOrgName': query, 'type': '1' }).then(res => {
        this.options = res
      })
    },
    isReasonable(formName) {
      this.centerDialogVisible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
        } else {
          return false
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    workDetail() {
      const obj = {
        name: this.$route.query.name,
        sendSubjectionName: this.$route.query.sendSubjectionName,
        subjectionId: this.$route.query.subjectionId,
        trackId: this.$route.query.trackId,
        workId: this.$route.query.workId
      }
      rzWorkFlow(obj).then(res => {
        this.ccc = Object.assign({}, res.formData.data)
        if (res.formData.data.appDetectionInfo == null) {
          this.isShow = true
        }
        this.reportForm.orgId = res.formData.data.detectionOrg
        if (res.formData.data.appDetectionInfo) {
          this.reportForm1.reportNum = res.formData.data.appDetectionInfo.reportNum
          this.reportForm1.checkResult = res.formData.data.appDetectionInfo.checkResult
          this.form.detectionList = res.formData.data.detectionList
          this.testShowData = res.formData.data.detectionList ? res.formData.data.detectionList[0].children : []
        }
        if (res.formData.data.appApproveInfo) {
          this.reportForm.certificateNum = res.formData.data.appApproveInfo.certificateNum
          this.reportForm.approveResult = res.formData.data.appApproveInfo.approveResult
          this.form.approveList = res.formData.data.approveList
          this.authenticationShowData = res.formData.data.approveList[0].children || []
        }
        this.rowData = res.formData.data
        for (var key in this.rowData) {
          this.form[key] = this.rowData[key]
        }
        if (this.rowData.ipv6 !== null) {
          this.form.ipv6 = Number(this.rowData.ipv6)
        }
        if (this.form.productType === 'Android') {
          getClock('C2000030').then(res => {
            this.regionalOptions = res
          })
        } else if (this.form.productType === 'IOS') {
          getClock('C2000031').then(res => {
            this.regionalOptions = res
          })
        }
        if (this.form.appPermissions !== null) {
          this.form.appPermissions = this.form.appPermissions.split(',')
        }
        this.vivw()
      })
    },
    vivw() {
      HXSearchList({ noteId: this.rowData.id, ownSystem: '8' }).then(res => {
        res.forEach(element => {
          if (element.ownSystem === '8') {
            element.attachSize = Math.round(100 * (element.attachSize / 1048576)) / 100
            element.attachSize = isNaN(element.attachSize) ? 0 : parseFloat(element.attachSize).toFixed(1) + 'MB'
            this.tableData = res
          }
        })
      })
      // 审核记录
      registRiid(this.rowData.id).then(res => {
        this.statusMess = res
      })
      // 图片回显
      HXSearchFil(this.rowData.id).then(res => {
        res.forEach(element => {
          if (element.ownSystem === '7') {
            // this.form.fileName = element.originalName
            this.fileID = element.attachId
            this.imageUrl = element.preview
          } else if (element.ownSystem === '15') {
            this.fileID2 = element.attachId
            const obj = {
              url: element.preview,
              fileID: this.fileID2,
              isShow: true
            }
            this.fileListOne.push(obj)
          } else if (element.ownSystem === '9') {
            this.form.fileName3 = element.originalName
            this.fileID3 = element.attachId
          } else if (element.ownSystem === '10') {
            this.form.fileName4 = element.originalName
            this.fileID4 = element.attachId
          } else if (element.ownSystem === '11') {
            this.form.fileName5 = element.originalName
            this.fileID5 = element.attachId
          } else if (element.ownSystem === '12') {
            this.form.fileName6 = element.originalName
            this.fileID6 = element.attachId
          } else if (element.ownSystem === '13') {
            this.form.fileName1 = element.originalName
            this.fileID1 = element.attachId
          } else if (element.ownSystem === '15') {
            this.form.fileName7 = element.originalName
            this.fileID7 = element.attachId
          } else if (element.ownSystem === '18') {
            this.form.fileName18 = element.originalName
            this.fileID18 = element.attachId
          } else if (element.ownSystem === '19') {
            this.form.fileName19 = element.originalName
            this.fileID19 = element.attachId
          }
        })
      })
    },
    // 清文件名字
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
    handleDownload(file) {
      location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
    },
    fileDownload() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID}`
    },
    fileDownload1() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID1}`
    },
    fileDownload18() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID18}`
    },
    fileDownload19() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID19}`
    },
    fileDownload2() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID2}`
    },
    fileDownload3() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID3}`
    },
    fileDownload4() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID4}`
    },
    fileDownload5() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID5}`
    },
    fileDownload6() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID6}`
    },
    fileDownload7() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID7}`
    },
    fileDownload8(id) {
      location.href = `nifa-autonomy-file/upload/download/${id}`
    },
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        this.form.fileName = fileList[0].name
      } else {
        this.form.fileName = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      const isJPG = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      const extension = isJPG === 'pdf'
      const extension1 = isJPG === 'jpg'

      if (!extension && !extension1) {
        this.$message.error('上传图片只能是 pdf/jpg 格式!')
        this.form.fileName = ''
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.form.fileName = ''
        return false
      }
    },
    // 上传文件成功的回调
    // handleAvatarSuccess() {
    //   this.remnant += 1
    // },
    // 文件上传失败回调
    handleAvatarerr() {
      this.remnant -= 1
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
      const isLt10M = file.size / 1024 / 1024 < 10
      const isJPG = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      const extension = isJPG === 'pdf'
      const extension1 = isJPG === 'jpg'

      if (!extension && !extension1) {
        this.$message.error('上传图片只能是 pdf/jpg 格式!')
        this.form.fileName1 = ''
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.form.fileName1 = ''
        return false
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess1() {
      this.remnant += 1
    },
    // 文件上传失败回调
    handleAvatarerr1() {
      this.remnant -= 1
      this.loading.close()
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
        fileList.shift()
        this.form.fileName2 = fileList[0].name
      } else {
        this.form.fileName2 = fileList[0].name
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      const isJPG = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      const extension = isJPG === 'pdf'
      const extension1 = isJPG === 'jpg'

      if (!extension && !extension1) {
        this.$message.error('上传图片只能是 pdf/jpg 格式!')
        this.form.fileName2 = ''
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.form.fileName2 = ''
        return false
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess2() {
      this.remnant += 1
    },
    // 文件上传失败回调
    handleAvatarerr2() {
      this.remnant -= 1
      this.loading.close()
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
      const isLt10M = file.size / 1024 / 1024 < 10
      const isJPG = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      const extension = isJPG === 'pdf'
      const extension1 = isJPG === 'jpg'

      if (!extension && !extension1) {
        this.$message.error('上传图片只能是 pdf/jpg 格式!')
        this.form.fileName3 = ''
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.form.fileName3 = ''
        return false
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
      const isLt10M = file.size / 1024 / 1024 < 10
      const isJPG = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      const extension = isJPG === 'pdf'
      const extension1 = isJPG === 'jpg'

      if (!extension && !extension1) {
        this.$message.error('上传图片只能是 pdf/jpg 格式!')
        this.form.fileName4 = ''
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.form.fileName = ''
        return false
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
      const isLt10M = file.size / 1024 / 1024 < 10
      const isJPG = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      const extension = isJPG === 'pdf'
      const extension1 = isJPG === 'jpg'

      if (!extension && !extension1) {
        this.$message.error('上传图片只能是 pdf/jpg 格式!')
        this.form.fileName5 = ''
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.form.fileName5 = ''
        return false
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess5() {
      this.remnant += 1
    },
    // 文件上传失败回调
    handleAvatarerr5() {
      this.remnant -= 1
      this.loading.close()
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
      const isLt10M = file.size / 1024 / 1024 < 10
      const isJPG = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      const extension = isJPG === 'pdf'
      const extension1 = isJPG === 'jpg'

      if (!extension && !extension1) {
        this.$message.error('上传图片只能是 pdf/jpg 格式!')
        this.form.fileName6 = ''
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.form.fileName6 = ''
        return false
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
      this.$confirm('您的报告盖章页电子影印件上传失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    // 审核
    submit(formName) {
      this.centerDialogVisible = true
      // this.$store.dispatch('openWorkFlow', true)
      // this.loading = this.$loading({
      //   lock: true
      // })
      // proChange({ auditStatus: '审核通过', id: this.rowData.id }).then(res => {
      //   this.loading.close()
      //   this.$router.go(-1)
      // }).catch(() => {
      //   this.loading.close()
      // })
    },
    submit1(formName) {
      this.loading = this.$loading({
        lock: true
      })
      proChange({ auditStatus: '审核未通过', id: this.rowData.id }).then(res => {
        this.loading.close()
        this.$router.go(-1)
      }).catch(() => {
        this.loading.close()
      })
    },
    goBack() {
      if (JSON.parse(this.$route.query.searchData)) {
        const obj = JSON.parse(this.$route.query.searchData)
        obj.ifReview = true
        this.$router.push({
          name: sessionStorage.getItem('routerName'),
          params: {
            tabMsg: { tabMsg: sessionStorage.getItem('tabMsg') },
            searchData: obj
          }
        })
      } else {
        this.$router.go(-1)
      }
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
.el-table__header{
    width: 100% !important;
}
.el-table__body{
    width: 100% !important;
}
.AppRegistration{
   .el-collapse-item__header{
        font-size: 17px;
      }
  .radio_enter {
    > label {
      width: 100%;
      text-align: left;
    }
  }
  .el-upload--picture-card{
    display: none
  }
  .tableStyle{
  [class*=" el-icon-"], [class^=el-icon-] {
        font-weight:bold;
  }
  }
}
</style>
