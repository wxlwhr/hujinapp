<template>
  <el-card class="affStyle">
    <div slot="header" class="clearfix btnCard">
      <span>关联管理</span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick(activeName)">
      <el-tab-pane label="待确认" name="0">
        <div class="search">
          <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建时间" prop="time">
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
              <el-col :span="8">
                <el-form-item label="总部机构名称" prop="osnm">
                  <el-input v-model="auditForm.osnm" placeholder="请输入" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下级机构名称" prop="rinm">
                  <el-input v-model="auditForm.rinm" placeholder="请输入" clearable maxlength="50" />
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
          <el-table-column prop="rinm" label="下级机构" show-overflow-tooltip />
          <el-table-column width="210" label="关联关系">
            <template slot-scope="scope">
              <img :src="bgMonitorImg" alt="" srcset="" @click="imgClick(scope.row)">
            </template>
          </el-table-column>
          <el-table-column prop="osnm" label="总部机构" show-overflow-tooltip />
          <el-table-column prop="isPass" label="关联状态" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goOpen(scope.row.blockchainHash)">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip />
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
      <el-tab-pane label="审核通过" name="1">
        <div class="search">
          <el-form ref="auditFormb" :model="auditFormb" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建时间" prop="time">
                  <el-date-picker
                    v-model="auditFormb.time"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="总部机构名称" prop="osnm">
                  <el-input v-model="auditFormb.osnm" placeholder="请输入" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下级机构名称" prop="rinm">
                  <el-input v-model="auditFormb.rinm" placeholder="请输入" clearable maxlength="50" />
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
          <el-table-column prop="rinm" label="下级机构" show-overflow-tooltip />
          <el-table-column width="210" label="关联关系">
            <template slot-scope="scope">
              <img :src="bgMonitorImg" alt="" srcset="" @click="imgClick(scope.row)">
            </template>
          </el-table-column>
          <el-table-column prop="osnm" label="总部机构" show-overflow-tooltip />
          <el-table-column prop="isPass" label="关联状态" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goOpen(scope.row.blockchainHash)">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip />
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
      <el-tab-pane label="审核未通过" name="2">
        <div class="search">
          <el-form ref="auditFormc" :model="auditFormc" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建时间" prop="time">
                  <el-date-picker
                    v-model="auditFormc.time"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="总部机构名称" prop="osnm">
                  <el-input v-model="auditFormc.osnm" placeholder="请输入" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下级机构名称" prop="rinm">
                  <el-input v-model="auditFormc.rinm" placeholder="请输入" clearable maxlength="50" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormc('auditFormc')">查 询</el-button>
                <el-button @click="clearAuditFormc('auditFormc')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatac"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="下级机构" show-overflow-tooltip />
          <el-table-column width="210" label="关联关系">
            <template slot-scope="scope">
              <img :src="bgMonitorImg" alt="" srcset="" @click="imgClick(scope.row)">
            </template>
          </el-table-column>
          <el-table-column prop="osnm" label="总部机构" show-overflow-tooltip />
          <el-table-column prop="isPass" label="关联状态" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goOpen(scope.row.blockchainHash)">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip />
        </el-table>
        <el-pagination
          :current-page="pageInfoc.pageNumber"
          :page-size="pageInfoc.pageSize"
          :total="totalc"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangec"
          @current-change="handleCurrentChangec"
        />
      </el-tab-pane>
      <el-tab-pane label="已失效" name="3">
        <div class="search">
          <el-form ref="auditFormd" :model="auditFormd" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建时间" prop="time">
                  <el-date-picker
                    v-model="auditFormd.time"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="总部机构名称" prop="osnm">
                  <el-input v-model="auditFormd.osnm" placeholder="请输入" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下级机构名称" prop="rinm">
                  <el-input v-model="auditFormd.rinm" placeholder="请输入" clearable maxlength="50" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormd('auditFormd')">查 询</el-button>
                <el-button @click="clearAuditFormd('auditFormd')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatad"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rinm" label="下级机构" show-overflow-tooltip />
          <el-table-column width="210" label="关联关系">
            <template slot-scope="scope">
              <img :src="bgMonitorImg" alt="" srcset="" @click="imgClick(scope.row)">
            </template>
          </el-table-column>
          <el-table-column prop="osnm" label="总部机构" show-overflow-tooltip />
          <el-table-column prop="isPass" label="关联状态" show-overflow-tooltip />
          <el-table-column prop="updateTime" label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goOpen(scope.row.blockchainHash)">区块链信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip />
        </el-table>
        <el-pagination
          :current-page="pageInfod.pageNumber"
          :page-size="pageInfod.pageSize"
          :total="totald"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChanged"
          @current-change="handleCurrentChanged"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="dialogTableVisible" top="5vh" width="100%">
      <div id="block">
        <!-- <iframe :src="blockSrc" frameborder="0" /> -->
        <iframe id="china-block" :src="blockSrc" frameborder="0" marginWidth="20" marginHeight="0" width="100%" height="100%" scrolling="auto" />
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import bgMonitor from '@/assets/jiantou1.png'
import { commonValidate2 } from '@/utils/formValidate'
import { orgOsnmListAll } from '@/api/register/affiliates.js'
export default {
  data() {
    return {
      reportForm: {
        osnm: ''
      },
      bgMonitorImg: bgMonitor,
      blockSrc: '',
      dialogTableVisible: false,
      options: [],
      IsloadingA: false,
      centerDialogVisible: false,
      centerDialogOne: false,
      activeName: '0',
      paramsOldA: {},
      paramsOldB: {},
      paramsOldC: {},
      paramsOldD: {},
      paramsObj: {},
      registerAddrArr: [],
      jigou: [],
      auditForm: {
        rinm: '',
        osnm: '',
        isPass: '0',
        time: [],
        sortKey: '1'
      },
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      auditFormb: {
        rinm: '',
        osnm: '',
        isPass: '1',
        time: [],
        sortKey: '1'
      },
      pageInfob: {
        pageNumber: 1,
        pageSize: 10
      },
      totalb: 0,
      auditFormc: {
        rinm: '',
        osnm: '',
        isPass: '2',
        time: [],
        sortKey: '1'
      },
      pageInfoc: {
        pageNumber: 1,
        pageSize: 10
      },
      totalc: 0,
      auditFormd: {
        rinm: '',
        osnm: '',
        isPass: '3',
        time: [],
        sortKey: '1'
      },
      pageInfod: {
        pageNumber: 1,
        pageSize: 10
      },
      totald: 0,
      rules: {
        rinm: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        osnm: [{ required: false, validator: commonValidate2, trigger: 'blur' }]
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
      tableDatab: [],
      tableDatac: [],
      tableDatad: []
    }
  },
  mounted() {
    this.handleClick()
  },
  methods: {
    goOpen(blockchainHash) {
      this.dialogTableVisible = true
      this.blockSrc = `/finapp/finapp.html?txid=${blockchainHash}`
    },
    handleClick() {
      switch (this.activeName) {
        case '0':
          this.getAuditForm()
          break
        case '1':
          this.getAuditFormb()
          break
        case '2':
          this.getAuditFormc()
          break
        case '3':
          this.getAuditFormd()
          break
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
    seachAuditFormc(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormc()
        } else {
          return false
        }
      })
    },
    clearAuditFormc(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormc()
    },
    seachAuditFormd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormd()
        } else {
          return false
        }
      })
    },
    clearAuditFormd(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormd()
    },
    getAuditForm() {
      this.pageInfo.pageNumber = 1
      const params = Object.assign({}, this.pageInfo, this.auditForm)
      delete params.time
      params.startDate = this.auditForm.time ? this.auditForm.time[0] : ''
      params.endDate = this.auditForm.time ? this.auditForm.time[1] : ''
      this.IsloadingA = true
      orgOsnmListAll(params).then(res => {
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
      delete params.time
      params.startDate = this.auditFormb.time ? this.auditFormb.time[0] : ''
      params.endDate = this.auditFormb.time ? this.auditFormb.time[1] : ''
      this.IsloadingA = true
      orgOsnmListAll(params).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
        this.paramsOldB = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getAuditFormc() {
      this.pageInfoc.pageNumber = 1
      const params = Object.assign({}, this.pageInfoc, this.auditFormc)
      delete params.time
      params.startDate = this.auditFormc.time ? this.auditFormc.time[0] : ''
      params.endDate = this.auditFormc.time ? this.auditFormc.time[1] : ''
      this.IsloadingA = true
      orgOsnmListAll(params).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list
        this.paramsOldC = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getAuditFormd() {
      this.pageInfod.pageNumber = 1
      const params = Object.assign({}, this.pageInfod, this.auditFormd)
      delete params.time
      params.startDate = this.auditFormd.time ? this.auditFormd.time[0] : ''
      params.endDate = this.auditFormd.time ? this.auditFormd.time[1] : ''
      this.IsloadingA = true
      orgOsnmListAll(params).then(res => {
        this.IsloadingA = false
        this.totald = res.total
        this.tableDatad = res.list
        this.paramsOldD = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangea(val) {
      this.paramsOldA.pageSize = val
      this.pageInfo.pageSize = val
      this.IsloadingA = true
      orgOsnmListAll(this.paramsOldA).then(res => {
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
      orgOsnmListAll(this.paramsOldA).then(res => {
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
      orgOsnmListAll(this.paramsOldB).then(res => {
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
      orgOsnmListAll(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangec(val) {
      this.paramsOldC.pageSize = val
      this.pageInfoc.pageSize = val
      this.IsloadingA = true
      orgOsnmListAll(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangec(val) {
      this.paramsOldC.pageNumber = val
      this.pageInfoc.pageNumber = val
      this.IsloadingA = true
      orgOsnmListAll(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChanged(val) {
      this.paramsOldD.pageSize = val
      this.pageInfod.pageSize = val
      this.IsloadingA = true
      orgOsnmListAll(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.totald = res.total
        this.tableDatad = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChanged(val) {
      this.paramsOldD.pageNumber = val
      this.pageInfod.pageNumber = val
      this.IsloadingA = true
      orgOsnmListAll(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.totald = res.total
        this.tableDatad = res.list
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
