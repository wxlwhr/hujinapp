<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>机构管理</span>
      <div class="elCardBtnBox">
        <el-button type="primary" @click="newSet">新增</el-button>
        <el-button type="primary" @click="moreNewSet">批量新增</el-button>
      </div>
    </div>
    <div class="search">
      <el-form ref="auditForm" :model="auditForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="金融机构">
              <el-input v-model="auditForm.finMechanism" type="text" placeholder="金融机构名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="监测机构">
              <el-input v-model="auditForm.monitorMechanism" type="text" placeholder="监测机构名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="App名称">
              <el-input v-model="auditForm.name" type="text" placeholder="App名称" clearable maxlength="50" />
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
      <el-table-column prop="rinm" label="金融机构名称" show-overflow-tooltip />
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
      <!-- <el-table-column prop="monitorName" label="金融机构联系人" show-overflow-tooltip />
      <el-table-column prop="managerTel" label="联系电话" show-overflow-tooltip /> -->
      <el-table-column prop="monitorOrgName" label="监测机构名称" show-overflow-tooltip width="180" />
      <!-- <el-table-column prop="ficp" label="机构类别" show-overflow-tooltip /> -->
      <el-table-column prop="createTime" sortable="custom" label="创建时间" show-overflow-tooltip />
      <el-table-column prop="bianhao" label="风险自动提醒" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.riskRemindFlag"
            class="switchStyle"
            active-text="开"
            inactive-text="关"
            @change="switchChange(scope.row,$event)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="deleteLine(scope.row.id)">
            删除
          </el-button>
          <el-button type="text" @click="look('查看',scope.row)">
            查看
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
    <el-dialog title="选择金融机构：" :visible.sync="moreNewSetVisible">
      <hr style="margin-bottom:20px;margin-top:20px">
      <el-form ref="moreNewSetForm" v-loading="treeLoding" :model="moreNewSetForm" label-width="80px">
        <el-row>
          <el-col :span="9">
            <el-form-item label="金融机构">
              <el-select v-model="moreNewSetForm.rinm" filterable clearable remote :remote-method="moreNewSetchange" placeholder="请输入关键词搜索">
                <el-option
                  v-for="item in moreNewSetRinmOptions"
                  :key="item.value"
                  :label="item.rinm"
                  :value="item.rinm"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="机构类别">
              <el-select v-model="moreNewSetForm.ficp" placeholder="请选择">
                <el-option
                  v-for="item in orginTypeOptions"
                  :key="item.codeKey"
                  :label="item.codeValue"
                  :value="item.codeValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="textRight">
            <el-button type="primary" @click="seachMoreNewSetForm()">查 询</el-button>
            <el-button @click="clearMoreNewSetForm()">重 置</el-button>
          </el-col>
        </el-row>
        <el-row>
          <div id="set-tips">
            <i class="el-icon-info" style="color:#108EE9;line-height:33px;margin-left:25px;font-size:18px" />
            <div>
              <p>已选择<span>{{ organNmu }}</span>家机构</p>
              <p> APP:<span>{{ AppNum }}</span>个</p>
              <!-- <p>版本:<span>{{ editionNum }}</span>个</p> -->
            </div>
          </div>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="invoice-list">
              <el-tree
                ref="treeData"
                :props="props"
                :data="treeTableData"
                show-checkbox
                @check-change="treeCheckChange"
              >
                <div slot-scope="{ node, data }" class="custom-tree-node">
                  <div v-if="data.span" class="total_info_box clearfix">
                    <el-row>
                      <el-col :span="12">
                        <span class="total_title" style="width:100%"> {{ data.rinm }}</span>
                      </el-col>
                      <el-col :span="12">
                        <span class="total_title" style="width:100%"> {{ data.appRecordInfoList.length>0? 'APP名称' : '暂无' }}</span>
                      </el-col>
                    </el-row>
                  </div>
                  <span v-else class="table_info_node">
                    <span class="table_info_item table_info_left">{{ data.isRisk === '0'?'已添加':data.isRisk ==='1'?'未添加':'--' }}</span>
                    <span class="table_info_item table_info_right">{{ data.appName }}  ({{ data.productType?data.productType :'--' }})</span>
                  </span>
                </div>
              </el-tree>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div style="font-size:18px;margin-top:20px;margin-bottom:10px">选择监测机构：</div>
          </el-col>
        </el-row>
        <hr style="margin-bottom:20px;margin-top:20px">
        <el-row style="margin-top:30px">
          <el-col :span="9">
            <el-form-item label="监测机构:">
              <el-select v-model="moreNewSetForm.watchingOrgin" filterable clearable remote :remote-method="newMoreJcSearch" placeholder="请输入关键词搜索" @change="moreWatchingOrginChange">
                <el-option
                  v-for="item in moreNewSetWatchingOrginOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="监测平台:" label-width="160px">
              <el-input v-model="moreNewSetForm.monitorOtherName" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="moreNewSetVisible = false">取 消</el-button>
        <el-button type="primary" @click="moreNewSetTrue">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择机构和App：" :visible.sync="newSetVisible">
      <hr style="margin-bottom:20px;margin-top:20px">
      <el-form ref="newSetForm" v-loading="treeLoding" :model="newSetForm" label-width="80px">
        <el-row>
          <el-col :span="9">
            <el-form-item label="金融机构:">
              <el-select v-model="newSetForm.rinm" filterable clearable remote :remote-method="newSetchange" placeholder="请输入关键词搜索">
                <el-option
                  v-for="item in newSetRinmOptions"
                  :key="item.value"
                  :label="item.rinm"
                  :value="item.rinm"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="App名称:">
              <el-input v-model="newSetForm.name" type="text" placeholder="APP名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="textRight">
            <el-button type="primary" @click="seachNewSetForm()">查 询</el-button>
            <el-button @click="newSetResetMsg()">重 置</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="invoice-list">
              <el-tree
                ref="newSetTreeData"

                :props="newSetProps"
                :data="newSetTreeTableData"
                show-checkbox
                @check-change="newSetTreeCheckChange"
              >
                <div slot-scope="{ node, data }" class="custom-tree-node">
                  <div v-if="data.span" class="total_info_box clearfix">
                    <el-row>
                      <el-col :span="12">
                        <span class="total_title" style="width:100%"> {{ data.rinm }}</span>
                      </el-col>
                      <el-col :span="12">
                        <span class="total_title" style="width:100%">
                          {{ data.appRecordInfoList.length>0? 'APP名称' : '暂无' }}
                        </span>
                      </el-col>
                    </el-row>
                  </div>
                  <span v-else class="table_info_node">
                    <span class="table_info_item table_info_left">{{ data.isRisk === '0'?'已添加':data.isRisk ==='1'?'未添加':'--' }}</span>
                    <span class="table_info_item table_info_right">{{ data.appName }}  ({{ data.productType?data.productType :'--' }})</span>
                  </span>
                </div>
              </el-tree>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div style="font-size:18px;margin-top:20px;margin-bottom:10px">选择监测机构：</div>
          </el-col>
        </el-row>
        <hr style="margin-bottom:20px;margin-top:20px">
        <el-row style="margin-top:30px">
          <el-col :span="9">
            <el-form-item label="监测机构:">
              <el-select v-model="newSetForm.watchingOrgin" filterable clearable remote :remote-method="newJcSearch" placeholder="请输入关键词搜索" @change="watchingOrginChange">
                <el-option
                  v-for="item in newSetWatchingOrginOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="监测平台:" label-width="160px">
              <el-input v-model="newSetForm.monitorOtherName" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="newSetVisible = false">取 消</el-button>
        <el-button type="primary" @click="newSetTrue">确 定</el-button>
      </div>
    </el-dialog>
    <lookResult v-if="dialogTips" :disable="disable" :look-visible="dialogTips" :work-type="workType" :from="from" :dialog-msg="dialogMsg" @dialogHide="dialogHide" />
  </el-card>
