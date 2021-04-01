<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>钓鱼仿冒</span>
      <span />
      <span style="position:absolute;right:10px">
        <span>是否开启自动获取数据</span>
        <el-switch
          v-model="switchValue"
          class="switchStyle"
          active-text="启用"
          inactive-text="停用"
          @change="switchChange"
        />
      </span>

    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="tebCheck">
      <el-tab-pane label="钓鱼仿冒信息" name="0">
        <div class="search">
          <el-form ref="auditForm" :model="auditForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="目标机构名称">
                  <el-input v-model="auditForm.rinm" type="text" placeholder="APP名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
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
                <el-form-item label="发现时间">
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
              <el-col :span="12" class="textLeft">
                <el-button type="primary" @click="getTaskData()">拉取数据</el-button>
              </el-col>
              <el-col :span="12" class="textRight">
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
          <el-table-column prop="rinm" label="目标机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.rinm ?scope.row.rinm:'--' }}
            </template>
          </el-table-column>
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
          <el-table-column prop="discoveryTime" label="发现时间" sortable="custom" show-overflow-tooltip />
          <el-table-column label="操作" min-width="135px">
            <template slot-scope="scope">
              <div>
                <el-button type="text" @click="ignore(scope.row.id)">
                  忽略
                </el-button>
                <el-button type="text" @click="remind(scope.row,'风险信息')">
                  提醒
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
          <el-form ref="auditFormb" :model="auditFormb" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="金融机构名称">
                  <el-input v-model="auditFormb.orgRinm" type="text" placeholder="APP名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="信息类型">
                  <el-select
                    v-model="auditFormb.type"
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
                <el-form-item label="提醒时间">
                  <el-date-picker
                    v-model="auditFormb.time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
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
          <el-table-column prop="orgRinm" label="金融机构名称" show-overflow-tooltip />
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
          <el-table-column prop="monitorName" label="联系人" show-overflow-tooltip />
          <el-table-column prop="isAccept" label="是否采纳" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.isAccept === '0'?'未采纳':scope.row.isAccept === '1'?'已采纳':'未处理' }}
            </template>
          </el-table-column>
          <el-table-column prop="remindTime" label="提醒时间" sortable="custom" show-overflow-tooltip />
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                <el-button :disabled="scope.row.sms === '1' || scope.row.isAccept !=='2'" type="text" @click="remind(scope.row,'已提醒')">
                  提醒
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
          <el-form ref="auditFormc" :model="auditFormc" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="信息类型">
                  <el-select
                    v-model="auditFormc.type"
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
                <el-form-item label="发现时间">
                  <el-date-picker
                    v-model="auditFormc.time"
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
          <el-table-column prop="rinm" label="目标机构名称" show-overflow-tooltip />
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
          <el-table-column prop="discoveryTime" label="发现时间" sortable="custom" show-overflow-tooltip />
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                <el-button type="text" @click="recovery(scope.row.id)">
                  恢复
                </el-button>
                <el-button type="text" @click="deleteData(scope.row.id)">
                  删除
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
    <lookResult v-if="dialogTips" :id="dialogId" :search-data="searchData" :disable="disable" :from="dialogType" :is-x-h="isXH" :look-visible="dialogTips" @dialogHide="dialogHide" />
    <el-dialog v-loading="blockloading" :visible.sync="dialogTableVisible" top="5vh" width="100%">
      <div id="block">
        <!-- <iframe :src="blockSrc" frameborder="0" /> -->
        <iframe id="china-block" :src="blockSrc" frameborder="0" marginWidth="20" marginHeight="0" width="100%" height="100%" scrolling="auto" />
      </div>
    </el-dialog>
    <el-dialog title="金融机构选择" :visible.sync="centerDialogVisible" width="35%" center>
      <div style="padding: 0 20px">
        <el-form ref="reportForm" :model="reportForm" label-width="110px" label-position="left">
          <el-row>
            <el-col :span="24">
              <el-form-item label="金融机构名称" prop="orgRinm">
                <el-select
                  v-model="reportForm.orgRinm"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="orgLoading"
                >
                  <el-option
                    v-for="item in orgOtions"
                    :key="item.rinm"
                    :label="item.rinm"
                    :value="item.rinm"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-alert
                :closable="false"
                title="点击提交后金融机构将受到钓鱼仿冒信息和短息提醒"
                center
                style="height:35px;margin-bottom:10px"
                type="warning"
              />
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="diaClose">关 闭</el-button>
        <el-button type="primary" @click="isReasonable('reportForm')">提 交</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>

