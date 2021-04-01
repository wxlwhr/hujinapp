<template>
  <el-card class="registerStyleJ">
    <div slot="header" class="clearfix btnCard">
      <span>注册信息维护</span>
      <el-tag v-if="form.currentState==='待提交'" type="info" style="margin-left:30px">{{ form.currentState }}</el-tag>
      <el-tag v-if="form.currentState==='初审待审核' || form.currentState==='复审待审核'" type="warning" style="margin-left:30px">{{ form.currentState }}</el-tag>
      <el-tag v-if="form.currentState==='已备案'" type="success" style="margin-left:30px">{{ form.currentState }}</el-tag>
      <el-tag v-if="form.currentState==='审核未通过'" type="danger" style="margin-left:30px">{{ form.currentState }}</el-tag>
      <a v-if="this.$route.query.type === '0'" :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
    </div>
    <el-col class="baseBox">
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
                label="金融机构编码"
                prop="ficd"
              >
                <el-input
                  v-model.trim="form.ficd"
                  placeholder="编码"
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
                  placeholder="详细地址"
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
          <el-row :gutter="20">
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
              <el-form-item label="单位联系邮箱" prop="email">
                <el-input v-model="form.email" placeholder="单位联系邮箱" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="分公司数量" prop="departName">
                <el-input v-model.trim="form.departName" placeholder="分公司数量" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="子公司数量" prop="quartersName">
                <el-input v-model.trim="form.quartersName" placeholder="子公司数量" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="持有金融业务许可证的子公司数量" prop="fbln">
                <el-input v-model.trim="form.fbln" placeholder="持有金融业务许可证的子公司数量" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
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
                        @click="fileDownload(file)"
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
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div style="font-size:12px">只能上传.jpg,.png,.pdf格式!且不超过10M</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="授权函" prop="fileName3">
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
                      :on-progress="handleProgress3"
                      :on-error="handleAvatarerr3"
                      :action="actionUrl3"
                      class="upload-demo"
                    >
                      <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                    </el-upload>
                  </template>
                  <template v-if="fileID3" slot="append"><span style="color:#409EFF;cursor:pointer" @click="fileDownload3"><i class="el-icon-download">下载</i></span></template>
                </el-input>
                <div style="font-size:12px">只能上传.jpg,.png,.pdf格式!且不超过10M</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="金融业务许可证（或备案证书）扫描件" prop="fileName2" class="radio_enter">
                <el-input v-show="false" v-model="form.fileName2" />
                <el-upload
                  ref="upload2"
                  :class="{hide:isTrue()&&isxiu}"
                  :file-list="fileList2"
                  :action="actionUrl2"
                  :limit="30"
                  list-type="picture-card"
                  :on-change="handleChange2"
                  :on-exceed="handleExceed2"
                  :on-progress="handleProgress2"
                  :on-success="handleAvatarSuccess2"
                  :on-error="handleAvatarerr2"
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
                        v-if="file.fileID"
                        class="el-upload-list__item-delete"
                        @click="fileDownload2(file)"
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
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div style="font-size:12px">只能上传.jpg,.png,.pdf格式!且不超过10M</div>
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
                <el-input v-model.trim="form.fblc" placeholder="总部发布App总数" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分公司发布App总数" prop="fblia">
                <el-input v-model.trim="form.fblia" placeholder="分公司发布App总数" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="持有金融业务许可证的子公司发布App总数" prop="opnm">
                <el-input v-model.trim="form.opnm" placeholder="持有金融业务许可证的子公司发布App总数" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset class="fieldsetStyle">
          <legend style="margin-left: 40px;font-size:17px">客户端软件安全内控管理制度</legend>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="开发规范" prop="fileName4" class="radio_enter">
                <el-input v-show="false" v-model="form.fileName4" placeholder="" />
                <el-upload
                  ref="upload4"
                  :auto-upload="false"
                  :on-change="handleChange4"
                  :file-list="fileList4"
                  :limit="30"
                  :on-exceed="handleExceed4"
                  :on-remove="clearFile4"
                  :on-preview="fileDownload4"
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
                <el-input v-show="false" v-model="form.fileName5" placeholder="" />
                <el-upload
                  ref="upload5"
                  :auto-upload="false"
                  :on-change="handleChange5"
                  :file-list="fileList5"
                  :limit="30"
                  :on-exceed="handleExceed5"
                  :on-remove="clearFile5"
                  :on-preview="fileDownload5"
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
                <el-input v-show="false" v-model="form.fileName6" placeholder="" />
                <el-upload
                  ref="upload6"
                  :auto-upload="false"
                  :on-change="handleChange6"
                  :file-list="fileList6"
                  :limit="30"
                  :on-exceed="handleExceed6"
                  :on-remove="clearFile6"
                  :on-preview="fileDownload6"
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
        <!-- 结束 -->
      </el-form>
      <div>
        <el-row style="text-align:center;padding-bottom:20px">
          <el-col :span="24">
            <el-button v-if="form.currentState==='已备案'" type="primary" @click="xiugai">修改机构信息</el-button>
            <el-button :disabled="isTrue()&&isxiu" type="primary" @click="handlerSubmit('form','0')">提交审核</el-button>
            <el-button v-if="form.currentState !=='已备案'" :disabled="isTrue()" type="primary" @click="handlerSubmit1('form','1')">保存</el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
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
import { getAdrr, getClock } from '@/api/general.js'
import { mapGetters } from 'vuex'
import { getUUIDWG } from '@/utils'
import bgMonitor from '@/assets/login/logow.png'
import { getNext, getUsers } from '@/api/workflow/index.js'
import { neiKong, Authorized, Xuekezheng } from '@/utils/formValidate'
export default {
  name: 'Forum',
  data() {
    return {
      isxiu: true,
      options: [],
      statusMess: [],
      fileIdArr: [],
      fileList1: [],
      fileList2: [],
      fileList4: [],
      fileList5: [],
      fileList6: [],
      fileList7: [],
      dialogImageUrl: '',
      dialogVisible: false,
      // isOsnm: false,
      status: '',
      remnant: 0,
      remnant2: 0,
      bgMonitorImg: bgMonitor,
      btntxt: '获取验证码',
      disabled: false,
      guanxiabumen: [],
      registerAddrArr: [],
      fileID: '',
      fileID3: '',
      fileID4: '',
      fileID5: '',
      riidNum: '',
      flag: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: true,
      form: {
        srnm: '0', // 机构类型
        // osnm: '',
        flowType: '',
        // 文件
        fileName: '',
        fileName2: '',
        fileName3: '',
        fileName4: '',
        fileName5: '',
        fileName6: '',
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
        registerProvince: null,
        registerCity: null,
        registerArea: null,
        officeAddr: '', // 详细地址
        monitorName: '', // 联系人
        managerTel: '', // 联系方式
        quartersName: '', // 子公司数量
        departName: '', // 分公司数量
        setPassword: '', // 设置登录密码
        rinm: '', // 机构名称
        riam: '', // 机构简称
        riid: '',
        currentState: '',
        buildTime: '2019-11-18'
      },
      rules: {
        fileName: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName2: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName3: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName4: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName5: [{ required: true, message: '请上传文件', trigger: 'change' }],
        fileName6: [{ required: true, message: '请上传文件', trigger: 'change' }],
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
        ficd: [{ required: false, pattern: /^[A-Z]{1}[0-9]{13}$/, message: '请输入正确的金融机构编码', trigger: 'blur' }],
        ficp: [{ required: true, message: '请选择机构类别', trigger: 'change' }],
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
          { required: true, message: '请填写正确的联系方式', trigger: 'blur', max: 20 },
          { pattern: /^1\d{10}$/, message: '请填写正确的联系方式', trigger: 'blur' }
        ],
        position: [{ required: true, message: '职务不能为空且最多20个字符', trigger: 'blur', max: 20 }]
      },
      workFlowParams: {},
      nodeMatching: '',
      nextNodeAll: {},
      nextUserAll: {},
      message: '工作流组件',
      userData: [],
      userChecked: [], // 已选择的人员
      nextNodeData: [],
      nextNode: '',
      jigou: [],
      // 机构类型
      otcssOption: [],
      otdOption: [],
      loading: null

    }
  },
  computed: {
    ...mapGetters(['riid', 'businessFlag', 'rolecode']),
    // 上传地址
    actionUrl() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riid}&extend1=${this.riidNum}&ownSystem=1&ownBusiness=nifaReport`
    },
    actionUrl2() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riid}&extend1=${this.riidNum}&ownSystem=2&ownBusiness=nifaReport`
    },
    actionUrl3() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riid}&extend1=${this.riidNum}&ownSystem=3&ownBusiness=nifaReport`
    },
    actionUrl4() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riid}&extend1=${this.riidNum}&ownSystem=4&ownBusiness=nifaReport`
    },
    actionUrl5() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riid}&extend1=${this.riidNum}&ownSystem=5&ownBusiness=nifaReport`
    },
    actionUrl6() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riid}&extend1=${this.riidNum}&ownSystem=6&ownBusiness=nifaReport`
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
              this.vivw()
              if (this.status === '0') {
                this.$message({
                  message: '提交审核成功',
                  type: 'success'
                })
              }
            }).catch(() => {
              this.loading.close()
            })
          } else {
            upData(this.paramsObj).then(res => {
              this.loading.close()
              this.vivw()
              this.$message({
                message: '保存成功',
                type: 'success'
              })
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
    getClock('C5000000').then(res => {
      this.jigou = res
    })
    this.$nextTick(function() {
      this.riidNum = getUUIDWG()
      this.vivw()
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
    erroeChange(e) {
      e.isShow = false
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    nextStep() {
      this.remnant = 0
      this.remnant2 = 0
      this.$refs.upload.submit()
      this.$refs.upload2.submit()
      this.$refs.upload3.submit()
      this.$refs.upload4.submit()
      this.$refs.upload5.submit()
      this.$refs.upload6.submit()
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
    xiugai() {
      this.isxiu = false
    },
    isTrue() {
      if (this.form.currentState !== '初审待审核' && this.form.currentState !== '复审待审核' && this.form.currentState !== '已备案') {
        return false
      } else {
        return true
      }
    },
    registerChange(val) {
      this.form.registerProvince = String(val[0])
      this.form.registerCity = String(val[1])
      this.form.registerArea = String(val[2])
    },
    vivw() {
      this.isxiu = true
      this.flag = true
      this.flag2 = true
      this.flag3 = true
      this.flag4 = true
      this.flag5 = true
      this.flag6 = true
      this.flag7 = true
      for (var key in this.rules) {
        if (key !== 'riam' && key !== 'ozcd' && key !== 'ficd' && key !== 'lei' && key !== 'fblia' && key !== 'fblc' && key !== 'opnm' && key !== 'quartersName' && key !== 'departName' && key !== 'fbln') {
          this.rules[key][0].required = true
        }
      }
      registVivw(this.riid).then(res => {
        for (var key in res) {
          this.form[key] = res[key]
        }
        this.isRequired(this.form.ficp)
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
        this.fileList4 = []
        this.fileList5 = []
        this.fileList6 = []
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
          } else if (element.ownSystem === '2') {
            this.fileList2.push({
              url: element.preview,
              name: element.originalName,
              fileID: element.attachId,
              isShow: true
            })
            this.form.fileName2 = element.originalName
          } else if (element.ownSystem === '3') {
            this.form.fileName3 = element.originalName
            this.fileID3 = element.attachId
          } else if (element.ownSystem === '4') {
            this.fileList4.push({
              name: element.originalName,
              fileID: element.attachId
            })
            this.form.fileName4 = element.originalName
          } else if (element.ownSystem === '5') {
            this.fileList5.push({
              name: element.originalName,
              fileID: element.attachId
            })
            this.form.fileName5 = element.originalName
          } else if (element.ownSystem === '6') {
            this.fileList6.push({
              name: element.originalName,
              fileID: element.attachId
            })
            this.form.fileName6 = element.originalName
          } else if (element.ownSystem === '12') {
            this.fileList7.push({
              name: element.originalName,
              fileID: element.attachId
            })
            this.form.fileName6 = element.originalName
          }
        })
      })
    },
    fileDownload() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID}`
    },
    fileDownload2(file) {
      location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
    },
    fileDownload3() {
      location.href = `nifa-autonomy-file/upload/download/${this.fileID3}`
    },
    fileDownload4(file) {
      if (file.fileID) {
        location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
      }
    },
    fileDownload5(file) {
      if (file.fileID) {
        location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
      }
    },
    fileDownload6(file) {
      if (file.fileID) {
        location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
      }
    },
    fileDownload7(file) {
      if (file.fileID) {
        location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
      }
    },
    // 清文件名字
    clearFile(file) {
      this.form.fileName = ''
      this.$refs.upload.clearFiles()
      if (this.fileID) {
        this.fileIdArr.push(this.fileID)
        this.fileID = ''
      }
    },
    clearFile2(file, fileList) {
      this.$refs.upload2.uploadFiles.splice(this.$refs.upload2.uploadFiles.indexOf(file), 1)
      if (this.$refs.upload2.uploadFiles.length > 0) {
        this.form.fileName2 = this.$refs.upload2.uploadFiles[0].name
      } else {
        this.form.fileName2 = ''
      }
      if (file.fileID) {
        this.fileIdArr.push(file.fileID)
      }
    },
    clearFile3() {
      this.form.fileName3 = ''
      this.$refs.upload3.clearFiles()
      if (this.fileID3) {
        this.fileIdArr.push(this.fileID3)
        this.fileID3 = ''
      }
    },
    clearFile4(file, fileList) {
      if (fileList.length > 0) {
        this.form.fileName4 = fileList[0].name
      } else {
        this.form.fileName4 = ''
      }
      if (file.fileID) {
        this.fileIdArr.push(file.fileID)
      }
    },
    clearFile5(file, fileList) {
      if (fileList.length > 0) {
        this.form.fileName5 = fileList[0].name
      } else {
        this.form.fileName5 = ''
      }
      if (file.fileID) {
        this.fileIdArr.push(file.fileID)
      }
    },
    clearFile6(file, fileList) {
      if (fileList.length > 0) {
        this.form.fileName6 = fileList[0].name
      } else {
        this.form.fileName6 = ''
      }
      if (file.fileID) {
        this.fileIdArr.push(file.fileID)
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
    handleProgress4(event, file, fileList) {
      if (this.flag4) {
        fileList.forEach(element => {
          if (element.fileID === undefined) {
            this.remnant2 += 1
            this.flag4 = false
          }
        })
      }
    },
    handleProgress5(event, file, fileList) {
      if (this.flag5) {
        fileList.forEach(element => {
          if (element.fileID === undefined) {
            this.remnant2 += 1
            this.flag5 = false
          }
        })
      }
    },
    handleProgress6(event, file, fileList) {
      if (this.flag6) {
        fileList.forEach(element => {
          if (element.fileID === undefined) {
            this.remnant2 += 1
            this.flag6 = false
          }
        })
      }
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
      if (fileList.length > 0) {
        this.form.fileName2 = fileList[0].name
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
        this.$refs.upload3.clearFiles()
        return false
      }
      if (!Authorized(file)) {
        this.form.fileName3 = ''
        this.$refs.upload3.clearFiles()
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
      this.form.fileName3 = ''
      this.flag3 = true
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
      if (fileList.length > 0) {
        this.form.fileName4 = fileList[0].name
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
    handleExceed4() {
      this.$message.error('最多只能选择30个文件!')
    },
    // 文件上传失败回调
    handleAvatarerr4() {
      this.remnant -= 1
      this.loading.close()
      this.form.fileName4 = ''
      this.flag4 = true
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
      if (fileList.length > 0) {
        this.form.fileName5 = fileList[0].name
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
      this.form.fileName5 = ''
      this.flag5 = true
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
      if (fileList.length > 0) {
        this.form.fileName6 = fileList[0].name
      }
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
    handleExceed6() {
      this.$message.error('最多只能选择30个文件!')
    },
    // 文件上传失败回调
    handleAvatarerr6() {
      this.remnant -= 1
      this.loading.close()
      this.form.fileName6 = ''
      this.flag6 = true
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
    // 获取级联菜单的label
    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.value === value) { opt = itm.children; return itm }
        }
        return null
      })
    },
    // 提交审核
    handlerSubmit(formName, type) {
      for (var key in this.rules) {
        if (key !== 'riam' && key !== 'ozcd' && key !== 'ficd' && key !== 'lei' && key !== 'fblia' && key !== 'fblc' && key !== 'opnm' && key !== 'quartersName' && key !== 'departName' && key !== 'fbln') {
          this.rules[key][0].required = true
        }
      }
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
              this.nextNodeData = res.flowNextNode.nextNodes
              getUsers(this.nextNodeAll).then(res => {
                this.nextUserAll = res
                this.workFlowParams = Object.assign({}, this.nextUserAll)
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
      for (var key in this.rules) {
        if (key !== 'rinm' && key !== 'monitorName' && key !== 'managerTel' && key !== 'succ' && key !== 'fileName3' && key !== 'ficp') {
          this.rules[key][0].required = false
        }
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = this.$loading({
            lock: true
          })
          this.status = type
          delete this.form.flowType
          delete this.paramsObj.workflow
          delete this.paramsObj.currentState
          this.remnant = 0
          this.remnant2 = 0
          this.$refs.upload.submit()
          this.$refs.upload2.submit()
          this.$refs.upload3.submit()
          this.$refs.upload4.submit()
          this.$refs.upload5.submit()
          this.$refs.upload6.submit()
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
.registerStyleJ{
   .hide .el-upload--picture-card {
    display: none;
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
    .el-upload{
        .el-button--primary.is-disabled{
       color: #ffffff;
       background: #409eff;
     }
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