</template>
<script>
import lookResult from '@/views/RiskSharing/dialog'
import { newSet, queryByRinm, queryMonitor, queryOrg, querySearch, update } from '@/api/RiskSharing.js'
import { getClock } from '@/api/general.js'
export default {
  components: {
    lookResult
  },
  data() {
    return {
      from: '监管',
      disable: false,
      dialogMsg: {},
      workType: '',
      dialogTips: false,
      newSetRinmOptions: [],
      moreNewSetRinmOptions: [],
      treeLoding: false,
      props: {
        label: 'rinm', // 需要指定的节点渲染对象属性
        children: 'appRecordInfoList' // 指定的子级
      },
      newSetProps: {
        label: 'rinm', // 需要指定的节点渲染对象属性
        children: 'appRecordInfoList' // 指定的子级
      },
      treeTableData: [],
      newSetTreeTableData: [],
      newSetVisible: false,
      checkAll: false,
      moreNewSetWatchingOrginOptions: [],
      newSetOrginOptions: [],
      newSetWatchingOrginOptions: [],
      checked: [],
      organNmu: 0,
      AppNum: 0,
      newAppNum: 0,
      newOrganNmu: 0,
      editionNum: 0,
      moreSetTableLoading: false,
      switchValue: true,
      newSetForm: {
        rinm: '',
        watchingOrgin: '',
        name: '',
        monitorOtherName: ''
      },
      moreNewSetForm: {
        rinm: '',
        ficp: '',
        watchingOrgin: '',
        monitorOtherName: ''
      },
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      auditForm: {
        finMechanism: '',
        monitorMechanism: '',
        name: ''
      },
      addMsg: [],
      newSetAddMsg: [],
      finOptions: [],
      monitorOptions: [],
      orginTypeOptions: [],
      moreNewSetVisible: false,
      finLoading: false,
      monitorLoading: false,
      tableLoading: false,
      newSetName: '',
      moreNewSetName: '',
      newSetId: '',
      moreNewSetId: '',
      tableData: [],
      sort: '1'
    }
  },
  computed: {
    queryMessage() {
      return {
        pageNumber: 1,
        pageSize: this.pageInfo.pageSize,
        rinm: this.auditForm.finMechanism,
        monitorOrgName: this.auditForm.monitorMechanism,
        appName: this.auditForm.name,
        isAccept: '',
        riskLevel: '',
        // appName: '',
        appVersion: '',
        ficp: '',
        sort: this.sort
      }
    }
  },
  mounted() {
    // queryByRinm({ rinm: '', ficp: '' }).then(res => {
    //   this.treeTableData = res.map(item => {
    //     item.span = true
    //     return item
    //   })
    // })
    this.queryMsg()
    getClock('C5000000').then(res => {
      this.orginTypeOptions = res
    })
  },
  methods: {
    newJcSearch(val) {
      queryMonitor(val).then(res => {
        this.newSetWatchingOrginOptions = res.map(item => {
          return {
            name: item.rinm,
            id: item.riid
          }
        })
      })
    },
    newMoreJcSearch(val) {
      queryMonitor(val).then(res => {
        this.moreNewSetWatchingOrginOptions = res.map(item => {
          return {
            name: item.rinm,
            id: item.riid
          }
        })
      })
    },
    dialogHide(val) {
      if (val === '确定') {
        this.dialogTips = false
      } else if (val === '取消') {
        this.dialogTips = false
      }
    },
    look(val, data) {
      this.workType = val
      this.dialogTips = true
      this.dialogMsg = data
      this.disable = true
    },
    switchChange(data, val) {
      if (val) {
        this.$confirm(
          '是否确定开启自动提醒？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }
        ).then(() => {
          update({ id: data.id, riskRemindFlag: val }).then(res => {
            this.$message(
              {
                message: '开启成功！',
                type: 'success'
              }
            )
          })
        }).catch(() => {
          data.riskRemindFlag = false
        })
      } else {
        this.$confirm(
          '是否确定关闭自动提醒？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }
        ).then(() => {
          update({ id: data.id, riskRemindFlag: val }).then(res => {
            this.$message(
              {
                message: '关闭成功！',
                type: 'success'
              }
            )
          })
        }).catch(() => {
          data.riskRemindFlag = true
        })
      }
    },
    watchingOrginChange(val) {
      let obj = {}
      obj = this.newSetWatchingOrginOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === val // 筛选出匹配数据
      })
      this.newSetName = obj.name
      this.newSetId = obj.id
      console.log(val, this.newSetWatchingOrginOptions)
    },
    moreWatchingOrginChange(val) {
      let obj = {}
      obj = this.moreNewSetWatchingOrginOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === val // 筛选出匹配数据
      })
      this.moreNewSetName = obj.name
      this.moreNewSetId = obj.id
    },
    // 金融机构模糊查询
    moreNewSetchange(val) {
      queryOrg(val).then(res => {
        this.moreNewSetRinmOptions = res
      })
    },
    // 金融机构模糊查询
    newSetchange(val) {
      queryOrg(val).then(res => {
        this.newSetRinmOptions = res
      })
    },
    // 新增确认
    newSetTrue() {
      this.newSetAddMsg.map(item => {
        item.monitorId = this.newSetId
        item.monitorOrgName = this.newSetName
        item.monitorOtherName = this.newSetForm.monitorOtherName
        return item
      })
      console.log(this.newSetAddMsg, 888)
      if (this.newAppNum === 0) {
        this.$confirm(
          '请先选择数据（所选数据必须包含APP）！',
          '提示',
          {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          }
        ).then(() => {}).catch(() => {})
      } else if (this.newSetForm.watchingOrgin === '') {
        this.$confirm(
          '请先选择监测机构！',
          '提示',
          {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          }
        ).then(() => {}).catch(() => {})
      } else {
        this.$confirm(
          '是否确认新增？',
          '提示',
          {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          }
        ).then(() => {
          newSet(this.newSetAddMsg).then(res => {
            this.$message({
              message: '新增数据成功！',
              type: 'success'
            })
            this.newSetVisible = false
            this.queryMsg()
            this.newSetResetMsg()
          })
        }).catch(() => {})
      }
    },
    // 列表查询
    queryMsg(searchOrReset = false) {
      if (this.$route.name === 'organAdmin') {
        this.queryMessage.flag = '1'
      } else if (this.$route.name === 'riskMessage') {
        this.queryMessage.flag = '4'
      }
      if (searchOrReset) this.pageInfo.pageNumber = 1
      this.tableLoading = true
      const obj = Object.assign({}, this.queryMessage, this.pageInfo)
      querySearch(obj).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.tableLoading = false
        if (searchOrReset) this.pageInfo.pageNumber = 1
      })
    },
    // 列表重置
    resetMsg() {
      this.auditForm = {
        finMechanism: '',
        monitorMechanism: ''
      }
    },
    // 批量新增列表查询
    moreNewSetQueryMsg() {},
    // 批量新增重置
    moreNewSetResetMsg() {
      this.moreNewSetForm = {
        rinm: '',
        ficp: '',
        watchingOrgin: ''
      }
    },
    // 新增列表查询
    newSetQueryMsg() {},
    // 新增重置
    newSetResetMsg() {
      this.newSetForm = {
        rinm: '',
        watchingOrgin: ''
      }
      this.seachNewSetForm()
    },
    // 新增treeChange
    newSetTreeCheckChange(val) {
      const selected = this.$refs.newSetTreeData.getCheckedNodes()
      const arr1 = selected.filter(item => {
        return item.appRecordInfoList
      })
      const arr2 = selected.filter(item => {
        return item.appName
      })
      this.newSetAddMsg = arr2
      this.newOrganNmu = arr1.length
      this.newAppNum = arr2.length
    },
    // 批量新增treeChange
    treeCheckChange(val) {
      // 使用getCheckedNodes可以获取当前被选中的节点数据
      const selected = this.$refs.treeData.getCheckedNodes()
      const arr1 = selected.filter(item => {
        return item.appRecordInfoList
      })
      const arr2 = selected.filter(item => {
        return item.appName
      })
      this.addMsg = arr2
      this.organNmu = arr1.length
      this.AppNum = arr2.length
    },
    // 获取批量新增tree数据
    getTreeTableData() {
    },
    // 获取新增tree数据
    getNewSetTableData() {
    },
    // 新建
    newSet() {
      this.newSetVisible = true
    },
    // 批量新建
    moreNewSet() {
      this.moreNewSetVisible = true
    },
    // 金融机构远程搜索
    finRemoteMethod() {},
    // 金融机构change
    finChange() {},
    // 监测机构远程搜索
    monitorRemoteMethod() {},
    // 监测机构change
    monitorChange() {},
    // 列表查询
    seachAuditForm() {
      this.tableLoading = true
      this.queryMsg(true)
    },
    // 列表重置
    clearAuditForm() {
      this.auditForm = {
        finMechanism: '',
        monitorMechanism: ''
      }
      this.tableLoading = true
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
    // 批量新建列表排序
    moreSetSortChange() {},
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
    // 列表删除
    deleteLine(id) {
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
        update({ id, deleteFlag: '1' }).then(res => {
          this.queryMsg()
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        })
      }).catch(() => {})
    },
    // 批量新增确认
    moreNewSetTrue() {
      this.addMsg.map(item => {
        item.monitorOrgName = this.moreNewSetName
        item.monitorId = this.moreNewSetId
        item.monitorOtherName = this.moreNewSetForm.monitorOtherName
        return item
      })
      if (this.AppNum === 0) {
        this.$confirm(
          '请先选择数据（所选数据必须包含APP）！',
          '提示',
          {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          }
        ).then(() => {}).catch(() => {})
      } else if (this.moreNewSetForm.watchingOrgin === '') {
        this.$confirm(
          '请先选监测机构！',
          '提示',
          {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          }
        ).then(() => {}).catch(() => {})
      } else {
        this.$confirm(
          '是否确认新增？',
          '提示',
          {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          }
        ).then(() => {
          newSet(this.addMsg).then(res => {
            this.$message({
              message: '新增数据成功！',
              type: 'success'
            })
            this.moreNewSetVisible = false
            this.queryMsg()
            this.clearMoreNewSetForm()
          })
        }).catch(() => {})
      }
    },
    // 批量新增查询
    seachMoreNewSetForm() {
      this.treeLoding = true
      queryByRinm({ rinm: this.moreNewSetForm.rinm, ficp: this.moreNewSetForm.ficp }).then(res => {
        this.treeTableData = res.map(item => {
          item.span = true
          // item.appRecordInfoList.map(item1 => {
          //   if (item1.isRisk === '0') item1.disabled = true
          //   return item1
          // })
          return item
        })
        this.treeLoding = false
      })
    },
    // 批量新增重置
    clearMoreNewSetForm() {
      this.moreNewSetForm.rinm = ''
      this.moreNewSetForm.ficp = ''
      this.seachMoreNewSetForm()
    },
    // 批量新增列表选择
    selectChange(select, row) {
      this.organNmu = select.length
    },
    // 批量新增列表全选
    selectAll(select) {
      this.organNmu = select.length
    },
    // 新增查询
    seachNewSetForm() {
      this.treeLoding = true
      queryByRinm({ rinm: this.newSetForm.rinm, appName: this.newSetForm.name }).then(res => {
        this.newSetTreeTableData = res.map(item => {
          item.span = true
          // item.appRecordInfoList.map(item1 => {
          //   if (item1.isRisk === '0') item1.disabled = true
          //   return item1
          // })
          return item
        })
        this.treeLoding = false
      })
    },
    // checkbox
    handleCheckedChange(val) {

    }
  }
}
</script>
<style lang="scss">
.el-table__expanded-cell{
    padding:0 !important
  }
