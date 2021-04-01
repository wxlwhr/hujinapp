<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>投诉转发管理</span>
    </div>
    <div class="search">
      <el-form ref="auditFormf" :model="auditFormf" :rules="rules" label-width="140px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="机构名称" prop="rinm">
              <el-input v-model="auditFormf.rinm" placeholder="机构名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col v-if="this.$store.getters.roles" :span="8">
            <el-form-item label="注册地区" prop="registerAddr">
              <el-cascader
                v-model="auditFormf.registerAddr"
                :options="registerAddrArr"
                :props="{ checkStrictly: true }"
                clearable
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码" prop="succ">
              <el-input v-model="auditFormf.succ" placeholder="统一社会信用代码" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构类别" prop="ficp">
              <el-select v-model="auditFormf.ficp" placeholder="请选择" clearable>
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
            <el-form-item label="提交时间" prop="time">
              <el-date-picker
                v-model="auditFormf.time"
                type="daterange"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="textRight">
            <el-button type="primary" @click="seachAuditFormf('auditFormf')">查 询</el-button>
            <el-button @click="clearAuditFormf('auditFormf')">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br>
    <el-table
      v-loading="IsloadingA"
      :data="tableDataf"
      @sort-change="handleSortChangef"
    >
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="showDialog(scope.row,'0')">{{ scope.row.rinm }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="succ" label="统一社会信用代码" show-overflow-tooltip />
      <el-table-column prop="ficp" label="机构类别" show-overflow-tooltip />
      <el-table-column prop="monitorName" label="机构联系人" show-overflow-tooltip />
      <el-table-column prop="managerTel" label="联系方式" show-overflow-tooltip />
      <el-table-column prop="currentState" label="状态" show-overflow-tooltip />
      <el-table-column prop="lastUpdateTime" label="提交时间" sortable="custom" show-overflow-tooltip />
      <el-table-column prop="updateTime" label="自动转发" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.delValue"
            class="switchStyle"
            active-text="启用"
            inactive-text="停用"
            @change="goOpen(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="totalf>0"
      :current-page="pageInfof.pageNumber"
      :page-size="pageInfof.pageSize"
      :total="totalf"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChangef"
      @current-change="handleCurrentChangef"
    />
  </el-card>
</template>
<script>
import { commonValidate2 } from '@/utils/formValidate'
import { getAdrr, getClock } from '@/api/general.js'
import { forward } from '@/api/report.js'
import { JgzSearch } from '@/api/register/register.js'
export default {
  data() {
    return {
      blockloading: false,
      blockSrc: '',
      dialogTableVisible: false,
      IsloadingA: false,
      JGloading: false,
      loading: null,
      JGoptions: [],
      registerAddrArr: [],
      jigou: [],
      searchData: {},
      paramsOldF: {},
      auditFormf: {
        rinm: '',
        srnm: '0',
        ficp: '',
        time: '',
        succ: '',
        sortKey: '1',
        registerAddr: [],
        currentState: ''
      },
      pageInfof: {
        pageNumber: 1,
        pageSize: 10
      },
      totalf: 0,
      rules: {
        rinm: [{ required: false, validator: commonValidate2, trigger: 'blur' }]
      },
      tableDataf: []
    }
  },
  created() {
    getAdrr().then(res => {
      this.registerAddrArr = res
    })
    if (this.$store.getters.deptcode === 'S0000000000007') { // 银保
      getClock('C5100000').then(res => {
        this.jigou = res
      })
    } else if (this.$store.getters.deptcode === 'S0000000000008') {
      getClock('C5200000').then(res => {
        this.jigou = res
      })
    } else {
      getClock('C5000000').then(res => {
        this.jigou = res
      })
    }
  },
  mounted() {
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if (searchData.pageName === this.$route.name && searchData.ifReview) {
        this.pageInfof = searchData.pageInfo
        this.auditFormf = searchData.searchForm
      }
    }
    this.getAuditFormf()
  },
  methods: {
    handleSortChange(column) {
      if (column.order === 'ascending') {
        this.auditForm.sortKey = '0'
        this.getAuditForm()
      } else if (column.order === 'descending') {
        this.auditForm.sortKey = '1'
        this.getAuditForm()
      }
    },
    handleSortChangeb(column) {
      if (column.order === 'ascending') {
        this.auditFormb.sortKey = '0'
        this.getAuditFormb()
      } else if (column.order === 'descending') {
        this.auditFormb.sortKey = '1'
        this.getAuditFormb()
      }
    },
    handleSortChangec(column) {
      if (column.order === 'ascending') {
        this.auditFormc.sortKey = '0'
        this.getAuditFormc()
      } else if (column.order === 'descending') {
        this.auditFormc.sortKey = '1'
        this.getAuditFormc()
      }
    },
    handleSortChanged(column) {
      if (column.order === 'ascending') {
        this.auditFormd.sortKey = '0'
        this.getAuditFormd()
      } else if (column.order === 'descending') {
        this.auditFormd.sortKey = '1'
        this.getAuditFormd()
      }
    },
    handleSortChangef(column) {
      if (column.order === 'ascending') {
        this.auditFormf.sortKey = '0'
        this.getAuditFormf()
      } else if (column.order === 'descending') {
        this.auditFormf.sortKey = '1'
        this.getAuditFormf()
      }
    },
    showDialog(row, type) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfof,
        searchForm: this.auditFormf
      }
      this.$router.push({
        name: 'jgmaintenance',
        query: {
          riid: row.riid,
          searchData: JSON.stringify(this.searchData),
          type
        }
      })
    },
    goOpen(data) {
      if (data.isLongValid === '1' || data.isLongValid === null) {
        this.$confirm('是否确定自动转发将该机构的投诉?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          data.delValue = true
          forward({ isLongValid: '0', riid: data.riid }).then(res => {
            this.getAuditForm()
            this.$message({
              type: 'success',
              message: '设置成功'
            })
          })
        }).catch(() => {
          data.delValue = false
        })
      } else if (data.isLongValid === '0') {
        this.$confirm('是否取消自动转发将该机构的投诉?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          data.delValue = false
          forward({ isLongValid: '1', riid: data.riid }).then(res => {
            this.getAuditForm()
            this.$message({
              type: 'success',
              message: '设置成功'
            })
          })
        }).catch(() => {
          data.delValue = true
        })
      }
    },
    seachAuditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditForm('0')
        } else {
          return false
        }
      })
    },
    clearAuditForm(formName) {
      this.$refs[formName].resetFields()
      this.getAuditForm('0')
    },
    seachAuditFormb(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormb('0')
        } else {
          return false
        }
      })
    },
    clearAuditFormb(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormb('0')
    },
    seachAuditFormc(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormc('0')
        } else {
          return false
        }
      })
    },
    clearAuditFormc(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormc('0')
    },
    seachAuditFormd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormd('0')
        } else {
          return false
        }
      })
    },
    clearAuditFormd(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormd('0')
    },
    seachAuditFormf(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormf('0')
        } else {
          return false
        }
      })
    },
    clearAuditFormf(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormf('0')
    },
    getAuditForm(num) {
      if (num === '0') {
        this.pageInfo.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfo, this.auditForm)
      delete params.time
      delete params.registerAddr
      params.registerProvince = String(this.auditForm.registerAddr[0] ? this.auditForm.registerAddr[0] : '')
      params.registerCity = String(this.auditForm.registerAddr[1] ? this.auditForm.registerAddr[1] : '')
      params.registerArea = String(this.auditForm.registerAddr[2] ? this.auditForm.registerAddr[2] : '')
      params.startDate = this.auditForm.time ? this.auditForm.time[0] : ''
      params.endDate = this.auditForm.time ? this.auditForm.time[1] : ''
      this.IsloadingA = true
      JgzSearch(params).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
        this.paramsOldA = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getAuditFormb(num) {
      if (num === '0') {
        this.pageInfob.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfob, this.auditFormb)
      delete params.time
      delete params.registerAddr
      params.registerProvince = String(this.auditFormb.registerAddr[0] ? this.auditFormb.registerAddr[0] : '')
      params.registerCity = String(this.auditFormb.registerAddr[1] ? this.auditFormb.registerAddr[1] : '')
      params.registerArea = String(this.auditFormb.registerAddr[2] ? this.auditFormb.registerAddr[2] : '')
      params.startDate = this.auditFormb.time ? this.auditFormb.time[0] : ''
      params.endDate = this.auditFormb.time ? this.auditFormb.time[1] : ''
      this.IsloadingA = true
      JgzSearch(params).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
        this.paramsOldB = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getAuditFormc(num) {
      if (num === '0') {
        this.pageInfoc.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfoc, this.auditFormc)
      delete params.time
      delete params.registerAddr
      params.registerProvince = String(this.auditFormc.registerAddr[0] ? this.auditFormc.registerAddr[0] : '')
      params.registerCity = String(this.auditFormc.registerAddr[1] ? this.auditFormc.registerAddr[1] : '')
      params.registerArea = String(this.auditFormc.registerAddr[2] ? this.auditFormc.registerAddr[2] : '')
      params.startDate = this.auditFormc.time ? this.auditFormc.time[0] : ''
      params.endDate = this.auditFormc.time ? this.auditFormc.time[1] : ''
      this.IsloadingA = true
      JgzSearch(params).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list
        this.paramsOldC = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getAuditFormd(num) {
      if (num === '0') {
        this.pageInfod.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfod, this.auditFormd)
      delete params.time
      delete params.registerAddr
      params.registerProvince = String(this.auditFormd.registerAddr[0] ? this.auditFormd.registerAddr[0] : '')
      params.registerCity = String(this.auditFormd.registerAddr[1] ? this.auditFormd.registerAddr[1] : '')
      params.registerArea = String(this.auditFormd.registerAddr[2] ? this.auditFormd.registerAddr[2] : '')
      params.startDate = this.auditFormd.time ? this.auditFormd.time[0] : ''
      params.endDate = this.auditFormd.time ? this.auditFormd.time[1] : ''
      this.IsloadingA = true
      JgzSearch(params).then(res => {
        this.IsloadingA = false
        this.totald = res.total
        this.tableDatad = res.list
        this.paramsOldD = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    getAuditFormf(num) {
      if (num === '0') {
        this.pageInfof.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfof, this.auditFormf)
      delete params.time
      delete params.registerAddr
      params.registerProvince = String(this.auditFormf.registerAddr[0] ? this.auditFormf.registerAddr[0] : '')
      params.registerCity = String(this.auditFormf.registerAddr[1] ? this.auditFormf.registerAddr[1] : '')
      params.registerArea = String(this.auditFormf.registerAddr[2] ? this.auditFormf.registerAddr[2] : '')
      params.startDate = this.auditFormf.time ? this.auditFormf.time[0] : ''
      params.endDate = this.auditFormf.time ? this.auditFormf.time[1] : ''
      params.currentState = '已备案'
      this.IsloadingA = true
      JgzSearch(params).then(res => {
        this.IsloadingA = false
        this.totalf = res.total
        this.tableDataf = res.list.map(item => {
          item.delName = item.isLongValid === '0' ? '自动转发' : '取消自动转发'
          item.delValue = item.isLongValid === '0'
          return item
        })
        this.paramsOldF = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangea(val) {
      this.paramsOldA.pageSize = val
      this.pageInfo.pageSize = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldA).then(res => {
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
      JgzSearch(this.paramsOldA).then(res => {
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
      JgzSearch(this.paramsOldB).then(res => {
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
      JgzSearch(this.paramsOldB).then(res => {
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
      JgzSearch(this.paramsOldC).then(res => {
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
      JgzSearch(this.paramsOldC).then(res => {
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
      JgzSearch(this.paramsOldD).then(res => {
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
      JgzSearch(this.paramsOldD).then(res => {
        this.IsloadingA = false
        this.totald = res.total
        this.tableDatad = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangef(val) {
      this.paramsOldF.pageSize = val
      this.pageInfof.pageSize = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldF).then(res => {
        this.IsloadingA = false
        this.totalf = res.total
        this.tableDataf = res.list.map(item => {
          item.delName = item.isLongValid === '0' ? '自动转发' : '取消自动转发'
          item.delValue = item.isLongValid === '0'
          return item
        })
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangef(val) {
      this.paramsOldF.pageNumber = val
      this.pageInfof.pageNumber = val
      this.IsloadingA = true
      JgzSearch(this.paramsOldF).then(res => {
        this.IsloadingA = false
        this.totalf = res.total
        this.tableDataf = res.list.map(item => {
          item.delName = item.isLongValid === '0' ? '自动转发' : '取消自动转发'
          item.delValue = item.isLongValid === '0'
          return item
        })
      }).catch(() => {
        this.IsloadingA = false
      })
    }
  }
}
</script>
<style lang="scss">
#block{
    iframe{
      min-height: calc(100vh - 120px);
    }
  }
// .continue{
//     .el-date-editor .el-range__close-icon{
//     line-height: 24px
//   }
// }
</style>
