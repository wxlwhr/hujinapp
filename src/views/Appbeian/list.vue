<template>
  <el-card class="notice">
    <div slot="header" class="clearfix btnCard">
      <span>备案名单管理</span>
    </div>
    <div class="search">
      <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="金融机构" prop="rinm">
              <el-input v-model="auditForm.rinm" placeholder="金融机构" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应用名称" prop="appName">
              <el-input v-model="auditForm.appName" placeholder="应用名称" clearable />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="软件版本" prop="appVersion">
              <el-input v-model="auditForm.appVersion" placeholder="软件版本" clearable />
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="审核状态" prop="auditStatus">
              <el-select v-model="auditForm.auditStatus" placeholder="请选择" clearable>
                <el-option
                  v-for="item in statusArr"
                  :key="item.codeKey"
                  :label="item.codeValue"
                  :value="item.codeValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="备案编号" prop="recordNumber">
              <el-input v-model="auditForm.recordNumber" placeholder="备案编号" clearable />
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="机构类别" prop="ficp">
              <el-select v-model="auditForm.ficp" placeholder="请选择" clearable>
                <el-option
                  v-for="item in jigou"
                  :key="item.codeKey"
                  :label="item.codeValue"
                  :value="item.codeValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册地区" prop="registerAddr">
              <el-cascader
                v-model="auditForm.registerAddr"
                :options="registerAddrArr"
                :props="{ checkStrictly: true }"
                clearable
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备案日期" prop="time">
              <el-date-picker
                v-model="auditForm.time"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="可见状态" prop="otherInfo">
              <el-select v-model="auditForm.otherInfo" placeholder="请选择" clearable>
                <el-option
                  v-for="item in otherInfoArr"
                  :key="item.codeKey"
                  :label="item.codeLabel"
                  :value="item.codeValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="textRight">
            <el-button type="primary" @click="seachAuditForm('auditForm')">查 询</el-button>
            <el-button @click="clearAuditForm('auditForm')">重 置</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="textLeft">
            <el-button type="primary" @click="isShow">设置可见状态</el-button>
            <!-- <el-button type="primary" @click="AdjustOrder">调整名单顺序</el-button> -->
            <el-button type="primary" @click="goApp">备案名单查看</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br>
    <el-table v-loading="IsloadingA" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="80px" />
      <el-table-column prop="rinm" label="金融机构" show-overflow-tooltip />
      <el-table-column prop="appName" label="应用名称" show-overflow-tooltip />
      <el-table-column prop="productType" label="软件类型" show-overflow-tooltip />
      <el-table-column prop="appVersion" label="软件版本" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.appVersion===null?'--':scope.row.appVersion }}
        </template>
      </el-table-column>
      <el-table-column prop="auditStatus" label="审核状态" show-overflow-tooltip />
      <!-- <el-table-column prop="ficp" label="机构类别" show-overflow-tooltip /> -->
      <!-- <el-table-column prop="registerAddr" label="机构注册地" show-overflow-tooltip /> -->
      <el-table-column prop="auditStatus" label="备案状态" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.auditStatus==='已备案'?'已备案':'已登记' }}
        </template>
      </el-table-column>
      <el-table-column prop="recordNumberTime" label="备案日期" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.recordNumberTime===null?'--':scope.row.recordNumberTime }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="recordNumber" label="备案编号" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.recordNumber===null?'--':scope.row.recordNumber }}
        </template>
      </el-table-column> -->
      <el-table-column label="可见状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.otherInfo === "1" ? '启用': '停用' }}</span>
          <el-switch v-model="scope.row.isOpen" style="display: block" @change="stateChange(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="下载状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.downloadStatus === "1" ? '启用': '停用' }}</span>
          <el-switch v-model="scope.row.down" style="display: block" @change="stateChangeXz(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="合并项维护">
        <template slot-scope="scope">
          <el-button type="text" @click="weiHu(scope.row)">维护</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageInfo.pageNumber"
      :page-size="pageInfo.pageSize"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      title="调整可见名单顺序"
      :visible.sync="centerDialogVisible"
      width="70%"
      center
      style="margin-bottom:3vh"
    >
      <hr class="hrStyle">
      <div style="padding: 0 20px">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-alert
              :closable="false"
              title="索引值不能重复，且小的在前大的在后。"
              center
              type="warning"
            />
          </el-col>
        </el-row>
        <br>
        <el-form ref="reportForm" :model="reportForm" :rules="rules" label-width="0" class="orderStyle">
          <el-table v-loading="IsloadingA" :data="reportForm.tableDataOlder" tooltip-effect="dark">
            <el-table-column label="序号" type="index" width="70">
              <template slot-scope="scope">
                <el-form-item label-width="0">
                  {{ scope.$index+1 }}
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="应用名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-form-item label-width="0">
                  {{ scope.row.appName }}
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="调整索引">
              <template slot-scope="scope">
                <el-form-item :prop="'tableDataOlder.'+scope.$index+'.historyId'" :rules="rules.historyId">
                  调整为：<el-input v-model.number="scope.row.historyId" clearable style="width:45%" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-form-item label-width="0">
                  <el-button type="text" @click="xiugai(scope.row,'tableDataOlder.'+scope.$index+'.historyId')">确定调整</el-button>
                </el-form-item>
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
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      title="设置可见状态"
      :visible.sync="centerDialogstatus"
      width="30%"
      center
    >
      <hr class="hrStyle">
      <br>
      <div style="padding: 0 20px">
        状态：<el-radio-group v-model="radio">
          <el-radio label="1">可见</el-radio>
          <el-radio label="0">不可见</el-radio>
        </el-radio-group>
      </div>
      <br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogstatus = false">取 消</el-button>
        <el-button type="primary" @click="centerDialog()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="合并项维护"
      :visible.sync="centerDialoghbx"
      width="30%"
      center
    >
      <hr class="hrStyle">
      <br>
      <div style="padding: 0 20px">
        <el-form ref="reportFormhbx" :model="reportFormhbx" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="合并项名称" prop="otherAppName">
                <el-input v-model="reportFormhbx.otherAppName" placeholder="合并项名称" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialoghbx = false">取 消</el-button>
        <el-button type="primary" @click="isReasonable('reportFormhbx')">提 交</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { commonValidate2 } from '@/utils/formValidate'
