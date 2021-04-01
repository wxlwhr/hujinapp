<template>
  <el-card class="notice">
    <div slot="header" class="clearfix btnCard">
      <span>投诉信息查询</span>
    </div>
    <div class="search">
      <el-form ref="formModel" :model="formModel" :rules="rules" label-width="130px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="投诉编号">
              <el-input v-model="formModel.complainantNum" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投诉日期" prop="time">
              <el-date-picker
                v-model="formModel.time"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理状态">
              <el-select v-model="formModel.processStatus" clearable placeholder="请选择">
                <el-option
                  v-for="item in statusArr2"
                  :key="item.codeKey"
                  :label="item.codeLabel"
                  :value="item.codeKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-if="$store.getters.srnm === ''" :span="8">
            <el-form-item label="被投诉机构名称">
              <el-input v-model="formModel.rinm" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col v-if="$store.getters.srnm === ''" :span="8">
            <el-form-item label="投诉类型">
              <el-select v-model="formModel.complaintsType" clearable>
                <el-option
                  v-for="item in complaintsTypeOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="textRight">
            <el-button type="primary" @click="seachAuditForm('formModel')">查 询</el-button>
            <el-button @click="clearAuditForm('formModel')">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br>
    <el-table v-loading="IsloadingA" :data="tableData" tooltip-effect="dark" @sort-change="sortChange">
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="complainantNum" label="投诉编号" show-overflow-tooltip />
      <el-table-column prop="rinm" label="被投诉机构名称" show-overflow-tooltip />
      <el-table-column prop="ficp" label="投诉类型" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.complaintsType === '1' ?'移动金融客户端应用软件':'金融科技创新应用试点项目' }}
        </template>
      </el-table-column>
      <el-table-column label="处理状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.processStatus==='已发起'" type="warning">已发起</el-tag>
          <el-tag v-if="scope.row.processStatus==='已转发'">已转发</el-tag>
          <el-tag v-if="scope.row.processStatus==='已受理'" type="success">已受理</el-tag>
          <el-tag v-if="scope.row.processStatus==='已驳回'" type="danger">已驳回</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="处理日期" sortable="custom" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.updateTime?scope.row.updateTime:'--' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="投诉日期" sortable="custom1" show-overflow-tooltip />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="operation(scope.row.id,'3')">查看</el-button>
          <el-button v-if="((scope.row.riid && $store.getters.srnm !== '') || (!scope.row.riid && $store.getters.srnm === ''))&&scope.row.processStatus !== '已受理'" type="text" @click="operation(scope.row.id,'1')">处理</el-button>
          <el-button v-if="scope.row.riid && scope.row.processStatus === '已发起'" type="text" @click="zhuanfa(scope.row.id)">转发</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="total>0"
      :current-page="pageInfo.pageNumber"
      :page-size="pageInfo.pageSize"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import { commonValidate2 } from '@/utils/formValidate'
import { getAdrr } from '@/api/general.js'
import { query, update } from '@/api/report.js'
export default {
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      complaintsTypeOptions: [
        {
          value: '1',
          label: '移动金融客户端应用软件'
        },
        {
          value: '2',
          label: '金融科技创新应用试点项目'
        }
      ],
      formModel: {
        complaintsType: '',
        complainantNum: '',
        rinm: '',
        time: [],
        registerAddr: [],
        processStatus: '',
        sort: '1',
        flag: '1'
      },
      SelectionArr: [],
      registerAddrArr: [],
      IsloadingA: false,
      paramsOldA: {},
      searchData: {},
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      tableData: [],
      statusArr2: [],
      statusArr1: [
        {
          codeKey: '已转发',
          codeLabel: '已转发'
        },
        {
          codeKey: '已受理',
          codeLabel: '已受理'
        }
        // {
        //   codeKey: '4',
        //   codeLabel: '已驳回'
        // }
      ],
      statusArr: [
        {
          codeKey: '已发起',
          codeLabel: '已发起'
        },
        {
          codeKey: '已转发',
          codeLabel: '已转发'
        },
        {
          codeKey: '已受理',
          codeLabel: '已受理'
        }
        // {
        //   codeKey: '4',
        //   codeLabel: '已驳回'
        // }
      ],
      rules: {
        title: [{ required: false, validator: commonValidate2, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.statusArr2 = this.$store.getters.srnm === '0' ? this.statusArr1 : this.statusArr
    getAdrr().then(res => {
      this.registerAddrArr = res
    })
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      console.log(searchData)
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.formModel = searchData.searchForm
        this.pageInfo = searchData.pageInfo
      }
    }
    this.getData()
  },
  methods: {
    sortChange(data) {
      if (data.column.property === 'updateTime') {
        if (data.order === 'descending') {
          this.formModel.sort = '1'
          this.getData()
        } else if (data.order === 'ascending') {
          this.formModel.sort = '0'
          this.getData()
        }
      } else if (data.column.property === 'createTime') {
        if (data.order === 'descending') {
          this.formModel.flag = '1'
          this.getData()
        } else if (data.order === 'ascending') {
          this.formModel.flag = '0'
          this.getData()
        }
      }
    },
    zhuanfa(id) {
      this.$confirm('是否确定转发?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        update({ id, processStatus: '已转发' }).then(res => {
          this.$message({
            type: 'success',
            message: '转发成功'
          })
          this.getData()
        })
      }).catch(() => {

      })
    },
    registerChange() {},
    operation(id, type) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfo,
        searchForm: this.formModel
      }
      this.$router.push({
        name: 'information',
        query:
        {
          id,
          type,
          searchData: JSON.stringify(this.searchData)
        }
      })
    },
    // 获取列表数据
    getData() {
      const params = Object.assign({}, this.pageInfo, this.formModel)
      console.log(44, params)
      params.registerProvince = String(this.formModel.registerAddr.length ? this.formModel.registerAddr[0] : '')
      params.registerCity = String(this.formModel.registerAddr.length ? this.formModel.registerAddr[1] : '')
      params.registerArea = String(this.formModel.registerAddr.length ? this.formModel.registerAddr[2] : '')
      params.startDate = this.formModel.time.length > 0 ? this.formModel.time[0] : ''
      params.endDate = this.formModel.time.length > 0 ? this.formModel.time[1] : ''
      delete params.time
      delete params.registerAddr
      this.IsloadingA = true
      query(params).then(res => {
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
      this.formModel = {
        complainantNum: '',
        rinm: '',
        time: [],
        registerAddr: [],
        processStatus: '',
        sort: '1',
        flag: '1'
      }
      this.getData()
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.paramsOldA.pageSize = val
      this.IsloadingA = true
      query(this.paramsOldA).then(res => {
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
      query(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.total = res.total
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
    padding: 10px 20px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
}
</style>

