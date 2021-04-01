
<template>
  <el-card class="continue11">
    <div slot="header" class="clearfix btnCard">
      <span>备案版本更新</span>
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
            <el-form-item label="当前状态">
              <el-select
                v-model="auditForm.auditStatus"
                filterable
                @change="auditStatusChange"
              >
                <el-option
                  v-for="item in auditStatusOptions"
                  :key="item.name"
                  :label="item.codeValue"
                  :value="item.codeValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="提醒状态">
              <el-select
                v-model="auditForm.isIgnore"
                filterable
                @change="isIgnoreChange"
              >
                <el-option
                  v-for="item in isIgnoreOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="版本一致">
              <el-select
                v-model="auditForm.isVersion"
                filterable
                clearable
              >
                <el-option
                  v-for="item in isVersionOptions"
                  :key="item.name"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="textLight">
            <div class="upload">
              <el-button type="primary" style="marginRight:15px" @click="riskDownload()">下载模板</el-button>
              <el-upload
                ref="upload1"
                :on-change="handleChange1"
                :show-file-list="false"
                :on-success="handleAvatarSuccess1"
                :on-error="handleAvatarerr"
                :action="actionUrl"
                class="upload-demo"
                style="display:inline;"
              >
                <el-button type="primary">上传更新记录<i class="el-icon-upload el-icon--right" /></el-button>
              </el-upload>
            </div>
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
      <el-table-column prop="appName" label="APP名称" show-overflow-tooltip />
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
      <el-table-column prop="appVersion" label="APP版本" show-overflow-tooltip />
      <el-table-column label="最新版本" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.newVersion === null?'--':scope.row.newVersion }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="备案日期" sortable="custom" show-overflow-tooltip />
      <el-table-column prop="auditStatus" label="当前状态" show-overflow-tooltip />
      <el-table-column label="提醒状态" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.isIgnore === '0'?'未提醒':'已提醒' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="lookResult(scope.row)">
            更新提醒
          </el-button>
          <el-button type="text" @click="feedback(scope.row)">
            查看版本
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
    <el-dialog
      title="更新提醒"
      :visible.sync="dialogTableVisible"
      width="1200px"
    >
      <el-form ref="form" :model="form">
        <fieldset class="fieldsetStyle">
          <legend style="margin-left: 40px; font-size:17px">历史提醒</legend>
          <el-row>
            <el-col>
              <el-table
                v-loading="tableLoadingb"
                :data="tableDataB"
                @sort-change="sortChange"
              >
                <el-table-column label="序号" type="index" width="50" />
                <el-table-column prop="appVersion" min-width="100" label="APP版本" show-overflow-tooltip />
                <el-table-column prop="updateTime" min-width="100" label="提醒时间" show-overflow-tooltip />
                <el-table-column prop="updateUser" min-width="100" label="操作人" show-overflow-tooltip />
              </el-table>
            </el-col>
          </el-row>
        </fieldset>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="remind">提 醒</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { version, versionRemind, his } from '@/api/zilv.js'
