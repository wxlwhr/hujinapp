<template>
  <el-card class="AppRegistration AuthenticationTest">
    <div slot="header" class="clearfix btnCard">
      <span>科技产品信息</span>
    </div>
    <el-alert
      :closable="false"
      title="说明：产品与服务信息相关内容及数据均由服务商提供。"
      style="height:35px;width:1100px;margin:12px auto"
      type="info"
    />
    <el-form ref="form" :model="form" :rules="rules" :disabled="true">
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">产品与服务信息</legend>
        <el-row :gutter="20" style="margin:20px 30px 0 30px">
          <el-col :span="8">
            <el-form-item label="名称" prop="productName">
              <el-input
                v-model.trim="form.productName"
                placeholder="请输入"
                clearable
                maxlength="18"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型" prop="productType">
              <el-input v-model.trim="form.productType" placeholder="请选择" clearable />
            </el-form-item>
          </el-col>
          <el-col v-if="$store.getters.srnm === '3' || $store.getters.srnm === ''" :span="8">
            <el-form-item label="联系人" prop="productPeople">
              <el-input v-model.trim="form.productPeople" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="$store.getters.srnm === '3' || $store.getters.srnm === ''" :gutter="20" style="margin:20px 30px 0 30px">
          <el-col :span="8">
            <el-form-item label="联系方式" prop="productTel">
              <el-input v-model.trim="form.productTel" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="24">
            <el-form-item
              label="简介"
              prop="productSynopsis"
            >
              <el-input
                v-model="form.productSynopsis"
                rows="5"
                placeholder="请输入"
                style="width:100%"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="24">
            <el-form-item
              label="应用介绍"
              prop="productIntroduction"
            >
              <el-input
                v-model="form.productIntroduction"
                rows="5"
                placeholder="请输入"
                style="width:100%"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="24">
            <el-form-item
              label="监管要求"
              prop="tableDataSelect1"
            >
              <el-table
                height="200px"
                :data="tableDataSelect1"
              >
                <el-table-column label="摸排序号" prop="gistNum" type="index" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.gistNum?scope.row.gistNum:'--' }}
                  </template>
                </el-table-column>
                <el-table-column prop="superType" label="项目类型" show-overflow-tooltip />
                <el-table-column prop="keyPoint" label="要点" show-overflow-tooltip />
              <!-- <el-table-column label="操作" min-width="50">
                <template slot-scope="scope">
                  <el-button type="text" :disabled="scope.row.disable" @click="addSelected(scope.row)">添加</el-button>
                </template>
              </el-table-column> -->
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form v-if="$store.getters.srnm !== '3' && $store.getters.srnm !== ''" ref="form" :model="form" label-position="top">
          <el-row :gutter="20" style="margin: 0 30px">
            <el-col :span="24">
              <el-form-item
                label="联系方式"
                label-position="top"
              >
                <el-button type="primary" :disabled="false" @click="getLianxi">立即获取</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </fieldset>
      <fieldset v-if="isShowgs" class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">机构基本信息</legend>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="统一社会信用代码" prop="succ">
              <el-input
                v-model.trim="form2.succ"
                placeholder=""
                clearable
                maxlength="18"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构名称" prop="rinm">
              <el-input v-model.trim="form2.rinm" placeholder="" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构简称" prop="riam">
              <el-input v-model.trim="form2.riam" placeholder="" clearable />
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
                v-model.trim="form2.ozcd"
                placeholder=""
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
                v-model="form2.registerAddr"
                :options="registerAddrArr"
                clearable
                style="width:100%"
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
                v-model.trim="form2.officeAddr"
                placeholder=""
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
        >
          <el-col
            v-if="$store.getters.srnm !== '0'"
            :span="8"
          >
            <el-form-item
              label="联系人"
              prop="monitorName"
            >
              <el-input
                v-model.trim="form2.monitorName"
                placeholder=""
                clearable
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col v-if="$store.getters.srnm === '0'" :span="8">
            <el-form-item label="官网地址" prop="websit">
              <el-input v-model="form2.websit" placeholder="" clearable />
            </el-form-item>
          </el-col>
          <el-col v-if="$store.getters.srnm === '0'" :span="8">
            <el-form-item label="成立时间" prop="crTime">
              <el-date-picker
                v-model="form2.crTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col
            v-if="$store.getters.srnm !== '0'"
            :span="8"
          >
            <el-form-item
              label="联系方式"
              prop="managerTel"
            >
              <el-input
                v-model.trim="form2.managerTel"
                placeholder=""
                clearable
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否会员" prop="isMemberCifa">
              <el-select v-model="form2.isMemberCifa" placeholder="">
                <el-option
                  v-for="item in huiyuanArr"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-if="$store.getters.srnm !== '0'" :span="8">
            <el-form-item label="官网地址" prop="websit">
              <el-input v-model="form2.websit" placeholder="" clearable />
            </el-form-item>
          </el-col>
          <el-col v-if="$store.getters.srnm !== '0'" :span="8">
            <el-form-item label="单位联系邮箱" prop="email">
              <el-input v-model="form2.email" placeholder="" clearable />
            </el-form-item>
          </el-col>
          <el-col v-if="$store.getters.srnm !== '0'" :span="8">
            <el-form-item label="成立时间" prop="crTime">
              <el-date-picker
                v-model="form2.crTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder=""
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="公司简介" prop="bussScope">
              <el-input v-model="form2.bussScope" type="textarea" :rows="3" placeholder="" maxlength="500" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="资质荣誉" prop="mainNetBuss">
              <el-input v-model="form2.mainNetBuss" type="textarea" :rows="3" placeholder="" maxlength="500" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="$store.getters.srnm !== '0'" :gutter="20">
          <el-col :span="12">
            <el-form-item label="公司Logo" prop="fileName2" class="radio_enter">
              <el-image
                v-if="urlG"
                style="width: 120px; height: 120px;border-radius: 6px 6px;"
                :src="urlG"
                :preview-src-list="srcListY"
              >
                <div slot="error" class="el-image__error" style="cursor:pointer;color:#333" @click="fileDownload()">
                  <pdf
                    v-if="testmsgY==='pdf'"
                    :src="urlG"
                    :page="1"
                  />
                  <span v-else>格式不支持预览<br>请点击下载</span>
                </div>
              </el-image>
              <div v-else>
                <p class="el-button" style="width: 120px;height: 120px;line-height: 100px;" @click="loctionClick">刷新图片</p>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照扫描件" prop="fileName" class="radio_enter">
              <el-image
                v-if="urlY"
                style="width: 120px; height: 120px;border-radius: 6px 6px;"
                :src="urlY"
                :preview-src-list="srcListY"
              >
                <div slot="error" class="el-image__error" style="cursor:pointer;color:#333" @click="fileDownload()">
                  <pdf
                    v-if="testmsgY==='pdf'"
                    :src="urlY"
                    :page="1"
                  />
                  <span v-else>格式不支持预览<br>请点击下载</span>
                </div>
              </el-image>
              <div v-else>
                <p class="el-button" style="width: 120px;height: 120px;line-height: 100px;" @click="loctionClick">刷新图片</p>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset v-show="(statusMess.length>0 && $store.getters.srnm !== '0') && !($route.query.diaoyu && $route.query.diaoyu === true)" class="fieldsetStyle">
        <legend style="margin-left: 40px;font-size:17px">审核记录</legend>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="24">
            <el-table :data="statusMess" tooltip-effect="dark" style="width:100%">
              <el-table-column label="审核机构" prop="auditUser" min-width="120" show-overflow-tooltip />
              <el-table-column label="审核人" prop="auditUserName" min-width="100" show-overflow-tooltip />
              <!-- <el-table-column label="审核阶段" prop="currentState" min-width="120" show-overflow-tooltip /> -->
              <el-table-column label="审核意见" prop="remark" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.remark?scope.row.remark:'--' }}
                </template>
              </el-table-column>
              <el-table-column label="审核时间" prop="auditTime" min-width="120" show-overflow-tooltip />
            </el-table>
          </el-col>
        </el-row>
      </fieldset>
      <fieldset v-show="(dismountMess.length>0 && $store.getters.srnm !== '0') && !($route.query.diaoyu && $route.query.diaoyu === true)" class="fieldsetStyle">
        <legend style="margin-left: 40px;font-size:17px">其他信息</legend>
        <el-row :gutter="20" style="margin: 0 30px">
          <el-col :span="24">
            <el-table :data="dismountMess" tooltip-effect="dark" style="width:100%">
              <el-table-column label="操作人" prop="auditUserName" min-width="120" show-overflow-tooltip />
              <el-table-column label="操作" prop="currentState" min-width="100" show-overflow-tooltip />
              <el-table-column label="备注" prop="remark" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.remark?scope.row.remark:'--' }}
                </template>
              </el-table-column>
              <el-table-column label="操作时间" prop="auditTime" min-width="120" show-overflow-tooltip />
            </el-table>
          </el-col>
        </el-row>

      </fieldset>
    </el-form>
    <el-dialog :visible.sync="centerDialogVisible" title="审核意见" width="60%" center>
      <hr class="hrStyle">
      <br>
      <div style="padding: 0 20px">
        <el-form ref="reportForm" :model="reportForm" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="意见" prop="comment">
                <el-input v-model="reportForm.comment" :rows="5" type="textarea" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isReasonable('reportForm')">提 交</el-button>
        <el-button @click="centerDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <div>
      <el-row style="text-align:center;">
        <el-col :span="24">
          <el-button v-if="$store.getters.srnm === '' && this.$route.query.from === '2'" type="primary" @click="pass">审核通过</el-button>
          <el-button v-if="$store.getters.srnm === '' && this.$route.query.from === '2'" type="primary" @click="canNotPass">审核不通过</el-button>
          <el-button type="primary" @click="goBack">返回</el-button>
        </el-col>
      </el-row>
    </div>
    <workflow />
    <el-dialog
      title="接收联系方式的手机号（可修改）"
      :visible.sync="centerDialogVisible1"
      width="30%"
      center
    >
      <div style="width:100%;text-align:center">
        <el-input v-model.trim="phoneNum" clearable style="width:80%" placeholder="请输入内容" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="getPhoneSure">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { getClock } from '@/api/general.js'