import { getClock } from '@/api/general.js'
import { getAdrr, searchMingdan, whetheropen, recordsort, serachrecord, resetname, downloadopen } from '@/api/appbeian'
export default {
  data() {
    return {
      reportForm: {
        historyId: '',
        tableDataOlder: []
      },
      reportFormhbx: {
        id: '',
        otherAppName: ''
      },
      radio: '0',
      auditForm: {
        appName: '',
        // appVersion: '',
        auditStatus: '',
        otherInfo: '',
        // recordNumber: '',
        rinm: '',
        ficp: '',
        time: [],
        registerAddr: []
      },
      registerAddrArr: [],
      otherInfoArr: [
        {
          codeKey: '01',
          codeLabel: '启用',
          codeValue: '1'
        },
        {
          codeKey: '02',
          codeLabel: '停用',
          codeValue: '0'
        }
      ],
      SelectionArr: [],
      jigou: [],
      statusArr: [
        {
          codeKey: '01',
          codeValue: '待提交'
        },
        {
          codeKey: '02',
          codeValue: '待提交检测'
        },
        {
          codeKey: '03',
          codeValue: '认证退至金融机构'
        },
        {
          codeKey: '04',
          codeValue: '待检测'
        },
        {
          codeKey: '05',
          codeValue: '检测退至金融机构'
        },
        {
          codeKey: '06',
          codeValue: '检测退至认证机构'
        },
        {
          codeKey: '07',
          codeValue: '已检测待认证'
        },
        {
          codeKey: '08',
          codeValue: '认证退至检测机构'
        },
        {
          codeKey: '09',
          codeValue: '已认证待初审'
        },
        {
          codeKey: '16',
          codeValue: '待初审'
        },
        {
          codeKey: '10',
          codeValue: '协会退至认证机构'
        },
        {
          codeKey: '11',
          codeValue: '审核未通过'
        },
        {
          codeKey: '12',
          codeValue: '复审待审核'
        },
        {
          codeKey: '13',
          codeValue: '已备案'
        },
        {
          codeKey: '14',
          codeValue: '已注销'
        },
        {
          codeKey: '15',
          codeValue: '已过期'
        }
      ],
      IsloadingA: false,
      centerDialogVisible: false,
      centerDialogstatus: false,
      centerDialoghbx: false,
      isTrue: false,
      paramsOldA: {},
      searchData: {},
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      pageInfob: {
        pageNumber: 1,
        pageSize: 10
      },
      totalb: 0,
      loading: null,
      tableData: [],
      rules: {
        appName: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        rinm: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        otherAppName: [{ required: true, message: '请输入合并型名称', trigger: 'blur' }],
        historyId: [{ required: true, pattern: /^[0-9]+$/, message: '不能为空且只能输入数字', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getData()
    getAdrr().then(res => {
      this.registerAddrArr = res
    })
    getClock('C5000000').then(res => {
      this.jigou = res
    })
  },
  methods: {
    // App备案查
    goApp() {
      // const routeData = this.$router.resolve({
      //   name: 'list',
      //   query: {
      //     type: '0'
      //   }
      // })
      window.open('https://mftp.nifa.org.cn', '_blank')
    },
    isReasonable(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = this.$loading({
            lock: true
          })
          resetname(this.reportFormhbx).then(res => {
            this.loading.close()
            this.centerDialoghbx = false
            this.$message({
              message: '操作成功',
              duration: 1000,
              type: 'success'
            })
            this.getData('0')
          }).catch(() => {
            this.loading.close()
          })
        } else {
          return false
        }
      })
    },
    handleSelectionChange(val) {
      this.SelectionArr = []
      if (val) {
        val.forEach(row => {
          this.SelectionArr.push(row.id)
        })
      }
    },
    centerDialog() {
      this.loading = this.$loading({
        lock: true
      })
      const paramsObj = {
        id: this.SelectionArr.join(','),
        otherInfo: this.radio
      }
      whetheropen(paramsObj).then(res => {
        this.loading.close()
        this.centerDialogstatus = false
        this.$message({
          message: '操作成功',
          duration: 1000,
          type: 'success'
        })
        this.getData()
      }).catch(() => {
        this.loading.close()
      })
    },
    isShow() {
      if (this.SelectionArr.length === 0) {
        this.$message.error('请先选择数据')
      } else {
        this.centerDialogstatus = true
      }
    },
    weiHu(row) {
      this.centerDialoghbx = true
      this.reportFormhbx.otherAppName = row.otherAppName
      this.reportFormhbx.id = row.id
      this.$nextTick(() => {
        this.$refs['reportFormhbx'].clearValidate()
      })
    },
    AdjustOrder() {
      this.getpxData()
      this.centerDialogVisible = true
      this.$nextTick(() => {
        this.$refs['reportForm'].clearValidate()
      })
    },
    stateChange(val) {
      val.isOpen = !val.isOpen
      this.$confirm('是否更改可见状态', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const paramsObj = {
          id: val.id,
          otherInfo: val.otherInfo === '1' ? '0' : '1'
        }
        whetheropen(paramsObj).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更改'
        })
      })
    },
    stateChangeXz(val) {
      val.down = !val.down
      this.$confirm('是否更改下载状态', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const paramsObj = {
          id: val.id,
          downloadStatus: val.downloadStatus === '1' ? '0' : '1'
        }
        downloadopen(paramsObj).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更改'
        })
      })
    },
    // 查看
    goDetail(id) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfo
        // searchForm: this.auditForm,
      }
      this.$router.push({
        name: 'notice_detail',
        query:
        {
          searchData: JSON.stringify(this.searchData),
          id
        }
      })
    },
    xiugai(row, prop) {
      this.$refs.reportForm.validateField(prop, (errMsg) => {
        if (!errMsg) {
          recordsort({ appName: row.appName, historyId: row.historyId }).then(res => {
            this.$message({
              message: '顺序调整成功',
              type: 'success'
            })
            this.getpxData()
            this.getData()
          }).catch(() => {
            this.IsloadingA = false
            row.historyId = ''
          })
        }
      })
    },
    // 获取列表数据
    getpxData() {
      this.IsloadingA = true
      const params = Object.assign({}, this.paramsOldA, this.pageInfob)
      delete params.otherInfo
      serachrecord(params).then(res => {
        this.IsloadingA = false
        this.reportForm.tableDataOlder = res.list
        this.paramsOldB = params
        this.totalb = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getData(num) {
      if (num !== '0') {
        this.pageInfo.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfo, this.auditForm)
      delete params.time
      delete params.registerAddr
      params.registerProvince = String(this.auditForm.registerAddr[0] ? this.auditForm.registerAddr[0] : '')
      params.registerCity = String(this.auditForm.registerAddr[1] ? this.auditForm.registerAddr[1] : '')
      params.registerArea = String(this.auditForm.registerAddr[2] ? this.auditForm.registerAddr[2] : '')
      params.addTime = this.auditForm.time ? this.auditForm.time[0] : ''
      params.updateTime = this.auditForm.time ? this.auditForm.time[1] : ''
      this.IsloadingA = true
      searchMingdan(params).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.paramsOldA = params
        this.total = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getData()
        } else {
          return false
        }
      })
    },
    clearAuditForm(formName) {
      this.$refs[formName].resetFields()
      this.getData()
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.paramsOldA.pageSize = val
      this.IsloadingA = true
      searchMingdan(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.total = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNumber = val
      this.paramsOldA.pageNumber = val
      this.IsloadingA = true
      searchMingdan(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.total = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangeb(val) {
      this.pageInfob.pageSize = val
      this.paramsOldB.pageSize = val
      this.IsloadingA = true
      serachrecord(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.reportForm.tableDataOlder = res.list
        this.totalb = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeb(val) {
      this.pageInfob.pageNumber = val
      this.paramsOldB.pageNumber = val
      this.IsloadingA = true
      serachrecord(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.reportForm.tableDataOlder = res.list
        this.totalb = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    }
  }
}
</script>

<style  lang="scss">
.notice {
    .el-dialog--center .el-dialog__body{
    padding: 0;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
.orderStyle{
  .el-form-item__error{
    position: absolute;
    left: 110px;
  }
  .el-form-item {
    margin-top: 22px;
}
}
}
</style>
