
<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>风险提醒</span>
    </div>
    <div class="search">
      <el-form ref="auditForm" :model="auditForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="APP名称">
              <el-input v-model="auditForm.appName" type="text" placeholder="App名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="风险等级">
              <el-select
                v-model="auditForm.riskLevel"
                filterable
                @change="riskLevelChange"
              >
                <el-option
                  v-for="item in riskLevelOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否采纳">
              <el-select
                v-model="auditForm.isAccept"
                filterable
                @change="isAcceptChange"
              >
                <el-option
                  v-for="item in isAcceptOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.label"
                />
              </el-select>
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
      <el-table-column prop="productType" label="APP名称及版本" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>
            <span>
              {{ scope.row.appName }} -
            </span>
            <span>
              {{ scope.row.appVersion }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="riskType" label="风险类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>{{ scope.row.riskType?scope.row.riskType:'--' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="riskLevel" label="风险等级" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.riskLevel">
            <el-tag v-if="scope.row.riskLevel === '0'" type="success" style="width:65px">
              {{ '低风险' }}
            </el-tag>
            <el-tag v-else-if="scope.row.riskLevel === '1'" type="warning" style="width:65px">
              {{ '中风险' }}
            </el-tag>
            <el-tag v-else-if="scope.row.riskLevel === '2'" type="danger" style="width:65px">
              {{ '高风险' }}
            </el-tag>
          </div>
          <div v-else>
            --
          </div>
        </template>
      </el-table-column>
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
      <el-table-column prop="monitorTime" label="监测时间" sortable="custom" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>
            {{ scope.row.monitorTime?scope.row.monitorTime:'--' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isAccept" label="是否采纳" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.isAccept === '0'?'未采纳':scope.row.isAccept === '1'?'已采纳':'未处理' }}
        </template>
      </el-table-column>
      <el-table-column label="区块链" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="goBlockChain(scope.row,'1')">{{ scope.row.blockchainHash?'区块链信息':'--' }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" :disabled="scope.row.isAccept!=='1' && scope.row.isAccept!=='0'" @click="lookResult(scope.row)">
            查看结果
          </el-button>
          <el-button type="text" :disabled="scope.row.isAccept!=='2'" @click="feedback(scope.row)">
            反馈
          </el-button>
        </template>
      </el-table-column>
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
    <lookResult v-if="dialogTips" :fankui="fankui" :look-visible="dialogTips" :disable="disable" :dialog-msg="dialogMsg" @dialogHide="dialogHide" />
    <el-dialog v-loading="blockloading" :visible.sync="dialogTableVisible" top="5vh" width="100%">
      <div id="block">
        <!-- <iframe :src="blockSrc" frameborder="0" /> -->
        <iframe id="china-block" :src="blockSrc" frameborder="0" marginWidth="20" marginHeight="0" width="100%" height="100%" scrolling="auto" />
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import lookResult from '@/views/RiskSharing/dialog'
import { querySearch } from '@/api/RiskSharing.js'
export default {
  components: {
    lookResult
  },
  data() {
    return {
      fankui: false,
      blockloading: false,
      dialogTableVisible: false,
      blockSrc: '',
      disable: false,
      dialogMsg: {},
      dialogTips: false,
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      auditForm: {
        appName: '',
        riskLevel: '',
        isAccept: ''
      },
      organTypeOptions: [],
      riskLevelOptions: [
        {
          name: '低风险',
          label: '0'
        },
        {
          name: '中风险',
          label: '1'
        },
        {
          name: '高风险',
          label: '2'
        }
      ],
      isAcceptOptions: [
        {
          name: '未采纳',
          label: '0'
        },
        {
          name: '已采纳',
          label: '1'
        },
        {
          name: '未处理',
          label: '2'
        }
      ],
      tableLoading: false,
      tableData: [],
      sort: '1'
    }
  },
  computed: {
    actionUrl() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.riidNum}&ownSystem=11&ownBusiness=nifaReport&flag=1`
    },
    queryMessage() {
      return {
        pageNumber: 1,
        pageSize: this.pageInfo.pageSize,
        rinm: this.auditForm.rinm,
        isAccept: this.auditForm.isAccept,
        riskLevel: this.auditForm.riskLevel,
        appName: this.auditForm.appName,
        sort: this.sort,
        flag: '3',
        riid: this.$store.getters.riid
      }
    }
  },
  mounted() {
    this.queryMsg()
  },
  methods: {
    goBlockChain(row) {
      this.dialogTableVisible = true
      this.blockSrc = `/finapp/finapp.html?txid=${row.blockchainHash}`
    },
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
    // 批量导入
    uploadFile() {},
    // 新建
    newSet() {},
    // 批量新建
    moreNewSet() {},
    // 机构类别change
    organTypeChange() {},
    // 风险等级change
    riskLevelChange() {},
    // 是否采纳change
    isAcceptChange() {},
    // 列表查询
    seachAuditForm() {
      this.queryMsg(true)
    },
    // 列表重置
    clearAuditForm() {
      this.auditForm = {
        appName: '',
        riskLevel: '',
        isAccept: ''
      }
      this.queryMsg(true)
    },
    // 列表排序
    sortChange(column) {
      if (column.order === 'descending') {
        this.sort = '1'
        this.queryMsg()
      } else if (column.order === 'ascending') {
        this.sort = '0'
        this.queryMsg()
      }
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
    },
    // 列表查看结果操作
    lookResult(data) {
      this.dialogTips = true
      this.dialogMsg = data
      this.disable = true
    },
    // 列表反馈操作
    feedback(data) {
      this.dialogMsg = data
      this.dialogTips = true
      this.disable = false
      this.fankui = true
    },
    dialogHide(val) {
      if (val === '确定') {
        this.dialogTips = false
        this.queryMsg()
      } else if (val === '取消') {
        this.dialogTips = false
      }
    },
    getXlsMsg(val) {
      this.tableData = val
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
</style>

