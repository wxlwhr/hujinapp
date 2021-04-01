
<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>钓鱼仿冒</span>
    </div>
    <div class="search">
      <el-form ref="auditForm" :model="auditForm" label-width="80px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="信息类型">
              <el-select
                v-model="auditForm.type"
                filterable
                clearable
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否采纳">
              <el-select
                v-model="auditForm.isAccept"
                filterable
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
          <el-col :span="8">
            <el-form-item label="提醒时间">
              <el-date-picker
                v-model="auditForm.time"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
              />
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
      <el-table-column prop="type" label="信息类型" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.type === '1'?'钓鱼网站': scope.row.type === '2'?'仿冒APP':'钓鱼公众号' }}
        </template>
      </el-table-column>
      <el-table-column prop="domainName" label="钓鱼仿冒对象" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.domainName ?scope.row.domainName: '--' }}
        </template>
      </el-table-column>
      <el-table-column prop="url" label="钓鱼仿冒地址" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="openUrl(scope.row.url)">
            {{ scope.row.url }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="isAccept" label="是否采纳" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.isAccept === '0'?'未采纳':scope.row.isAccept === '1'?'已采纳':'未处理' }}
        </template>
      </el-table-column>
      <el-table-column prop="remindTime" label="提醒时间" sortable="custom" show-overflow-tooltip />
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
    <lookResult v-if="dialogTips" :id="dialogId" :look-tips="lookTips" :disable="disable" :from="dialogType" :is-x-h="isXH" :look-visible="dialogTips" @dialogHide="dialogHide" />
    <el-dialog v-loading="blockloading" :visible.sync="dialogTableVisible" top="5vh" width="100%">
      <div id="block">
        <!-- <iframe :src="blockSrc" frameborder="0" /> -->
        <iframe id="china-block" :src="blockSrc" frameborder="0" marginWidth="20" marginHeight="0" width="100%" height="100%" scrolling="auto" />
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import lookResult from '@/views/RiskSharing/fishingDialog'
import { fishingQuery } from '@/api/RiskSharing.js'
export default {
  components: {
    lookResult
  },
  data() {
    return {
      isXH: false,
      lookTips: false,
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
      typeOptions: [
        {
          value: '1',
          label: '钓鱼网站'
        },
        {
          value: '2',
          label: '仿冒APP'
        },
        {
          value: '3',
          label: '钓鱼公众号'
        }
      ],
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
        type: '',
        time: '',
        isAccept: ''
      },
      organTypeOptions: [],
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
        time: this.auditForm.time,
        type: this.auditForm.type,
        isAccept: this.auditForm.isAccept,
        sort: this.sort,
        befakedOrgId: this.$store.getters.riid,
        isIgnore: '2'
      }
    }
  },
  mounted() {
    this.queryMsg()
  },
  methods: {
    openUrl(url) {
      window.open(url)
    },
    goBlockChain(row) {
      this.dialogTableVisible = true
      this.blockSrc = `/finapp/finapp.html?txid=${row.blockchainHash}`
    },
    queryMsg(searchOrReset = false) {
      this.tableLoading = true
      if (searchOrReset) this.pageInfo.pageNumber = 1
      const obj = Object.assign({}, this.queryMessage, this.pageInfo)
      obj.startRemindDate = obj.time === null ? '' : obj.time.length ? obj.time[0] : ''
      obj.endRemindDate = obj.time === null ? '' : obj.time.length ? obj.time[1] : ''
      delete obj.time
      fishingQuery(obj).then(res => {
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
    // 列表查询
    seachAuditForm() {
      this.queryMsg(true)
    },
    // 列表重置
    clearAuditForm() {
      this.auditForm = {
        type: '',
        time: '',
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
      this.lookTips = true
      this.dialogTips = true
      this.dialogId = data.id
      this.dialogType = data.type
      this.disable = true
    },
    // 列表反馈操作
    feedback(data) {
      this.disable = false
      this.lookTips = false
      this.dialogTips = true
      this.dialogId = data.id
      this.dialogType = data.type
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

