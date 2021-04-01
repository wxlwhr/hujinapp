<template>
  <el-card class="notice">
    <div slot="header" class="clearfix btnCard">
      <span>共享管理</span>
    </div>
    <div class="search">
      <el-form ref="formModel" :model="formModel" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="App名称" prop="appName">
              <el-input v-model="formModel.appName" placeholder="名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总部机构" prop="rinm">
              <el-input v-model.trim="formModel.rinm" placeholder="总部机构" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="共享状态" prop="isShare">
              <el-select v-model="formModel.isShare" placeholder="请选择">
                <el-option
                  v-for="item in statusArr"
                  :key="item.codeKey"
                  :label="item.codeLabel"
                  :value="item.codeValue"
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
    <el-table v-loading="IsloadingA" :data="tableData" tooltip-effect="dark">
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column label="App名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="showDialog(scope.row)">{{ scope.row.appName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="rinm" label="总部机构" show-overflow-tooltip />
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
      <el-table-column prop="appVersion" label="软件版本" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.appVersion===null?'--':scope.row.appVersion===''?'--':scope.row.appVersion }}
        </template>
      </el-table-column>
      <el-table-column prop="auditStatus" label="状态" show-overflow-tooltip />
      <el-table-column prop="bianhao" label="备案编号" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.recordNumber?scope.row.recordNumber:'--' }}
        </template>
      </el-table-column>
      <el-table-column label="共享状态" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.isShare === "1" ? '启用': '停用' }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageInfo.pageNumber"
      :page-size="pageInfo.pageSize"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog title="关联App的机构信息" :visible.sync="RelatedAppTips" width="60%" center>
      <el-table
        v-loading="IsloadingA"
        :data="RelatedAppData"
      >
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="rinm" label="机构名称" show-overflow-tooltip />
        <el-table-column prop="succ" label="统一社会信用代码" show-overflow-tooltip />
        <el-table-column prop="monitorName" label="机构联系人" show-overflow-tooltip />
        <el-table-column prop="managerTel" label="联系方式" show-overflow-tooltip />
      </el-table>
      <el-pagination
        :current-page="pageInfob.pageNumber"
        :page-size="pageInfob.pageSize"
        :total="totalb"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChangeb"
        @current-change="handleCurrentChangeb"
      />
    </el-dialog>
  </el-card>
</template>

<script>
import { commonValidate2 } from '@/utils/formValidate'
import { searchQuery } from '@/api/appbeian/register.js'
import { orgList } from '@/api/register/affiliates.js'
export default {
  data() {
    return {
      formModel: {
        appName: '',
        rinm: '',
        isShare: '1',
        auditStatus: '已备案',
        sort: '1'

      },
      RelatedAppTips: false,
      IsloadingA: false,
      isTrue: false,
      paramsOldA: {},
      searchData: {},
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      pageInfob: {
        pageNumber: 1,
        pageSize: 10
      },
      totalb: 0,
      tableData: [],
      RelatedAppData: [],
      statusArr: [
        {
          codeKey: '1',
          codeLabel: '启用',
          codeValue: '1'
        },
        {
          codeKey: '0',
          codeLabel: '停用',
          codeValue: '0'
        }
      ],
      rules: {
        title: [{ required: false, validator: commonValidate2, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    showDialog(row) {
      this.RelatedAppTips = true
      this.IsloadingA = true
      this.pageInfob.id = row.id
      orgList(this.pageInfob).then(res => {
        this.IsloadingA = false
        this.RelatedAppData = res.list
        this.totalb = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    // 获取列表数据
    getData() {
      this.pageInfo.pageNumber = 1
      const params = Object.assign({}, this.pageInfo, this.formModel)
      this.IsloadingA = true
      searchQuery(params).then(res => {
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
      this.getData()
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.paramsOldA.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldA).then(res => {
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
      searchQuery(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.total = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangeb(val) {
      this.pageInfob.pageSize = val
      this.IsloadingA = true
      orgList(this.pageInfob).then(res => {
        this.IsloadingA = false
        this.RelatedAppData = res.list
        this.totalb = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeb(val) {
      this.pageInfob.pageNumber = val
      this.IsloadingA = true
      orgList(this.pageInfob).then(res => {
        this.IsloadingA = false
        this.RelatedAppData = res.list
        this.totalb = res.total
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