import lookResult from '@/views/RiskSharing/fishingDialog'
import { fishingQuery, fishingUpdate, task, queryOrg, taskStatus, taskPull } from '@/api/RiskSharing.js'
export default {
  components: {
    lookResult
  },
  data() {
    return {
      isXH: true,
      dialogType: '',
      reportForm: {
        orgRinm: ''
      },
      orgLoading: false,
      orgOtions: [],
      centerDialogVisible: false,
      switchValue: true,
      fankui: false,
      blockSrc: '',
      blockloading: false,
      dialogTableVisible: false,
      disable: true,
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
        rinm: '',
        time: '',
        type: '',
        isIgnore: '0',
        sort: '1'
      },
      auditFormb: {
        isAccept: '',
        time: '',
        appName: '',
        type: '',
        isIgnore: '2',
        sort: '1'
      },
      dialogId: '',
      auditFormc: {
        time: '',
        rinm: '',
        type: '',
        isIgnore: '1',
        sort: '1'
      },
      finOptions: [],
      monitorOptions: [],
      remindId: '',
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
      finLoading: false,
      monitorLoading: false,
      tableLoading: false,
      tableLoadingb: false,
      tableLoadingc: false,
      tableData: [],
      tableDatab: [],
      tableDatac: [],
      searchData: {}
    }
  },
  computed: {
    queryMessage() {
      return {
        pageNumber: 1,
        pageSize: this.pageInfo.pageSize
      }
    }
  },
  mounted() {
    taskStatus().then(res => {
      if (res === '0') {
        this.switchValue = false
      } else {
        this.switchValue = true
      }
    })
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.activeName = searchData.activeName
        if (searchData.activeName === '0') {
          this.pageInfo = searchData.pageInfo
          this.auditForm = searchData.searchForm
          this.seachAuditForm()
        } else if (searchData.activeName === '1') {
          this.pageInfob = searchData.pageInfo
          this.auditFormb = searchData.searchForm
          this.seachAuditFormb()
        } else if (searchData.activeName === '2') {
          this.pageInfoc = searchData.pageInfo
          this.auditFormc = searchData.searchForm
          this.seachAuditFormc()
        }
      }
    } else {
      this.seachAuditForm()
    }
  },
  methods: {
    openUrl(url) {
      window.open(url)
    },
    getTaskData() {
      taskPull().then(res => {
        this.$message({
          type: 'success',
          message: '拉取成功'
        })
      })
    },
    diaClose() {
      this.centerDialogVisible = false
      this.orgOtions = []
    },
    isReasonable() {
      this.centerDialogVisible = false
      this.loading = this.$loading({
        lock: true
      })
      const obj = this.orgOtions.filter(item => item.rinm === this.reportForm.orgRinm)
      const data = {
        isIgnore: '2',
        id: this.remindId,
        befakedOrgId: obj[0].riid,
        orgRinm: obj[0].rinm,
        monitorName: obj[0].monitorName,
        managerTel: obj[0].managerTel
      }
      fishingUpdate(data).then(res => {
        this.seachAuditForm(false)
        this.loading.close()
        this.$message({
          type: 'success',
          message: '提醒成功'
        })
      })
    },
    switchChange(val) {
      if (!val) {
        task('0').then(res1 => {
          this.$message({
            type: 'success',
            message: '停用成功'
          })
        })
      } else {
        task('1').then(res2 => {
          this.$message({
            type: 'success',
            message: '启用成功'
          })
        })
      }
    },
    goBlockChain(row) {
      this.dialogTableVisible = true
      this.blockSrc = `/finapp/finapp.html?txid=${row.blockchainHash}`
    },
    // 金融机构远程搜索
    remoteMethod(val) {
      this.orgLoading = true
      queryOrg(val).then(res => {
        this.orgOtions = res
        this.orgLoading = false
      })
    },
    // 金融机构change
    finChange() {},
    // 监测机构远程搜索
    monitorRemoteMethod() {},
    // 监测机构change
    monitorChange() {},
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
      obj.startDate = obj.time ? '' : obj.time.length ? obj.time[0] : ''
      obj.endDate = obj.time ? '' : obj.time.length ? obj.time[1] : ''
      delete obj.time
      fishingQuery(obj).then(res => {
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
      obj.startRemindDate = obj.time === null ? '' : obj.time.length ? obj.time[0] : ''
      obj.endRemindDate = obj.time === null ? '' : obj.time.length ? obj.time[1] : ''
      delete obj.time
      fishingQuery(obj).then(res => {
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
      obj.startDate = obj.time === null ? '' : obj.time.length ? obj.time[0] : ''
      obj.endDate = obj.time === null ? '' : obj.time.length ? obj.time[1] : ''
      delete obj.time
      fishingQuery(obj).then(res => {
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
        rinm: '',
        time: '',
        type: '',
        isIgnore: '0'
      }
      this.tableLoading = true
      const obj = Object.assign({}, this.queryMessage, this.auditForm, this.pageInfo)
      fishingQuery(obj).then(res => {
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
        time: '',
        type: '',
        isIgnore: '2'
      }
      this.tableLoadingb = true
      const obj = Object.assign({}, this.queryMessage, this.auditFormb, this.pageInfob)
      fishingQuery(obj).then(res => {
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
        rinm: '',
        time: '',
        type: '',
        isIgnore: '1'
      }
      this.tableLoadingc = true
      const obj = Object.assign({}, this.queryMessage, this.auditFormc, this.pageInfoc)
      fishingQuery(obj).then(res => {
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
    deleteData(id) {
      this.$confirm(
        '是否确定删除该条数据？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        fishingUpdate({ id, deleteFlag: '1' }).then(res => {
          this.seachAuditFormc(false)
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        })
      }).catch(() => {})
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
        fishingUpdate({ id, isIgnore: '0' }).then(res => {
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
        fishingUpdate({ id, isIgnore: '1' }).then(res => {
          this.$message({
            message: '已忽略该条数据！',
            type: 'success'
          })
          this.seachAuditForm(false)
        })
      }).catch(() => {})
    },
    // 列表提醒操作
    remind(row, name) {
      this.reportForm.orgRinm = ''
      this.remindId = row.id
      if (name === '已提醒') {
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
          const obj = { id: row.id, sms: '1', managerTel: row.managerTel }
          fishingUpdate(obj).then(res => {
            this.seachAuditFormb(false)
            this.$message({
              type: 'success',
              message: '提醒成功'
            })
          })
        }).catch(() => {})
      } else {
        this.centerDialogVisible = true
      }
    },
    look(val, data) {
      this.dialogTips = true
      this.dialogId = data.id
      this.dialogType = data.type
      if (this.activeName === '0') {
        const obj = {
          pageName: this.$route.name,
          pageInfo: this.pageInfo,
          searchForm: this.auditForm,
          activeName: this.activeName
        }
        this.searchData = JSON.stringify(obj)
      } else if (this.activeName === '1') {
        const obj = {
          pageName: this.$route.name,
          pageInfo: this.pageInfob,
          searchForm: this.auditFormb,
          activeName: this.activeName
        }
        this.searchData = JSON.stringify(obj)
      } else if (this.activeName === '2') {
        const obj = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoc,
          searchForm: this.auditFormc,
          activeName: this.activeName
        }
        this.searchData = JSON.stringify(obj)
      }
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
<style lang="scss">
.btnCard{
  .switchStyle {
  transform: translateY(-2px);
}
  .switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
.switchStyle .el-switch__label--left {
  z-index: 9;
  left: 20px;
}
.switchStyle .el-switch__label--right {
  z-index: 9;
  left: -4px;
}
.switchStyle .el-switch__label.is-active {
  display: block;
}
.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 58px !important;
}
}

</style>