import { excel } from '@/utils/formValidate'
export default {
  data() {
    return {
      remindId: '',
      form: {},
      tableLoadingb: false,
      blockloading: false,
      dialogTableVisible: false,
      blockSrc: '',
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      auditForm: {
        appName: '',
        auditStatus: '',
        isIgnore: '',
        isVersion: ''
      },
      organTypeOptions: [],
      isVersionOptions: [
        {
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
      ],
      auditStatusOptions: [
        {
          codeKey: '01',
          codeValue: '待提交检测'
        },
        {
          codeKey: '02',
          codeValue: '待检测'
        },
        {
          codeKey: '03',
          codeValue: '已检测待认证'
        },
        {
          codeKey: '04',
          codeValue: '已认证待初审'
        },
        {
          codeKey: '05',
          codeValue: '复审待审核'
        },
        {
          codeKey: '06',
          codeValue: '审核未通过'
        },
        {
          codeKey: '07',
          codeValue: '已备案'
        },
        {
          codeKey: '08',
          codeValue: '检测退至金融机构'
        },

        {
          codeKey: '09',
          codeValue: '认证退至金融机构'
        },

        {
          codeKey: '10',
          codeValue: '检测退至认证机构'
        },

        {
          codeKey: '11',
          codeValue: '认证退至检测机构'
        },
        {
          codeKey: '12',
          codeValue: '协会退至认证机构'
        },
        {
          codeKey: '13',
          codeValue: '协会退至检测机构'
        },

        {
          codeKey: '14',
          codeValue: '已注销'
        },
        {
          codeKey: '15',
          codeValue: '已过期'
        }
      ],
      searchData: {},
      isIgnoreOptions: [
        {
          name: '未提醒',
          label: '0'
        },
        {
          name: '已提醒',
          label: '1'
        }
      ],
      tableLoading: false,
      tableData: [],
      tableDataB: [],
      sort: '1'
    }
  },
  computed: {
    actionUrl() {
      return `nifaReport/dsp/InputExcel?username=${this.$store.state.user.userName}`
    }
  },
  mounted() {
    console.log(this.$route.params.searchData)
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.pageInfo = searchData.pageInfo
        this.auditForm = searchData.searchForm
        this.sort = searchData.sort
      }
    }
    this.queryMsg()
  },
  methods: {
    remind() {
      this.dialogTableVisible = false
      versionRemind(this.remindId).then(res => {
        this.$message({
          type: 'success',
          message: '提醒成功！'
        })
        this.queryMsg()
      })
    },
    riskDownload() {
      location.href = `nifaReport/dsp/download`
    },
    // 上传文件成功的回调
    handleAvatarSuccess1(res) {
      if (res.code === 200) {
        if (res.message === '导入成功！！！') {
          this.$message({
            message: res.message,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },
    handleAvatarerr() {
      this.loading.close()
      // this.form.fileName1 = ''
      this.$confirm('您的其他信息文件失败请重新选择上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
      return false
    },
    handleChange1(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        // this.form.fileName1 = fileList[0].name
      } else {
        // this.form.fileName1 = fileList[0].name
      }
      // const isLt10M = file.size / 1024 / 1024 < 260
      // if (!isLt10M) {
      //   this.$message.error('上传文件大小不能超过 260MB!')
      //   this.form.fileName1 = ''
      //   return false
      // }
      if (!excel(file)) {
        // this.form.fileName1 = ''
      }
    },
    queryMsg(searchOrReset = false) {
      this.tableLoading = true
      if (searchOrReset) this.pageInfo.pageNumber = 1
      const obj = Object.assign({}, this.auditForm, this.pageInfo)
      obj.stampPath = this.sort
      version(obj).then(res => {
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
    auditStatusChange() {},
    // 是否采纳change
    isIgnoreChange() {},
    // 列表查询
    seachAuditForm() {
      this.queryMsg(true)
    },
    // 列表重置
    clearAuditForm() {
      this.auditForm = {
        appName: '',
        auditStatus: '',
        isIgnore: '',
        isVersion: ''
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
    // 更新提醒
    lookResult(data) {
      this.remindId = data.id
      this.dialogTableVisible = true
      this.tableLoadingb = true
      const obj = {
        pageNumber: '1',
        pageSize: '10',
        type: '2',
        appId: data.id
      }
      his(obj).then(res => {
        this.tableDataB = res.list
        this.tableLoadingb = false
      })
    },
    // 查看版本
    feedback(data) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfo,
        searchForm: this.auditForm,
        stampPath: this.sort
      }
      this.$router.push({
        name: 'versionDetail',
        query: {
          id: data.id,
          searchData: JSON.stringify(this.searchData)
        }
      })
    },
    getXlsMsg(val) {
      this.tableData = val
    }
  }
}
</script>
<style lang="scss">
.continue11{
  .el-dialog__header{
    text-align: center;
  }
  .upload{
  .el-button--primary{
    font-size: 14px !important;
    padding: 12px 20px;
  }
  .el-icon-upload{
    display: none;
  }
}
}

</style>