#set-tips{
  background: #E6F7FF;
  border:1px solid #91D5FF;
  height: 35px;
  border-radius: 4px;
  div{
    margin-left: 10px;
    display: inline;
  }
  p{
    margin: 0 10px;
    display: inline;
  }
  span{
     margin: 0 4px;
    color: #10AAF2;
  }
}
.switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
.switchStyle .el-switch__label--left {
  z-index: 9;
  left: 6px;
}
.switchStyle .el-switch__label--right {
  z-index: 9;
  left: -16px;
}
.switchStyle .el-switch__label.is-active {
  display: block;
}
.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 54px !important;
}
.invoice-list {
    .custom-tree-node .total_info_box{
     margin-left: 17.5px;
     text-align: center;
     .total_title{
       _border-left: 1px solid #ebeef5;
     }
   }
    border: 1px solid #ebeef5;
    margin-top: 10px;
    .invoice-header {
      text-align: center;
      display: flex;
      padding-left: 63px;
      border-bottom: 1px solid #ebeef5;
      .invoice-item {
        padding: 10px;
        padding-right: 0;
        flex: 1;
        _border-left: 1px solid #ebeef5;
      }
    }
   .el-tree-node__content {
      height: 40px;
      text-align: center;
      display: flex;
      padding-left: 63px;
      border-bottom: 1px solid #ebeef5;
    }
    .el-tree-node__children {
      .el-tree-node__content {
        border-bottom: 1px solid #ebeef5;
      }
    }
     .custom-tree-node {
      width: 100%;
      height: 100%;
      .total_info_box {
        line-height: 40px;
        span{
          float: left;
          font-size: 12px;
          i{
            display: inline-block;
            margin-right: 3px;
          }
        }
      }
      .table_info_node {
        display: flex;
        height: 100%;
        .table_info_item {
          flex: 1;
          height: 100%;
          _border-left: 1px solid #ebeef5;
          padding-left: 10px;
          line-height: 40px;
        }
        .table_info_left{
          font-size: 12px;
        }
        .table_info_right{
          border: none;
          font-size: 12px;
        }
      }
    }
  }
</style>
