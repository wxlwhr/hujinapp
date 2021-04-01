<template>
  <el-card class="affStyle">
    <div slot="header" class="clearfix btnCard">
      <span>机构信息关联</span>
      <div class="elCardBtnBox">
        <el-button type="primary" :disabled="disNum > 2" @click="Relatedjg">关联总部机构</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick(activeName)">
      <el-tab-pane label="我关联的" name="1">
        <div class="search">
          <el-form ref="auditFormb" :model="auditFormb" :rules="rules" label-width="140px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditFormb.rinm" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码" prop="succ">
                  <el-input v-model="auditFormb.succ" placeholder="统一社会信用代码" clearable maxlength="50" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormb('auditFormb')">查 询</el-button>
                <el-button @click="clearAuditFormb('auditFormb')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatab"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip />
          <el-table-column prop="succ" label="统一社会信用代码" show-overflow-tooltip />
          <el-table-column prop="monitorName" label="机构联系人" show-overflow-tooltip />
          <el-table-column prop="managerTel" label="联系方式" show-overflow-tooltip />
          <el-table-column prop="isPass" label="关联状态" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goOpen(scope.row.blockchainHash)">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="审核意见" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.remarks === ''?'--':scope.row.remarks }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button :loading="isloding" :disabled="scope.row.isPass !== '审核通过'" type="text" @click="stateShenheW(scope.row)">
                取消关联
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfob.pageNumber"
          :page-size="pageInfob.pageSize"
          :total="totalb"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeb"
          @current-change="handleCurrentChangeb"
        />
      </el-tab-pane>
      <el-tab-pane label="关联我的" name="0">
        <div class="search">
          <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="140px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model="auditForm.rinm" placeholder="机构名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="关联状态" prop="isPass">
                  <el-select v-model="auditForm.isPass" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in statusArr"
                      :key="item.codeKey"
                      :label="item.codeLabel"
                      :value="item.codeValue"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码" prop="succ">
                  <el-input v-model="auditForm.succ" placeholder="统一社会信用代码" clearable maxlength="50" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditForm('auditForm')">查 询</el-button>
                <el-button @click="clearAuditForm('auditForm')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableData"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip />
          <el-table-column prop="succ" label="统一社会信用代码" show-overflow-tooltip />
          <el-table-column prop="monitorName" label="机构联系人" show-overflow-tooltip />
          <el-table-column prop="managerTel" label="联系方式" show-overflow-tooltip />
          <el-table-column prop="isPass" label="关联状态" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goOpen(scope.row.blockchainHash)">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.isPass !== '待确认'" type="text" @click="stateShenhe(scope.row,'0')">
                审核
              </el-button>
              <el-button :loading="isloding" :disabled="scope.row.isPass !== '审核通过'" type="text" @click="stateShenhe(scope.row,'1')">
                取消关联
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfo.pageNumber"
          :page-size="pageInfo.pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangea"
          @current-change="handleCurrentChangea"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="centerDialogVisible" title="选择总部机构" width="60%" center>
      <hr class="hrStyle">
      <br>
      <div style="padding: 0 20px">
        <el-form ref="reportForm" :model="reportForm" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-col :span="24">
                <el-form-item label="总部机构" prop="osnm">
                  <el-select
                    v-model="reportForm.osnm"
                    filterable
                    remote
                    clearable
                    reserve-keyword
                    placeholder="请输入关键词搜索"
                    :remote-method="remoteMethod"
                  >

                    <el-option
                      v-for="item in options"
                      :key="item.riid"
                      :label="item.rinm"
                      :value="item.riid"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="isloding" type="primary" @click="isReasonable('reportForm')">提 交</el-button>
        <el-button @click="centerDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="centerDialogOne" title="关联信息审核" width="60%" center style="margin-bottom:3vh">
      <hr class="hrStyle">
      <br>
      <div style="padding: 0 20px">
        <el-form ref="form" :model="form" :rules="rules" class="basic-form">
          <fieldset class="jgxqStyle">
            <legend style="margin-left: 40px; font-size:17px">机构基本信息</legend>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="统一社会信用代码" prop="succ">
                  <el-input
                    v-model.trim="form.succ"
                    placeholder="请输入"
                    maxlength="18"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="机构名称" prop="rinm">
                  <el-input v-model.trim="form.rinm" placeholder="机构名称" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="机构简称" prop="riam">
                  <el-input v-model.trim="form.riam" placeholder="机构简称" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="组织机构代码（如有）"
                  prop="ozcd"
                >
                  <el-input
                    v-model.trim="form.ozcd"
                    placeholder="请输入"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col
                :span="12"
              >
                <el-form-item
                  label="金融机构编码（如有）"
                  prop="ficd"
                >
                  <el-input
                    v-model.trim="form.ficd"
                    placeholder="编码"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="12"
              >
                <el-form-item
                  label="LEI码（如有）"
                  prop="lei"
                >
                  <el-input
                    v-model.trim="form.lei"
                    placeholder="请输入"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col
                :span="12"
              >
                <el-form-item
                  label="法人机构注册地区"
                  prop="registerAddr"
                >
                  <el-cascader
                    v-model="form.registerAddr"
                    :options="registerAddrArr"
                    style="width:100%"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="12"
              >
                <el-form-item
                  label="详细地址"
                  prop="officeAddr"
                >
                  <el-input
                    v-model.trim="form.officeAddr"
                    placeholder="详细地址"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="机构类别"
                  prop="ficp"
                >
                  <el-select v-model="form.ficp" placeholder="请选择" disabled>
                    <el-option
                      v-for="item in jigou"
                      :key="item.codeKey"
                      :label="item.codeValue"
                      :value="item.codeValue"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="12"
              >
                <el-form-item
                  label="联系人"
                  prop="monitorName"
                >
                  <el-input
                    v-model.trim="form.monitorName"
                    placeholder="请输入"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col
                :span="12"
              >
                <el-form-item
                  label="联系方式"
                  prop="managerTel"
                >
                  <el-input
                    v-model.trim="form.managerTel"
                    placeholder="请输入"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位联系邮箱" prop="email">
                  <el-input v-model="form.email" placeholder="单位联系邮箱" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="分公司数量" prop="departName">
                  <el-input v-model.trim="form.departName" placeholder="分公司数量" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="子公司数量" prop="quartersName">
                  <el-input v-model.trim="form.quartersName" placeholder="子公司数量" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="持有金融业务许可证的子公司数量" prop="fbln">
                  <el-input v-model.trim="form.fbln" placeholder="持有金融业务许可证的子公司数量" disabled />
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
          <fieldset class="jgxqStyle">
            <legend style="margin-left: 40px; font-size:17px">审核意见</legend>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="意见" prop="remarks">
                  <el-input v-model="form.remarks" :rows="5" type="textarea" placeholder="请输入" />
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>

        <!-- 结束 -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShnehe('1')">审核通过</el-button>
        <el-button type="primary" @click="isShnehe('2')">审核不通过</el-button>
        <el-button @click="centerDialogOne = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogTableVisible" top="5vh" width="100%">
      <div id="block">
        <!-- <iframe :src="blockSrc" frameborder="0" /> -->
        <iframe id="china-block" :src="blockSrc" frameborder="0" marginWidth="20" marginHeight="0" width="100%" height="100%" scrolling="auto" />
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import { commonValidate2 } from '@/utils/formValidate'
import { registVivw } from '@/api/register/register.js'
import { getAdrr } from '@/api/general.js'
import { osnmOrgList, orgOsnmList, queryOsnmCount, guanlianState, certificationUnit, osnmOrgRelevance, getosnmOrg, getriidOrg } from '@/api/register/affiliates.js'
export default {
  data() {
    return {
      reportForm: {
        osnm: ''
      },
      options: [],
      loading: null,
      IsloadingA: false,
      isloding: false,
      centerDialogVisible: false,
      centerDialogOne: false,
      activeName: '1',
      disNum: 0,
      blockSrc: '',
      paramsOldA: {},
      paramsOldB: {},
      paramsObj: {},
      registerAddrArr: [],
      dialogTableVisible: false,
      jigou: [],
      form: {
        // 表单数据
        ficp: '', // 机构类别
        email: '', // 单位联系邮箱
        verCode: '', // 验证码
        password: '', // 确认登录密码
        succ: '', // 统一社会信用代码
        ficd: '', // 金融机构编码（如有）
        ozcd: '', // 组织机构代码（如有）
        fbln: '', // 持有金融业务许可证的子公司数量
        lei: '', // LEI码（如有）
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
        riid: ''
      },
      auditForm: {
        rinm: '',
        succ: '',
        isPass: '',
        riid: this.$store.getters.riid,
        sortKey: '1'
      },
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      auditFormb: {
        rinm: '',
        succ: '',
        riid: this.$store.getters.riid,
        sortKey: '1'
      },
      pageInfob: {
        pageNumber: 1,
        pageSize: 10
      },
      totalb: 0,
      rules: {
        rinm: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        remarks: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        osnm: [{ required: true, message: '请选择总部机构', trigger: 'change' }]
      },
      statusArr: [
        {
          codeKey: '0',
          codeLabel: '待确认',
          codeValue: '0'
        },
        {
          codeKey: '1',
          codeLabel: '审核通过',
          codeValue: '1'
        },
        {
          codeKey: '2',
          codeLabel: '审核未通过',
          codeValue: '2'
        },
        {
          codeKey: '3',
          codeLabel: '已失效',
          codeValue: '3'
        }
      ],
      tableData: [],
      tableDatab: []
    }
  },
  mounted() {
    this.handleClick()
    getAdrr().then(res => {
      this.registerAddrArr = res
    })
  },
  methods: {
    goOpen(blockchainHash) {
      this.dialogTableVisible = true
      this.blockSrc = `/finapp/finapp.html?txid=${blockchainHash}`
    },
    isDisabled() {
      if (this.tableDatab.length < 3) {
        return false
      } else {
        return true
      }
    },
    handleClick() {
      switch (this.activeName) {
        case '0':
          this.getAuditForm()
          break
        case '1':
          this.getAuditFormb()
          break
      }
      queryOsnmCount({ riid: this.$store.getters.riid }).then(res => {
        this.disNum = res
      })
    },
    shenheVivw(riid) {
      registVivw(riid).then(res => {
        for (var key in res) {
          this.form[key] = res[key]
        }
        this.form.registerAddr = []
        this.form.registerAddr[0] = Number(this.form.registerProvince)
        this.form.registerAddr[1] = Number(this.form.registerCity)
        this.form.registerAddr[2] = Number(this.form.registerArea)
      })
    },
    remoteMethod(query) {
      certificationUnit({ 'osnm': query }).then(res => {
        this.options = res
      })
    },
    Relatedjg() {
      this.centerDialogVisible = true
      this.options = []
      this.$nextTick(() => {
        this.$refs['reportForm'].resetFields()
      })
    },
    isReasonable(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isloding = true
          osnmOrgRelevance({ riid: this.$store.getters.riid, osnm: this.reportForm.osnm, remarks: '' }).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.centerDialogVisible = false
            this.handleClick()
            this.isloding = false
          }).catch(() => {
            this.isloding = false
          })
        } else {
          return false
        }
      })
    },
    isShnehe(type) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm('是否确定该操作', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.loading = this.$loading({
              lock: true
            })
            this.paramsObj.pass = type
            this.paramsObj.remarks = this.form.remarks
            guanlianState(this.paramsObj).then(res => {
              this.loading.close()
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.centerDialogOne = false
              this.handleClick()
            }).catch(() => {
              this.loading.close()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消更改'
            })
          })
        } else {
          return false
        }
      })
    },
    stateShenheW(val, type) {
      this.isloding = true
      getosnmOrg({ riid: this.$store.getters.riid, osnmId: val.riid }).then(res => {
        if (res === 0) {
          this.paramsObj = {
            riid: this.$store.getters.riid,
            osnm: val.riid,
            rinm: this.$store.getters.rinm,
            flag: '1',
            remarks: ''
          }
          this.$confirm('是否确定取消关联', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.paramsObj.pass = '3'
            guanlianState(this.paramsObj).then(res => {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.handleClick()
              this.isloding = false
            }).catch(() => {
              this.isloding = false
            })
          }).catch(() => {
            this.isloding = false
            this.$message({
              type: 'info',
              message: '已取消更改'
            })
          })
        } else {
          this.isloding = false
          this.$message.error('关联该总部机构备案的App未完成注销')
        }
      }).catch(() => {
        this.isloding = false
      })
    },
    stateShenhe(val, type) {
      this.paramsObj = {
        riid: val.riid,
        osnm: this.$store.getters.riid,
        rinm: this.$store.getters.rinm,
        flag: '',
        remarks: ''
      }
      if (type === '0') {
        this.shenheVivw(val.riid)
        this.centerDialogOne = true
        this.paramsObj.flag = ''
      } else {
        this.isloding = true
        getriidOrg({ riid: val.riid, osnm: this.$store.getters.riid }).then(res => {
          if (res === 0) {
            this.$confirm('是否确定取消关联', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this.paramsObj.pass = '3'
              this.paramsObj.flag = '2'
              guanlianState(this.paramsObj).then(res => {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.isloding = false
                this.handleClick()
              }).catch(() => {
                this.isloding = false
              })
            }).catch(() => {
              this.isloding = false
              this.$message({
                type: 'info',
                message: '已取消更改'
              })
            })
          } else {
            this.isloding = false
            this.$message.error('有通过“普通关联”实现备案的App未注销')
          }
        }).catch(() => {
          this.isloding = false
        })
      }
    },
    seachAuditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditForm()
        } else {
          return false
        }
      })
    },
    clearAuditForm(formName) {
      this.$refs[formName].resetFields()
      this.getAuditForm()
    },
    seachAuditFormb(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormb()
        } else {
          return false
        }
      })
    },
    clearAuditFormb(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormb()
    },
    getAuditForm() {
      this.pageInfo.pageNumber = 1
      const params = Object.assign({}, this.pageInfo, this.auditForm)
      this.IsloadingA = true
      orgOsnmList(params).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
        this.paramsOldA = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getAuditFormb() {
      this.pageInfob.pageNumber = 1
      const params = Object.assign({}, this.pageInfob, this.auditFormb)
      this.IsloadingA = true
      osnmOrgList(params).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
        this.paramsOldB = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangea(val) {
      this.paramsOldA.pageSize = val
      this.pageInfo.pageSize = val
      this.IsloadingA = true
      orgOsnmList(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangea(val) {
      this.paramsOldA.pageNumber = val
      this.pageInfo.pageNumber = val
      this.IsloadingA = true
      orgOsnmList(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangeb(val) {
      this.paramsOldB.pageSize = val
      this.pageInfob.pageSize = val
      this.IsloadingA = true
      osnmOrgList(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeb(val) {
      this.paramsOldB.pageNumber = val
      this.pageInfob.pageNumber = val
      this.IsloadingA = true
      osnmOrgList(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    }
  }
}
</script>
<style lang="scss">
.affStyle{
  .jgxqStyle{
  margin: 12px auto;
  border-color: #a2b9f0;
  border-radius: 6px 6px;
  padding: 30px 50px;
  }
  .el-dialog--center .el-dialog__body{
    padding: 0;
  }
  #block{
    iframe{
      min-height: calc(100vh - 120px);
    }
  }
}
</style>
