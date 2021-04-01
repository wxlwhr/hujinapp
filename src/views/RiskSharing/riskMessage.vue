<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>风险信息</span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="tebCheck">
      <el-tab-pane label="风险信息" name="0">
        <div class="search">
          <el-form ref="auditForm" :model="auditForm" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="APP名称">
                  <el-input v-model="auditForm.appName" type="text" placeholder="APP名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="风险类型">
                  <el-input v-model="auditForm.riskType" type="text" placeholder="风险类型" clearable maxlength="50" />
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
          <el-table-column prop="appName" label="APP名称" show-overflow-tooltip />
          <el-table-column prop="appVersion" label="APP版本" show-overflow-tooltip />
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
                <span v-else>
                  --
                </span>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="monitorOrgName" label="监测机构名称" show-overflow-tooltip width="180" /> -->
          <el-table-column prop="monitorTime" label="监测时间" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                {{ scope.row.monitorTime?scope.row.monitorTime:'--' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="activeName === '1'" label="查看状态" show-overflow-tooltip>
            <!-- <template slot-scope="scope">
              <div>1</div>
            </template> -->
          </el-table-column>
          <el-table-column v-if="activeName === '1'" label="是否采纳" show-overflow-tooltip>
            <!-- <template slot-scope="scope">
              <div>1</div>
            </template> -->
          </el-table-column>
          <el-table-column label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">{{ scope.row.blockchainHash?'区块链信息':'--' }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="135px">
            <template slot-scope="scope">
              <div>
                <el-button type="text" @click="ignore(scope.row.id)">
                  忽略
                </el-button>
                <el-button type="text" @click="remind(scope.row.id,'风险信息')">
                  风险提醒
                </el-button>
                <el-button type="text" @click="look('查看',scope.row)">
                  查看
                </el-button>
              </div>
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

      </el-tab-pane>
      <el-tab-pane label="已提醒" name="1">
        <div class="search">
          <el-form ref="auditFormb" :model="auditFormb" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="APP名称">
                  <el-input v-model="auditFormb.appName" type="text" placeholder="APP名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="风险类型">
                  <el-input v-model="auditFormb.riskType" type="text" placeholder="风险类型" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="风险等级">
                  <el-select
                    v-model="auditFormb.riskLevel"
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
                    v-model="auditFormb.isAccept"
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
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormb()">查 询</el-button>
                <el-button @click="clearAuditFormb()">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="tableLoadingb"
          :data="tableDatab"
          @sort-change="sortChangeb"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="appName" label="APP名称" show-overflow-tooltip />
          <el-table-column prop="appVersion" label="APP版本" show-overflow-tooltip />
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
                <span v-else>
                  --
                </span>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="monitorName" label="联系人" show-overflow-tooltip />
          <el-table-column prop="isAccept" label="是否采纳" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.isAccept === '0'?'未采纳':scope.row.isAccept === '1'?'已采纳':'未处理' }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="monitorOrgName" label="监测机构名称" show-overflow-tooltip width="180" /> -->
          <el-table-column prop="updateTime" label="提醒时间" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                {{ scope.row.updateTime?scope.row.updateTime:'--' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">{{ scope.row.blockchainHash?'区块链信息':'--' }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                <el-button :disabled="scope.row.sms === '1'" type="text" @click="remind(scope.row.id,'已提醒')">
                  风险提醒
                </el-button>
                <el-button type="text" @click="look('查看',scope.row)">
                  查看
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfob.pageNumber"
          :page-size="pageInfob.pageSize"
          :total="pageInfob.total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="sizeChangeb"
          @current-change="currentChangeb"
        />

      </el-tab-pane>
      <el-tab-pane label="已忽略" name="2">
        <div class="search">
          <el-form ref="auditFormc" :model="auditFormc" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="APP名称">
                  <el-input v-model="auditFormc.appName" type="text" placeholder="APP名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="风险类型">
                  <el-input v-model="auditFormc.riskType" type="text" placeholder="风险类型" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="风险等级">
                  <el-select
                    v-model="auditFormc.riskLevel"
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
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormc()">查 询</el-button>
                <el-button @click="clearAuditFormc()">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="tableLoadingc"
          :data="tableDatac"
          @sort-change="sortChangec"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="appName" label="APP名称" show-overflow-tooltip />
          <el-table-column prop="appVersion" label="APP版本" show-overflow-tooltip />
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
                <span v-else>
                  --
                </span>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="monitorOrgName" label="监测机构名称" show-overflow-tooltip width="180" /> -->
          <el-table-column prop="monitorTime" label="监测时间" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                {{ scope.row.monitorTime?scope.row.monitorTime:'--' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="activeName === '1'" label="查看状态" show-overflow-tooltip>
            <!-- <template slot-scope="scope">
              <div>1</div>
            </template> -->
          </el-table-column>
          <el-table-column v-if="activeName === '1'" label="是否采纳" show-overflow-tooltip>
            <!-- <template slot-scope="scope">
              <div>1</div>
            </template> -->
          </el-table-column>
          <el-table-column label="区块链" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goBlockChain(scope.row,'1')">{{ scope.row.blockchainHash?'区块链信息':'--' }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                <el-button type="text" @click="recovery(scope.row.id)">
                  恢复
                </el-button>
                <el-button type="text" @click="look('查看',scope.row)">
                  查看
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfoc.pageNumber"
          :page-size="pageInfoc.pageSize"
          :total="pageInfoc.total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="sizeChangec"
          @current-change="currentChangec"
        />
      </el-tab-pane>
    </el-tabs>
    <lookResult v-if="dialogTips" :fankui="fankui" :disable="disable" :look-visible="dialogTips" :work-type="workType" :dialog-msg="dialogMsg" @dialogHide="dialogHide" />
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
import { querySearch, modify } from '@/api/RiskSharing.js'
export default {
  components: {
    lookResult
  },
  data() {
    return {
      fankui: false,
      blockSrc: '',
      blockloading: false,
      dialogTableVisible: false,
      disable: false,
      dialogMsg: {},
      workType: '',
      dialogTips: false,
      activeName: '0',
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      pageInfob: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      pageInfoc: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      auditForm: {
        appName: '',
        riskType: '',
        riskLevel: '',
        isIgnore: '0',
        sort: '1'
      },
      auditFormb: {
        isAccept: '',
        appName: '',
        riskType: '',
        riskLevel: '',
        isIgnore: '2',
        sort: '1'
      },
      auditFormc: {
        appName: '',
        riskType: '',
        riskLevel: '',
        isIgnore: '1',
        sort: '1'
      },
      finOptions: [],
      monitorOptions: [],
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
      finLoading: false,
      monitorLoading: false,
      tableLoading: false,
      tableLoadingb: false,
      tableLoadingc: false,
      tableData: [],
      tableDatab: [],
      tableDatac: []
    }
  },
  computed: {
    queryMessage() {
      return {
        pageNumber: 1,
        pageSize: this.pageInfo.pageSize,
        isAccept: '',
        riskLevel: '',
        appName: '',
        appVersion: '',
        ficp: ''
      }
    }
  },
  mounted() {
    this.seachAuditForm()
  },
  methods: {
    goBlockChain(row) {
      this.dialogTableVisible = true
      this.blockSrc = `/finapp/finapp.html?txid=${row.blockchainHash}`
    },
    // 金融机构远程搜索
    finRemoteMethod() {},
    // 金融机构change
    finChange() {},
    // 监测机构远程搜索
    monitorRemoteMethod() {},
    // 监测机构change
    monitorChange() {},
    // 风险等级的change
    riskLevelChange() {},
    // 列表查询
    seachAuditForm(searchOrReset = true) {
      if (this.$route.name === 'organAdmin') {
        this.queryMessage.flag = '1'
      } else if (this.$route.name === 'riskMessage') {
        this.queryMessage.flag = '4'
      }
      if (searchOrReset) this.pageInfo.pageNumber = 1
      this.tableLoading = true
      const obj = Object.assign({}, this.queryMessage, this.auditForm, this.pageInfo)
      querySearch(obj).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.tableLoading = false
        if (searchOrReset) this.pageInfo.pageNumber = 1
      })
    },
    seachAuditFormb(searchOrReset = true) {
      if (this.$route.name === 'organAdmin') {
        this.queryMessage.flag = '1'
      } else if (this.$route.name === 'riskMessage') {
        this.queryMessage.flag = '4'
      }
      if (searchOrReset) this.pageInfob.pageNumber = 1
      this.tableLoadingb = true
      const obj = Object.assign({}, this.queryMessage, this.auditFormb, this.pageInfob)
      querySearch(obj).then(res => {
        this.tableDatab = res.list
        this.pageInfob.total = res.total
        this.tableLoadingb = false
        if (searchOrReset) this.pageInfob.pageNumber = 1
      })
    },
    seachAuditFormc(searchOrReset = true) {
      if (this.$route.name === 'organAdmin') {
        this.queryMessage.flag = '1'
      } else if (this.$route.name === 'riskMessage') {
        this.queryMessage.flag = '4'
      }
      if (searchOrReset) this.pageInfoc.pageNumber = 1
      this.tableLoadingc = true
      const obj = Object.assign({}, this.queryMessage, this.auditFormc, this.pageInfoc)
      querySearch(obj).then(res => {
        this.tableDatac = res.list
        this.pageInfoc.total = res.total
        this.tableLoadingc = false
        if (searchOrReset) this.pageInfoc.pageNumber = 1
      })
    },
    // 列表重置
    clearAuditForm() {
      if (this.$route.name === 'organAdmin') {
        this.queryMessage.flag = '1'
      } else if (this.$route.name === 'riskMessage') {
        this.queryMessage.flag = '4'
      }
      this.pageInfo.pageNumber = 1
      this.auditForm = {
        appName: '',
        riskType: '',
        riskLevel: '',
        isIgnore: '0'
      }
      this.tableLoading = true
      const obj = Object.assign({}, this.queryMessage, this.auditForm, this.pageInfo)
      querySearch(obj).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.tableLoading = false
        this.pageInfo.pageNumber = 1
      })
    },
    clearAuditFormb() {
      if (this.$route.name === 'organAdmin') {
        this.queryMessage.flag = '1'
      } else if (this.$route.name === 'riskMessage') {
        this.queryMessage.flag = '4'
      }
      this.pageInfob.pageNumber = 1
      this.auditFormb = {
        appName: '',
        riskType: '',
        riskLevel: '',
        isIgnore: '2'
      }
      this.tableLoadingb = true
      const obj = Object.assign({}, this.queryMessage, this.auditFormb, this.pageInfob)
      querySearch(obj).then(res => {
        this.tableDatab = res.list
        this.pageInfob.total = res.total
        this.tableLoadingb = false
        this.pageInfob.pageNumber = 1
      })
    },
    clearAuditFormc() {
      if (this.$route.name === 'organAdmin') {
        this.queryMessage.flag = '1'
      } else if (this.$route.name === 'riskMessage') {
        this.queryMessage.flag = '4'
      }
      this.pageInfoc.pageNumber = 1
      this.auditFormc = {
        appName: '',
        riskType: '',
        riskLevel: '',
        isIgnore: '1'
      }
      this.tableLoadingc = true
      const obj = Object.assign({}, this.queryMessage, this.auditFormc, this.pageInfoc)
      querySearch(obj).then(res => {
        this.tableDatac = res.list
        this.pageInfoc.total = res.total
        this.tableLoadingc = false
        this.pageInfoc.pageNumber = 1
      })
    },
    // 列表排序
    sortChange(column) {
      if (column.order === 'descending') {
        this.auditForm.sort = '1'
        this.seachAuditForm(false)
      } else if (column.order === 'ascending') {
        this.auditForm.sort = '0'
        this.seachAuditForm(false)
      }
    },
    sortChangeb(column) {
      if (column.order === 'descending') {
        this.auditFormb.sort = '1'
        this.seachAuditFormb(false)
      } else if (column.order === 'ascending') {
        this.auditFormb.sort = '0'
        this.seachAuditFormb(false)
      }
    },
    sortChangec(column) {
      if (column.order === 'descending') {
        this.auditFormc.sort = '1'
        this.seachAuditFormc(false)
      } else if (column.order === 'ascending') {
        this.auditFormc.sort = '0'
        this.seachAuditFormc(false)
      }
    },
    // 页码变化
    sizeChange(val) {
      this.pageInfo.pageSize = val
      this.seachAuditForm(false)
    },
    sizeChangeb(val) {
      this.pageInfob.pageSize = val
      this.seachAuditFormb(false)
    },
    sizeChangec(val) {
      this.pageInfob.pageSize = val
      this.seachAuditFormc(false)
    },
    // 条数变化
    currentChange(val) {
      this.pageInfo.pageNumber = val
      this.seachAuditForm(false)
    },
    currentChangeb(val) {
      this.pageInfob.pageNumber = val
      this.seachAuditFormb(false)
    },
    currentChangec(val) {
      this.pageInfoc.pageNumber = val
      this.seachAuditFormc(false)
    },
    // tab切换
    tebCheck() {
      this.dialogTips = false
      switch (this.activeName) {
        case '0':
          this.seachAuditForm(false)
          sessionStorage.setItem('tabMsg', '风险信息')
          break
        case '1':
          this.seachAuditFormb(false)
          sessionStorage.setItem('tabMsg', '已提醒')
          break
        case '2':
          this.seachAuditFormc(false)
          sessionStorage.setItem('tabMsg', '已忽略')
          break
      }
    },
    // 列表恢复
    recovery(id) {
      this.$confirm(
        '是否确定恢复该条数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        modify({ id, isIgnore: '0' }).then(res => {
          this.seachAuditFormc(false)
          this.$message({
            message: '已恢复该条数据！',
            type: 'success'
          })
        })
      }).catch(() => {})
    },
    // 列表忽略操作
    ignore(id) {
      this.$confirm(
        '是否确定忽略条数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        modify({ id, isIgnore: '1' }).then(res => {
          this.$message({
            message: '已忽略该条数据！',
            type: 'success'
          })
          this.seachAuditForm(false)
        })
      }).catch(() => {})
    },
    // 列表提醒操作
    remind(id, name) {
      this.$confirm(
        '是否确定提醒该风险？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        const obj = name === '已提醒' ? { id, sms: '1' } : { id, isIgnore: '2' }
        modify(obj).then(res => {
          if (name === '已提醒') {
            this.seachAuditFormb(false)
          } else {
            this.seachAuditForm(false)
          }
          this.$message({
            type: 'success',
            message: '提醒成功'
          })
        })
      }).catch(() => {})
    },
    look(val, data) {
      this.workType = val
      this.dialogTips = true
      this.dialogMsg = data
      this.disable = true
      this.fankui = false
    },
    dialogHide(val) {
      if (val === '确定') {
        this.dialogTips = false
      } else if (val === '取消') {
        this.dialogTips = false
      }
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