import { commonValidate2 } from '@/utils/formValidate'
import { queryMonitor, getPhone, phone, shenhe, productauditlog, superversion } from '@/api/TechnologyProducts.js'
import { registVivw, HXSearchFil } from '@/api/register/register.js'
import { getAdrr } from '@/api/general.js'
export default {
  data() {
    return {
      productTypeList: [],
      tableDataSelect1: [],
      phoneNum: '',
      dataId: '',
      dismountMess: [],
      statusMess: [],
      productThumb: '12',
      centerDialogVisible1: false,
      centerDialogVisible: false,
      isShowgs: false,
      urlY: false,
      urlG: false,
      srcListY: [],
      huiyuanArr: [
        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        }
      ],
      registerAddrArr: [],
      testmsgY: '',
      form2: {
        srnm: '', // 机构类型
        // osnm: '',
        // 文件
        fileName: '',
        fileName2: '',
        fileName14: '',
        fileName3: '',
        fileName4: '',
        fileName5: '',
        fileName6: '',
        fileName7: '',
        // 表单数据
        ficp: '', // 机构类别
        verCode: '', // 验证码
        password: '', // 确认登录密码
        succ: '', // 统一社会信用代码
        ficd: '', // 金融机构编码（如有）
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
        email: '',
        managerTel: '', // 联系方式
        quartersName: '', // 子公司数量
        departName: '', // 分公司数量
        setPassword: '', // 设置登录密码
        rinm: '', // 机构名称
        riam: '', // 机构简称
        riid: '',
        websit: '', // 网址
        crTime: '', // 成立时间
        bussScope: '', // 简介
        isMemberCifa: '', // 是否会员
        mainNetBuss: '', // 资质
        buildTime: '2019-11-18'
      },
      form: {
        productName: '',
        productType: '',
        productPeople: '',
        productTel: '',
        productSynopsis: '',
        productIntroduction: '',
        attr2: ''
      },
      reportForm: {
        comment: ''
      },
      rules: {
        productSynopsis: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        productIntroduction: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        tableDataSelect1: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        comment: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        productType: [{ required: true, message: '请选择', trigger: 'change' }],
        productName: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        productPeople: [{ required: true, message: '内容不能为空且最多50个字符', trigger: 'blur', max: 50 }, { validator: commonValidate2, trigger: 'blur' }],
        productTel: [{ required: true, pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }]
      },
      shenTips: ''
    }
  },
  computed: {
    paramsObj() {
      const obj = Object.assign({}, this.form)
      return obj
    }
  },
  mounted() {
    getClock('C5900000').then(res => {
      this.productTypeList = res
      this.getMsg()
      this.getProductauditlog()
    })
    if (this.$route.query.type) {
      this.isShowgs = true
    }
    console.log(77, this.$route.query)

    this.dataId = this.$route.query.id
  },
  methods: {
    getProductauditlog() {
      productauditlog(this.$route.query.id).then(res => {
        res.map(item => {
          if (item.pkId === '1') {
            this.dismountMess.push(item)
          } else {
            this.statusMess.push(item)
          }
        })
      })
    },
    pass() {
      this.shenTips = '同意'
      this.reportForm.comment = '同意'
      this.centerDialogVisible = true
    },
    canNotPass() {
      this.shenTips = '不同意'
      this.centerDialogVisible = true
    },
    fileDownload() {
      if (this.testmsgY === 'pdf') {
        this.$refs.referencePdf.open(this.urlY, this.fileID)
      } else {
        location.href = `nifa-autonomy-file/upload/download/${this.fileID}`
      }
    },
    getLianxi(data) {
      phone(this.$route.query.id).then(res => {
        this.phoneNum = res.phone
      })
      this.centerDialogVisible1 = true
    },
    getPhone(data) {
      this.id = data.id
      phone(data.id).then(res => {
        this.phoneNum = res.phone
      })
      this.centerDialogVisible1 = true
    },
    getPhoneSure() {
      getPhone({ id: this.$route.query.id, phone: this.phoneNum }).then(res => {
        this.$message({
          type: 'success',
          message: '获取成功,请注意查收短信'
        })
        this.centerDialogVisible1 = false
      })
    },
    loctionClick() {
      HXSearchFil(this.$route.query.riid).then(res => {
        this.srcListY = []
        this.srcListG = []
        this.srcListS = []
        this.fileList7 = []
        this.fileList2 = []
        this.fileList4 = []
        this.fileList5 = []
        this.fileList6 = []
        res.forEach(element => {
          if (element.ownSystem === '1') {
            this.form.fileName = element.originalName
            this.fileID = element.attachId
            this.urlY = element.preview
            this.testmsgY = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
            this.srcListY.push(element.preview)
          } else if (element.ownSystem === '14') {
            this.form.fileName14 = element.originalName

            this.urlG = element.preview
            this.srcListG.push(element.preview)
          } else if (element.ownSystem === '2') {
            this.fileList2.push(
              {
                name: element.originalName,
                testmsg: (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase(),
                url: element.preview,
                fileID: element.attachId,
                srcList: [element.preview]
              }
            )
          } else if (element.ownSystem === '3') {
            this.form.fileName3 = element.originalName
            this.fileID3 = element.attachId
            this.urlS = element.preview
            this.testmsgS = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
            this.srcListS.push(element.preview)
          } else if (element.ownSystem === '4') {
            this.fileList4.push(
              {
                originalName: element.originalName,
                fileID: element.attachId
              }
            )
          } else if (element.ownSystem === '5') {
            this.fileList5.push(
              {
                originalName: element.originalName,
                fileID: element.attachId
              }
            )
          } else if (element.ownSystem === '6') {
            this.fileList6.push(
              {
                originalName: element.originalName,
                fileID: element.attachId
              }
            )
          } else if (element.ownSystem === '12') {
            this.fileList7.push(
              {
                originalName: element.originalName,
                fileID: element.attachId
              }
            )
          }
        })
      })
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
    },
    claimButton() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          this.centerDialogVisible = true
        }
      })
    },
    isReasonable(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const auditStatus = this.shenTips === '同意' ? '1' : '2'
          shenhe({ id: this.$route.query.id, auditStatus, remark: this.reportForm.comment }).then(res => {
            this.centerDialogVisible = false
            this.reportForm.comment = ''
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.goBack()
          })
        } else {
          return false
        }
      })
    },
    submitWorkflow() {},
    getMsg() {
      superversion(this.$route.query.id).then(res => {
        this.tableDataSelect1 = res
      })
      queryMonitor(this.$route.query.id).then(res => {
        this.form = res
        this.form.productType = this.productTypeList.filter(item => item.codeKey === this.form.productType)[0].codeValue
      })
      if (this.$route.query.riid) {
        registVivw(this.$route.query.riid).then(res => {
          for (var key in res) {
            this.form2[key] = res[key]
          }
          this.form2.registerAddr = []
          if (this.form2.registerArea) {
            this.form2.registerAddr[0] = Number(this.form2.registerProvince)
            this.form2.registerAddr[1] = Number(this.form2.registerCity)
            this.form2.registerAddr[2] = Number(this.form2.registerArea)
          }
        // registRiid(res.riid).then(res => {
        //   this.statusMess = res
        // })
        })
        HXSearchFil(this.$route.query.riid).then(res => {
          this.srcListY = []
          this.srcListG = []
          this.srcListS = []
          this.fileList7 = []
          this.fileList2 = []
          this.fileList4 = []
          this.fileList5 = []
          this.fileList6 = []
          res.forEach(element => {
            if (element.ownSystem === '1') {
              this.form.fileName = element.originalName
              this.fileID = element.attachId
              this.urlY = element.preview
              this.testmsgY = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
              this.srcListY.push(element.preview)
            } else if (element.ownSystem === '14') {
              this.form.fileName14 = element.originalName

              this.urlG = element.preview
              this.srcListG.push(element.preview)
            } else if (element.ownSystem === '2') {
              this.fileList2.push(
                {
                  name: element.originalName,
                  testmsg: (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase(),
                  url: element.preview,
                  fileID: element.attachId,
                  srcList: [element.preview]
                }
              )
            } else if (element.ownSystem === '3') {
              this.form.fileName3 = element.originalName
              this.fileID3 = element.attachId
              this.urlS = element.preview
              this.testmsgS = (element.originalName.substring(element.originalName.lastIndexOf('.') + 1)).toLowerCase()
              this.srcListS.push(element.preview)
            } else if (element.ownSystem === '4') {
              this.fileList4.push(
                {
                  originalName: element.originalName,
                  fileID: element.attachId
                }
              )
            } else if (element.ownSystem === '5') {
              this.fileList5.push(
                {
                  originalName: element.originalName,
                  fileID: element.attachId
                }
              )
            } else if (element.ownSystem === '6') {
              this.fileList6.push(
                {
                  originalName: element.originalName,
                  fileID: element.attachId
                }
              )
            } else if (element.ownSystem === '12') {
              this.fileList7.push(
                {
                  originalName: element.originalName,
                  fileID: element.attachId
                }
              )
            }
          })
        })
        getAdrr().then(res => {
          this.registerAddrArr = res
        })
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
    .el-upload--picture-card{
    display: none
  }
   .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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
  .radio_enter {
    > label {
      width: 100%;
      text-align: left;
    }
  }
  .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width:150px;
    height:150px
  }
}
</style>
