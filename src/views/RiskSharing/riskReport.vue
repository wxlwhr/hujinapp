<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>风险报告</span>
      <div class="elCardBtnBox">
        <el-button v-if="$store.getters.srnm !== '0'" type="primary" @click="newSetReport">新增</el-button>
      </div>
    </div>
    <div class="search">
      <el-form ref="auditForm" :model="auditForm" label-width="80px">
        <el-row :gutter="20">
          <el-col v-if="$store.getters.srnm !== '0'" :span="8">
            <el-form-item label="金融机构">
              <el-input v-model="auditForm.finMechanism" type="text" placeholder="金融机构" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="App名称">
              <el-input v-model="auditForm.appName" type="text" placeholder="App名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="100px" label="报告监测日期">
              <el-date-picker
                v-model="auditForm.monitorTime"
                :picker-options="pickerOptions1"
                value-format="yyyy-MM-dd"
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
      <el-table-column prop="rinm" label="金融机构" show-overflow-tooltip />
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
      <el-table-column prop="isAccept" label="是否采纳" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.isAccept === '0'?'未采纳':scope.row.isAccept === '1'?'已采纳':'未处理' }}
        </template>
      </el-table-column>
      <el-table-column prop="monitorTime" sortable="custom" label="报告监测日期" show-overflow-tooltip />
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button v-if="scope.row.isIgnore !== '1' && $store.getters.srnm === ''" type="text" @click="zhuanfa(scope.row.id)">
            转发
          </el-button>
          <el-button v-if="scope.row.isIgnore === '1' && $store.getters.srnm === '0' && scope.row.isAccept === '2'" type="text" @click="feedback(scope.row)">
            反馈
          </el-button>
          <el-button v-if="scope.row.isIgnore === '0' " type="text" @click="delReport(scope.row.id)">
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
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
    <el-dialog title="风险报告填写" :visible.sync="newSetVisible">
      <hr style="margin-bottom:20px;margin-top:10px">
      <el-form ref="newSetForm" v-loading="treeLoding" label-position="left" :model="newSetForm" label-width="85px">
        <el-row :gutter="20">
          <el-col :span="9">
            <el-form-item label="金融机构：">
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
            <el-form-item label="App名称：">
              <el-input v-model="newSetForm.appName" type="text" placeholder="APP名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="textRight">
            <el-button type="primary" @click="seachNewSetForm()">查 询</el-button>
            <el-button @click="newSetResetMsg()">重 置</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="invoice-list">
              <el-tree
                ref="newSetTreeData"
                :props="newSetProps"
                :data="newSetTreeTableData"
                show-checkbox
                @check-change="newSetTreeCheckChange"
              >
                <div slot-scope="{ node, data }" :disabled="true" class="custom-tree-node">
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
        <el-row :gutter="20" style="margin-top:30px">
          <el-col :span="14">
            <el-form-item label-width="110px" label="报告监测日期：">
              <el-date-picker
                v-model="newSetForm.monitorTime"
                :clearable="false"
                :picker-options="pickerOptions1"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label-width="110px" label="附件上传：" prop="fileName">
              <el-input v-show="false" v-model="newSetForm.fileName" placeholder="" />
              <el-upload
                ref="upload"
                :auto-upload="false"
                :on-change="handleChange"
                :file-list="fileList"
                :limit="100000"
                :on-exceed="handleExceed"
                :before-remove="beforeClearFile"
                :on-remove="clearFile"
                :on-preview="fileDownload"
                :on-progress="handleProgress"
                :on-error="handleAvatarerr"
                :on-success="handleAvatarSuccess"
                :action="actionUrl"
                class="upload-demo"
              >
                <el-button type="primary">选取文件<i class="el-icon-upload el-icon--right" /></el-button>
                <div slot="tip" class="el-upload__tip" style="font-size:12px;color:#303133;">只能上传.doc,.docx,.jpg,.png,.pdf,zip格式!且单个附件大小不超过10M</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="newSetVisible = false">取 消</el-button>
        <el-button type="primary" @click="newSetTrue">确 定</el-button>
      </div>
    </el-dialog>
    <lookResult v-if="dialogTips" :fankui="fankui" :disable="disable" :look-visible="dialogTips" :work-type="workType" :from="from" :dialog-msg="dialogMsg" @dialogHide="dialogHide" @getlist="getlist" />
  </el-card>
