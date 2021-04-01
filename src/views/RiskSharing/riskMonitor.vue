<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>风险监测</span>
    </div>
    <div class="search">
      <el-form ref="auditForm" :model="auditForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="金融机构">
              <el-input v-model="auditForm.rinm" type="text" placeholder="金融机构名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应用名称">
              <el-input v-model="auditForm.appName" type="text" placeholder="应用名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="机构类别">
              <el-select
                v-model="auditForm.ficp"
                filterable
                @change="ficpChange"
              >
                <el-option
                  v-for="item in ficpOptions"
                  :key="item.codeKey"
                  :label="item.codeValue"
                  :value="item.codeValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="App版本">
              <el-input v-model="auditForm.appVersion" type="text" placeholder="应用名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="textRight">
            <el-button type="primary" @click="seachAuditForm()">查 询</el-button>
            <el-button @click="clearAuditForm()">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br>
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="rinm" label="金融机构" show-overflow-tooltip />
      <el-table-column prop="ficp" label="机构类别" show-overflow-tooltip />
      <el-table-column prop="appName" label="应用名称" show-overflow-tooltip />
      <el-table-column prop="productType" label="APP产品类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.productType">
            <el-tag v-if="scope.row.productType==='Android'" style="width:65px">
              {{ scope.row.productType }}
            </el-tag>
            <el-tag v-else-if="scope.row.productType==='IOS'" type="success" style="width:65px">
              {{ scope.row.productType }}
            </el-tag>
            <el-tag v-else-if="scope.row.productType==='other'" type="warning" style="width:65px">
              {{ scope.row.productType }}
            </el-tag>
          </div>
          <div v-else>
            --
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="appVersion" label="应用版本" show-overflow-tooltip />
    </el-table>
    <el-pagination
      :current-page="pageInfo.pageNumber"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </el-card>
</template>
<script>
import { getClock } from '@/api/general.js'
import { querySearch } from '@/api/RiskSharing.js'
export default {
  data() {
    return {
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      auditForm: {
        rinm: '',
        appName: '',
        ficp: '',
        appVersion: ''
      },
      finOptions: [],
      ficpOptions: [],
      appVersionOptions: [],
      finLoading: false,
      tableLoading: false,
      tableData: [],
      sort: '1'
    }
  },
  computed: {
    queryMessage() {
      return {
        pageNumber: 1,
        pageSize: this.pageInfo.pageSize,
        rinm: this.auditForm.rinm,
        monitorOrgName: '',
        isAccept: '',
        riskLevel: '',
        appName: this.auditForm.appName,
        appVersion: this.auditForm.appVersion,
        ficp: this.auditForm.ficp,
        sort: this.sort,
        flag: '2',
        riid: this.$store.getters.riid
      }
    }
  },
  mounted() {
    this.queryMsg()
    getClock('C5000000').then(res => {
      this.ficpOptions = res
    })
  },
  methods: {
    queryMsg(searchOrReset = false) {
      this.tableLoading = true
      if (searchOrReset) this.pageInfo.pageNumber = 1
      const obj = Object.assign({}, this.queryMessage, this.pageInfo)
      querySearch(obj).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.tableLoading = false
        if (searchOrReset) this.pageInfo.pageNumber = 1
      })
    },
    // 新建
    newSet() {},
    // 批量新建
    moreNewSet() {},
    // 金融机构远程搜索
    finRemoteMethod() {},
    // 金融机构change
    finChange() {},
    // 机构类别change
    ficpChange() {},
    // 应用版本change
    appVersionChange() {},
    // 列表查询
    seachAuditForm() {
      this.queryMsg(true)
    },
    // 列表重置
    clearAuditForm() {
      this.auditForm = {
        rinm: '',
        appName: '',
        ficp: '',
        appVersion: ''
      }
      this.queryMsg(true)
    },
    // 列表排序
    sortChange(val) {
      this.pageInfo.pageSize = val
      this.queryMsg()
    },
    // 页码变化
    sizeChange(val) {
      this.pageInfo.pageSize = val
      this.queryMsg()
    },
    // 条数变化
    currentChange(val) {
      this.pageInfo.pageNumber = val
      this.queryMsg()
    }
  }
}
</script>
<style lang="scss">

</style>
