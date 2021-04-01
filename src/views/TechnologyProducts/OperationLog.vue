<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>产品服务审核</span>
    </div>
    <div class="search">
      <el-form ref="auditFormc" :model="auditFormc" :rules="rules" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="金融机构名称" prop="rinm">
              <el-input v-model="auditFormc.rinm" type="text" placeholder="金融机构名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品与服务名称" prop="productName">
              <el-input v-model="auditFormc.productName" type="text" placeholder="产品与服务名称" clearable maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品与服务类型" prop="productType">
              <el-select v-model="auditFormc.productType" :clearable="true" placeholder="请选择">
                <el-option
                  v-for="item in productTypeList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作类型" prop="operation">
              <el-select v-model="auditFormc.operation" :clearable="true" placeholder="请选择">
                <el-option
                  v-for="item in operationList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="textRight">
            <el-button type="primary" @click="seachAuditFormc('auditFormc')">查 询</el-button>
            <el-button @click="clearAuditFormc('auditFormc')">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br>
    <el-table
      v-loading="IsloadingA"
      :data="tableDatac"
      @sort-change="sortChangec"
    >
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="rinm" label="金融机构名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" style="color:#000;cursor:default">{{ scope.row.rinm }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作类型" show-overflow-tooltip />
      <el-table-column prop="productName" min-width="100" label="产品与服务名称" show-overflow-tooltip />
      <el-table-column prop="productType" label="产品与服务类型" show-overflow-tooltip />
      <el-table-column prop="createTime" label="操作时间" sortable="custom" show-overflow-tooltip width="200">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageInfoc.pageNumber"
      :page-size="pageInfoc.pageSize"
      :total="totalc"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChangec"
      @current-change="handleCurrentChangec"
    />
    <el-dialog v-loading="blockloading" :visible.sync="dialogTableVisible" top="5vh" width="100%">
      <div id="block">
        <!-- <iframe :src="blockSrc" frameborder="0" /> -->
        <iframe id="china-block" :src="blockSrc" frameborder="0" marginWidth="20" marginHeight="0" width="100%" height="100%" scrolling="auto" />
      </div>
    </el-dialog>
    <el-dialog :visible.sync="returnAdviceVal" title="下架原因" width="60%" center>
      <hr class="hrStyle">
      <br>
      <div style="padding: 0 20px">
        <el-form ref="reportForm3" :model="reportForm3" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="原因" prop="comment">
                <el-input v-model="reportForm3.comment" :rows="5" type="textarea" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subReturn('reportForm3')">提 交</el-button>
        <el-button @click="returnAdviceVal = false">关 闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { commonValidate2 } from '@/utils/formValidate'
import { queryLog, pruductupdate } from '@/api/TechnologyProducts.js'
import { getClock } from '@/api/general.js'
export default {
  data() {
    return {
      id: '',
      operationList: [
        {
          value: '1',
          label: '查看详情'
        },
        {
          value: '2',
          label: '获取联系'
        }
      ],
      reportForm3: {
        comment: ''
      },
      returnAdviceVal: false,
      productTypeList: [],
      searchData: {},
      blockloading: false,
      blockSrc: '',
      dialogTableVisible: false,
      paramsObj: {
        sortKeyEstab: '0'
      },
      custRecoDialogVisible: false,
      isTrue: true,
      hlShow: true,
      IsloadingA: false,
      loading: null,
      paramsOldC: {},
      fileNames: [],
      fileList: [],
      fileNumA: true,
      auditFormc: {
        rinm: '',
        productName: '',
        productType: '',
        operation: '',
        sort: '1'
      },
      pageInfoc: {
        pageNumber: 1,
        pageSize: 10
      },
      totalc: 0,
      rules: {
        comment: [{ required: true, message: '内容不能为空且最多500位', trigger: 'blur', max: 500 }],
        rinm: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        productType: [{ required: false, validator: commonValidate2, trigger: 'blur' }],
        appName: [{ required: false, validator: commonValidate2, trigger: 'blur' }]
      },
      activeName: '0',
      tableDatac: []
    }
  },
  mounted() {
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.activeName = searchData.activeName
        this.pageInfoc = searchData.pageInfo
        this.auditFormc = searchData.searchForm
      }
    }

    getClock('C5900000').then(res => {
      this.productTypeList = res.map(item => {
        return {
          label: item.codeValue,
          value: item.codeKey
        }
      })
      this.getAuditFormc()
    })
  },
  methods: {
    subReturn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          pruductupdate({ submiSsion: '3', id: this.id, remark: this.reportForm3.comment }).then(res => {
            this.returnAdviceVal = false
            this.getAuditFormb()
            this.reportForm3.comment = ''
            this.$message({
              type: 'success',
              message: '下架成功'
            })
          })
        } else {
          return false
        }
      })
    },
    baibai(data) {
      this.returnAdviceVal = true
      this.id = data.id
    },
    returnDis(data) {
      if (data !== null && data !== '1' && data !== '') {
        return !(data === this.$store.getters.userName)
      } else {
        return false
      }
    },
    examine(data) {
      if (this.activeName === '0') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoa,
          searchForm: this.auditForm,
          activeName: this.activeName
        }
      } else if (this.activeName === '1') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfob,
          searchForm: this.auditFormb,
          activeName: this.activeName
        }
      } else if (this.activeName === '2') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoc,
          searchForm: this.auditFormc,
          activeName: this.activeName
        }
      }
      this.searchData.paramsObj = this.paramsObj
      this.$router.push({
        name: 'productDetail',
        query: {
          id: data.id,
          searchData: JSON.stringify(this.searchData),
          from: '2',
          type: '1',
          riid: data.riid
        }
      })
    },
    sortChangec(column) {
      if (column.order === 'descending') {
        this.auditFormc.sort = '1'
        this.getAuditFormc()
      } else if (column.order === 'ascending') {
        this.auditFormc.sort = '0'
        this.getAuditFormc()
      }
    },
    handleClick() {
      switch (this.activeName) {
        case '0':
          this.getAuditForm()
          sessionStorage.setItem('tabMsg', '待审核')
          break
        case '1':
          this.getAuditFormb()
          sessionStorage.setItem('tabMsg', '已发布')
          break
        case '2':
          this.getAuditFormc()
          sessionStorage.setItem('tabMsg', '已下架')
          break
      }
    },
    showDialog(data, name) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfoc,
        searchForm: this.auditFormc,
        activeName: this.activeName
      }

      this.searchData.paramsObj = this.paramsObj
      this.$router.push({
        name: 'productDetail',
        query: {
          id: data.id,
          searchData: JSON.stringify(this.searchData),
          name
        }
      })
    },
    seachAuditFormc(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormc()
        } else {
          return false
        }
      })
    },
    getAuditFormc() {
      this.pageInfoc.pageNumber = 1
      this.paramsObj = Object.assign({}, this.pageInfoc, this.auditFormc)
      this.IsloadingA = true
      queryLog(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list.map(item => {
          for (let i = 0; i < this.operationList.length; i++) {
            if (this.operationList[i].value === item.operation) {
              item.operation = this.operationList[i].label
              break
            }
          }
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsOldC = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachReportFormc(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getReportFormc()
        } else {
          return false
        }
      })
    },
    clearAuditFormc(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormc()
    },
    handleSizeChangec(val) {
      this.paramsOldC.pageSize = val
      this.pageInfoc.pageSize = val
      this.IsloadingA = true
      queryLog(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list.map(item => {
          for (let i = 0; i < this.operationList.length; i++) {
            if (this.operationList[i].value === item.operation) {
              item.operation = this.operationList[i].label
              break
            }
          }
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangec(val) {
      this.paramsOldC.pageNumber = val
      this.pageInfoc.pageNumber = val
      this.IsloadingA = true
      queryLog(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list.map(item => {
          for (let i = 0; i < this.operationList.length; i++) {
            if (this.operationList[i].value === item.operation) {
              item.operation = this.operationList[i].label
              break
            }
          }
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
      }).catch(() => {
        this.IsloadingA = false
      })
    }
  }
}
</script>
<style lang="scss">
.continue{
    .el-date-editor .el-range__close-icon{
    line-height: 24px
  }
  #block{
    iframe{
      min-height: calc(100vh - 120px);
    }
  }
}
</style>
