<template>
  <el-card class="continue">
    <div slot="header" class="clearfix btnCard">
      <span>产品服务审核</span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="0">
        <div class="search">
          <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="110px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="auditForm.companyName" type="text" placeholder="公司名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品与服务名称" prop="productName">
                  <el-input v-model="auditForm.productName" type="text" placeholder="产品与服务名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型" prop="productType">
                  <el-select v-model="auditForm.productType" :clearable="true" placeholder="请选择">
                    <el-option
                      v-for="item in productTypeList"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="datepicker">
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker
                    v-model="auditForm.createTime"
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
                <el-button type="primary" @click="seachAuditForm('auditForm')">查 询</el-button>
                <el-button @click="clearAuditForm('auditForm')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableData"
          @sort-change="sortChange"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="productName" min-width="100" label="产品与服务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,2)">{{ scope.row.productName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productType" label="类型" show-overflow-tooltip />
          <el-table-column prop="companyName" label="公司名称" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.companyName===null?'--':scope.row.companyName===''?'--':scope.row.companyName }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="examine(scope.row)">
                审核
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="pageInfoa.pageNumber"
          :page-size="pageInfoa.pageSize"
          :total="totala"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangea"
          @current-change="handleCurrentChangea"
        />
      </el-tab-pane>
      <el-tab-pane label="已发布" name="1">
        <div class="search">
          <el-form ref="auditFormb" :model="auditFormb" :rules="rules" label-width="110px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="auditFormb.companyName" type="text" placeholder="公司名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品与服务名称" prop="productName">
                  <el-input v-model="auditFormb.productName" type="text" placeholder="产品与服务名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型" prop="productType">
                  <el-select v-model="auditFormb.productType" :clearable="true" placeholder="请选择">
                    <el-option
                      v-for="item in productTypeList"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="datepicker">
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker
                    v-model="auditFormb.createTime"
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
                <el-button type="primary" @click="seachAuditFormb('auditFormb')">查 询</el-button>
                <el-button @click="clearAuditFormb('auditFormb')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatab"
          @sort-change="sortChangeb"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="productName" min-width="100" label="产品与服务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row)">{{ scope.row.productName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productType" label="类型" show-overflow-tooltip />
          <el-table-column prop="companyName" label="公司名称" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.companyName===null?'--':scope.row.companyName===''?'--':scope.row.companyName }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="update(scope.row)">更新</el-button> -->
              <el-button type="text" @click="baibai(scope.row)">下架</el-button>
            </template>
          </el-table-column>
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
      </el-tab-pane>
      <el-tab-pane label="已下架" name="2">
        <div class="search">
          <el-form ref="auditFormc" :model="auditFormc" :rules="rules" label-width="110px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="auditFormc.companyName" type="text" placeholder="公司名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品与服务名称" prop="productName">
                  <el-input v-model="auditFormc.productName" type="text" placeholder="产品与服务名称" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型" prop="productType">
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
              <el-col :span="8" class="datepicker">
                <el-form-item label="创建时间" prop="createTime">
                  <el-date-picker
                    v-model="auditFormc.createTime"
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
          <el-table-column prop="productName" min-width="100" label="产品与服务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="showDialog(scope.row,'已下架')">{{ scope.row.productName }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productType" label="类型" show-overflow-tooltip />
          <el-table-column prop="companyName" label="公司名称" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.companyName===null?'--':scope.row.companyName===''?'--':scope.row.companyName }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable="custom" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" :disabled="returnDis(scope.row.approveReturnFlag)" @click="tableExamine(scope.row,'tableExamine')">
                同意
              </el-button>
              <el-button type="text" :disabled="returnDis(scope.row.approveReturnFlag)" @click="tableExamine(scope.row,'tableExamine')">
                不同意
              </el-button>
            </template>
          </el-table-column> -->
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
      </el-tab-pane>
    </el-tabs>
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
import { query, pruductupdate } from '@/api/TechnologyProducts.js'
import { getClock } from '@/api/general.js'
export default {
  data() {
    return {
      id: '',
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
      paramsOldA: {},
      paramsOldB: {},
      paramsOldC: {},
      fileNames: [],
      fileList: [],
      fileNumA: true,
      auditForm: {
        companyName: '',
        productName: '',
        productType: '',
        createTime: ''
      },
      pageInfoa: {
        pageNumber: 1,
        pageSize: 10
      },
      totala: 0,
      auditFormb: {
        companyName: '',
        productName: '',
        productType: '',
        createTime: ''
      },
      auditFormc: {
        companyName: '',
        productName: '',
        productType: '',
        createTime: ''
      },
      pageInfob: {
        pageNumber: 1,
        pageSize: 10
      },
      totalb: 0,
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
      tableData: [],
      tableDatab: [],
      tableDatac: []
    }
  },
  mounted() {
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.activeName = searchData.activeName
        if (searchData.activeName === '0') {
          this.pageInfoa = searchData.pageInfo
          this.auditForm = searchData.searchForm
        } else if (searchData.activeName === '1') {
          this.pageInfob = searchData.pageInfo
          this.auditFormb = searchData.searchForm
        } else if (searchData.activeName === '2') {
          this.pageInfoc = searchData.pageInfo
          this.auditFormc = searchData.searchForm
        }
      }
    }
    getClock('C5900000').then(res => {
      this.productTypeList = res.map(item => {
        return {
          label: item.codeValue,
          value: item.codeKey
        }
      })
      const tabMsg = this.$route.params.tabMsg ? this.$route.params.tabMsg.tabMsg : 'noMsg'
      if (tabMsg === '已发布') {
        this.activeName = '1'
        this.getAuditFormb()
      } else if (tabMsg === '已下架') {
        this.activeName = '2'
        this.getAuditFormc()
      } else {
        this.activeName = '0'
        this.getAuditForm()
      }
    })
  },
  methods: {
    update(data) {
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
          pageInfo: this.pageInfoab,
          searchForm: this.auditFormb,
          activeName: this.activeName
        }
      } else if (this.activeName === '2') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoac,
          searchForm: this.auditFormc,
          activeName: this.activeName
        }
      }
      this.searchData.queryParams = this.queryParams
      this.$router.push({
        name: 'productModify',
        query: {
          id: data.id,
          sty: '更新',
          searchData: JSON.stringify(this.searchData)
        }
      })
    },
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
    sortChange(column) {
      if (column.order === 'descending') {
        this.getAuditForm()
        this.paramsObj.sortKeyEstab = '1'
      } else if (column.order === 'ascending') {
        this.getAuditForm()
        this.paramsObj.sortKeyEstab = '0'
      }
    },
    sortChangeb(column) {
      if (column.order === 'descending') {
        this.getAuditFormb()
        this.paramsObj.sortKeyEstab = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormb()
        this.paramsObj.sortKeyEstab = '0'
      }
    },
    sortChangec(column) {
      if (column.order === 'descending') {
        this.getAuditFormc()
        this.paramsObj.sortKeyEstab = '1'
      } else if (column.order === 'ascending') {
        this.getAuditFormc()
        this.paramsObj.sortKeyEstab = '0'
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
          name
        }
      })
    },
    seachAuditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditForm()
        } else {
          return false
        }
      })
    },
    getAuditForm() {
      this.pageInfoa.pageNumber = 1
      this.paramsObj = Object.assign({}, this.pageInfoa, this.auditForm)
      this.IsloadingA = true
      this.paramsObj.auditStatus = '待审核'
      console.log(66, this.auditForm)
      this.paramsObj.sortKeyEstab = this.paramsObj.sortKeyEstab ? this.paramsObj.sortKeyEstab : '1'
      this.paramsObj.startDate = this.auditForm.createTime.length ? this.auditForm.createTime[0] : ''
      this.paramsObj.endDate = this.auditForm.createTime.length ? this.auditForm.createTime[1] : ''
      delete this.paramsObj.createTime
      query(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.tableData = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsOldA = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachReportForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getReportForm()
        } else {
          return false
        }
      })
    },
    clearAuditForm(formName) {
      this.$refs[formName].resetFields()
      this.getAuditForm()
    },
    handleSizeChangea(val) {
      this.paramsOldA.pageSize = val
      this.pageInfoa.pageSize = val
      this.IsloadingA = true
      query(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.tableData = res.list.map(item => {
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
    handleCurrentChangea(val) {
      this.paramsOldA.pageNumber = val
      this.pageInfoa.pageNumber = val
      this.IsloadingA = true
      query(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.totala = res.total
        this.tableData = res.list.map(item => {
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
    getAuditFormb() {
      this.pageInfob.pageNumber = 1
      this.paramsObj = Object.assign({}, this.pageInfob, this.auditFormb)
      this.IsloadingA = true
      this.paramsObj.auditStatus = '已发布'
      console.log(66, this.auditFormb)
      this.paramsObj.sortKeyEstab = this.paramsObj.sortKeyEstab ? this.paramsObj.sortKeyEstab : '1'
      this.paramsObj.startDate = this.auditFormb.createTime.length ? this.auditFormb.createTime[0] : ''
      this.paramsObj.endDate = this.auditFormb.createTime.length ? this.auditFormb.createTime[1] : ''
      delete this.paramsObj.createTime
      query(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list.map(item => {
          for (let i = 0; i < this.productTypeList.length; i++) {
            if (this.productTypeList[i].value === item.productType) {
              item.productType = this.productTypeList[i].label
              break
            }
          }
          return item
        })
        this.paramsOldB = this.paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormb(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormb()
        } else {
          return false
        }
      })
    },
    clearAuditFormb(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormb()
    },
    handleSizeChangeb(val) {
      this.paramsOldB.pageSize = val
      this.pageInfob.pageSize = val
      this.IsloadingA = true
      query(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list.map(item => {
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
    handleCurrentChangeb(val) {
      this.paramsOldB.pageNumber = val
      this.pageInfob.pageNumber = val
      this.IsloadingA = true
      query(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list.map(item => {
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
      this.paramsObj.auditStatus = '已下架'
      console.log(66, this.auditFormc)
      this.paramsObj.sortKeyEstab = this.paramsObj.sortKeyEstab ? this.paramsObj.sortKeyEstab : '1'
      this.paramsObj.startDate = this.auditFormc.createTime.length ? this.auditFormc.createTime[0] : ''
      this.paramsObj.endDate = this.auditFormc.createTime.length ? this.auditFormc.createTime[1] : ''
      delete this.paramsObj.createTime
      query(this.paramsObj).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list.map(item => {
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
      query(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list.map(item => {
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
      query(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list.map(item => {
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