</template>
<script>
import { getUUIDWG } from '@/utils'
import lookResult from '@/views/RiskSharing/reportDialog'
import { deleteaAttach } from '@/api/register/register.js'
import { queryReportByRinm, queryOrg, queryReport, update, saveReport, updateReport, deleteReport } from '@/api/RiskSharing.js'
// import { getClock } from '@/api/general.js'
import { Notice } from '@/utils/formValidate'
export default {
  components: {
    lookResult
  },
  data() {
    return {
      uuid: getUUIDWG(),
      fankui: false,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      from: '报告',
      fileList: [],
      disable: false,
      dialogMsg: {},
      workType: '',
      dialogTips: false,
      newSetRinmOptions: [],
      treeLoding: false,
      props: {
        label: 'rinm', // 需要指定的节点渲染对象属性
        children: 'appRecordInfoList' // 指定的子级
      },
      newSetProps: {
        label: 'rinm', // 需要指定的节点渲染对象属性
        children: 'appRecordInfoList' // 指定的子级
      },
      riidNum: '',
      newSetTreeTableData: [],
      newSetVisible: false,
      checkAll: false,
      newSetOrginOptions: [],
      newSetWatchingOrginOptions: [],
      checked: [],
      organNmu: 0,
      AppNum: 0,
      newAppNum: 0,
      remnant: 0,
      newOrganNmu: 0,
      editionNum: 0,
      switchValue: true,
      newSetForm: {
        monitorTime: '',
        rinm: '',
        appName: '',
        fileName: ''
      },
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      auditForm: {
        monitorTime: '',
        finMechanism: '',
        appName: ''
      },
      addMsg: [],
      selectArr: [],
      newSetAddMsg: [],
      finOptions: [],
      monitorOptions: [],
      finLoading: false,
      monitorLoading: false,
      tableLoading: false,
      newSetName: '',
      newSetId: '',
      tableData: [],
      sort: '1'
    }
  },
  computed: {
    // 上传地址
    actionUrl() {
      return `nifa-autonomy-file/upload/upload-attach?noteId=${this.uuid}&ownSystem=29&ownBusiness=nifaReport`
    },
    queryMessage() {
      return {
        pageNumber: 1,
        pageSize: this.pageInfo.pageSize,
        rinm: this.auditForm.finMechanism,
        appName: this.auditForm.appName,
        monitorTime: this.auditForm.monitorTime,
        sort: this.sort
      }
    }
  },
  mounted() {
    this.queryMsg()
  },
  methods: {
    getlist() {
      this.queryMsg()
    },
    feedback(data) {
      this.dialogMsg = data
      this.dialogTips = true
      this.disable = false
      this.fankui = true
    },
    newSetReport() {
      this.fileList = []
      this.newSetVisible = true
    },
    fileDownload(file) {
      if (file.fileID) {
        location.href = `nifa-autonomy-file/upload/download/${file.fileID}`
      }
    },
    beforeClearFile(file) {
      return this.$confirm(`此操作将永久删除该文件, 是否继续?`, '提示', { type: 'warning' })
    },
    clearFile(file, fileList) {
      if (fileList.length > 0) {
        this.newSetForm.fileName = fileList[0].name
      } else {
        this.newSetForm.fileName = ''
      }
      if (file.fileID) {
        deleteaAttach(file.fileID).then(res => {
        }).catch(() => {

        })
      }
    },
    handleProgress(event, file, fileList) {
      if (this.flag) {
        fileList.forEach(element => {
          if (element.fileID === undefined) {
            this.flag = false
          }
        })
      }
    },
    handleExceed() {
      this.$message.error('最多只能选择10个文件!')
    },
    handleChange(file, fileList) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        fileList.splice(fileList.indexOf(file), 1)
        return false
      }
      if (!Notice(file)) {
        fileList.splice(fileList.indexOf(file), 1)
      }
      if (fileList.length > 0) {
        this.newSetForm.fileName = fileList[0].name
      }
    },
    // 上传文件成功的回调
    handleAvatarSuccess(res) {
      this.remnant += 1
      if (this.$refs['upload'].uploadFiles.length === this.remnant) {
        this.xinzeng()
      }
    },
    // 文件上传失败回调
    handleAvatarerr() {
      this.remnant += 1
      if (this.$refs['upload'].uploadFiles.length === this.remnant) {
        this.xinzeng()
      }
      // this.loading.close()
      // this.newSetForm.fileName = ''
      // this.flag = true
      // this.$refs.upload.clearFiles()
      // this.$confirm('您的附件上传失败请重新选择上传', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   center: true
      // })
      // return false
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
        return item
      })
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
      } else if (this.selectArr.length > 1) {
        this.$message({
          type: 'error',
          message: '只能选择一条！'
        })
      } else if (this.newSetForm.monitorTime === '') {
        this.$confirm(
          '请先选择报告监测日期！',
          '提示',
          {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          }
        ).then(() => {}).catch(() => {})
      } else if (this.$refs['upload'].uploadFiles.length <= 0) {
        this.$confirm(
          '请至少上传一个附件！',
          '提示',
          {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          }
        ).then(() => {

        })
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
          this.loading = this.$loading({
            lock: true
          })
          this.$refs.upload.submit()
        }).catch(() => {})
      }
    },
    xinzeng() {
      const obj = Object.assign({}, this.newSetAddMsg[0])
      obj.orgId = obj.riid
      obj.appId = obj.id
      obj.id = this.uuid
      obj.monitorTime = this.newSetForm.monitorTime
      saveReport(obj).then(res => {
        this.$message({
          message: '新增数据成功！',
          type: 'success'
        })
        this.riidNum = ''
        this.loading.close()
        this.newSetVisible = false
        this.queryMsg()
        this.newSetResetMsg()
        this.remnant = 0
        this.uuid = getUUIDWG()
      }).catch(res => {
        this.loading.close()
      })
    },
    // 列表查询
    queryMsg(searchOrReset = false) {
      if (searchOrReset) this.pageInfo.pageNumber = 1
      this.tableLoading = true
      const obj = Object.assign({}, this.queryMessage, this.pageInfo)
      if (this.$store.getters.srnm === '0') {
        obj.isIgnore = '1'
        obj.orgId = this.$store.getters.riid
      }
      queryReport(obj).then(res => {
        this.tableData = res.list
        this.total = res.total
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
      const selected = this.$refs.newSetTreeData.getCheckedNodes().filter(item => {
        return !item.appRecordInfoList
      })
      console.log(selected)
      if (selected.length > 1) {
        this.$message({
          type: 'error',
          message: '只能选择一条！'
        })
      }
      const arr1 = selected.filter(item => {
        return item.appRecordInfoList
      })
      const arr2 = selected.filter(item => {
        return item
      })
      this.selectArr = selected
      this.newSetAddMsg = arr2
      if (this.riidNum === '') {
        this.riidNum = this.newSetAddMsg[0].id
      }
      this.newOrganNmu = arr1.length
      this.newAppNum = arr2.length
    },
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
    // 列表转发
    zhuanfa(id) {
      this.$confirm(
        '是否确定将该报告转发至对应金融机构？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        updateReport({ isIgnore: '1', id }).then(res => {
          this.queryMsg()
          this.$message({
            message: '转发成功！',
            type: 'success'
          })
        })
      }).catch(() => {})
    },
    // 新增查询
    seachNewSetForm() {
      this.treeLoding = true
      queryReportByRinm({ rinm: this.newSetForm.rinm, appName: this.newSetForm.appName }).then(res => {
        this.newSetTreeTableData = res.map(item => {
          item.span = true
          item.disabled = true
          item.appRecordInfoList.map(item1 => {
            if (item1.isRisk === '0') item1.disabled = true
            return item1
          })
          return item
        })
        this.treeLoding = false
      })
    },
    // checkbox
    handleCheckedChange(val) {

    },
    // 列表删除
    delReport(id) {
      this.$confirm(
        '是否确定将该报告删除？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        deleteReport({ id }).then(res => {
          this.queryMsg()
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        })
      }).catch(() => {})
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
