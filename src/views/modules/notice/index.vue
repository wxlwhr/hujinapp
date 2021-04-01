<template>
  <el-card class="notice">
    <div slot="header" class="clearfix btnCard">
      <el-row>
        <el-col :span="12" style="textAlign:left">
          通知公告
        </el-col>
        <el-col :span="12" style="textAlign:right">
          <el-button v-if="$store.getters.srnm === '0' || $store.getters.srnm === '1' || $store.getters.srnm === '2'" type="primary" @click="AdviceReturn">意见反馈</el-button>
          <el-button v-if="isTrue&&this.$store.getters.roles" type="primary" style="margin-left:10px" @click="go2New">新建公告</el-button>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick(activeName)">
      <el-tab-pane label="通知公告" name="1">
        <div class="search">
          <el-form ref="formModel" :model="formModel" :rules="rules" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="名称" prop="title">
                  <el-input v-model="formModel.title" placeholder="名称" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发布时间" prop="releaseTime">
                  <el-date-picker v-model="formModel.releaseTime" :picker-options="pickerOptions1" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
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
          <el-table-column type="index" label="序号" width="80px" />
          <el-table-column prop="title" label="名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goDetail(scope.row.id)">{{ scope.row.title }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="createDeptName" label="发布部门" show-overflow-tooltip />
          <el-table-column prop="createUserName" label="发布人" show-overflow-tooltip />
          <el-table-column prop="releaseTime" label="发布时间" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.releaseTime?scope.row.releaseTime:'--' }}
            </template>
          </el-table-column>
          <el-table-column v-if="isTrue&&this.$store.getters.roles" prop="isRelease" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.isRelease === '0'?'未发布':'已发布' }}
            </template>
          </el-table-column>
          <el-table-column v-if="isTrue&&this.$store.getters.roles" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="xiugai(scope.row.id,scope.row.isRelease)">修改</el-button>
              <el-button type="text" @click="shanchu(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="total>0"
          :current-page="pageInfo.pageNumber"
          :page-size="pageInfo.pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-tab-pane>
      <el-tab-pane v-if="$store.getters.srnm === '0' || $store.getters.srnm === '1' || $store.getters.srnm === '2' || $store.getters.srnm === ''" label="意见反馈" name="2">
        <div class="search">
          <el-form ref="auditFormb" :model="auditFormb" :rules="rules" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="反馈标题" prop="title">
                  <el-input v-model="auditFormb.title" placeholder="反馈标题" clearable />
                </el-form-item>
              </el-col>
              <el-col v-if="$store.getters.srnm === ''" :span="8">
                <el-form-item label="机构名称" prop="orgName">
                  <el-input v-model="auditFormb.orgName" placeholder="机构名称" clearable />
                </el-form-item>
              </el-col>
              <el-col v-if="$store.getters.srnm === ''" :span="8">
                <el-form-item label="机构类别" prop="srnm">
                  <el-select v-model="auditFormb.srnm" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in jigou"
                      :key="item.codeKey"
                      :label="item.codeValue"
                      :value="item.codeKey"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="反馈时间" prop="createTime">
                  <el-date-picker v-model="auditFormb.createTime" :picker-options="pickerOptions1" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditFormb('auditFormb')">查 询</el-button>
                <el-button @click="clearAuditFormb('auditFormb')">重 置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br>
        <el-table v-loading="IsloadingA" :data="tableDatb" tooltip-effect="dark">
          <el-table-column type="index" label="序号" width="80px" />
          <el-table-column prop="title" label="反馈标题" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="goDetail2(scope.row.id)">{{ scope.row.title }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="orgName" label="机构名称" show-overflow-tooltip />
          <el-table-column prop="createDeptName" label="机构类别" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.srnm">
                <div v-if="scope.row.srnm === '0'">金融机构</div>
                <div v-if="scope.row.srnm === '1'">认证机构</div>
                <div v-if="scope.row.srnm === '2'">检测机构</div>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="releaseTime" label="反馈时间" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.createTime?scope.row.createTime:'--' }}
            </template>
          </el-table-column>
          <!-- <el-table-column v-if="isTrue&&this.$store.getters.roles" prop="isRelease" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.isRelease === '0'?'未发布':'已发布' }}
            </template>
          </el-table-column> -->
          <!-- <el-table-column v-if="isTrue&&this.$store.getters.roles" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="xiugai(scope.row.id,scope.row.isRelease)">修改</el-button>
              <el-button type="text" @click="shanchu(scope.row.id)">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          v-if="totalb>0"
          :current-page="pageInfob.pageNumber"
          :page-size="pageInfob.pageSize"
          :total="totalb"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeb"
          @current-change="handleCurrentChangeb"
        />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { getListApi, getListApijs, goDelete } from '@/api/notice/notice.js'
import { opinionQuery } from '@/api/notice/copeAdvice.js'
export default {
  data() {
    return {
      jigou: [
        {
          codeKey: '0',
          codeValue: '金融机构'
        },
        {
          codeKey: '1',
          codeValue: '认证机构'
        },
        {
          codeKey: '2',
          codeValue: '检测机构'
        }
      ],
      activeName: '1',
      formModel: {
        title: '',
        releaseTime: []
        // isRelease: ''
      },
      auditFormb: {
        title: '',
        orgName: '',
        srnm: '',
        createTime: '',
        sort: '1',
        orgId: this.$store.getters.riid
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      IsloadingA: false,
      isTrue: false,
      paramsOldA: {},
      searchData: {},
      tableDatb: [],
      paramsOldB: {},
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      pageInfob: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      totalb: 0,
      tableData: [],
      isReleaseArr: [
        {
          label: '已发布',
          value: '0'
        },
        {
          label: '未发布',
          value: '1'
        },
        {
          label: '已撤回',
          value: '2'
        }
      ],
      rules: {
      }
    }
  },
  mounted() {
    console.log(this.$route.params)
    const tabMsg = this.$route.params.tabMsg ? this.$route.params.tabMsg : 'noMsg'
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        if (tabMsg === '通知公告') {
          this.activeName = '1'
          this.formModel = searchData.searchForm
          this.pageInfo = searchData.pageInfo
        } else if (tabMsg === '意见反馈') {
          this.activeName = '2'
          this.pageInfob = searchData.pageInfo
          this.auditFormb = searchData.searchForm
        }
      }
    }

    if (tabMsg === '意见反馈') {
      this.activeName = '2'
      this.getAuditFormb()
    } else {
      this.activeName = '1'
      this.getData()
    }
  },
  methods: {
    handleClick(activeName) {
      switch (activeName) {
        case '1':
          this.getData()
          sessionStorage.setItem('tabMsg', '通知公告')
          break
        case '2':
          this.getAuditFormb()
          sessionStorage.setItem('tabMsg', '意见反馈')
          break
      }
    },
    AdviceReturn() {
      if (this.activeName === '1') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfo,
          searchForm: this.formModel
        }
      } else {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfob,
          searchForm: this.auditFormb
        }
      }

      this.$router.push({
        name: 'copeAdvice',
        query:
        {
          type: '0',
          searchData: JSON.stringify(this.searchData)
        }
      })
    },
    // 查看
    goDetail(id) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfo,
        searchForm: this.formModel
      }
      this.$router.push({
        name: 'notice_detail',
        query:
        {
          searchData: JSON.stringify(this.searchData),
          id
        }
      })
    },
    goDetail2(id) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfob,
        searchForm: this.auditFormb
      }
      this.$router.push({
        name: 'copeAdviceDetail',
        query:
        {
          searchData: JSON.stringify(this.searchData),
          id
        }
      })
    },
    go2New() {
      if (this.activeName === '1') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfo,
          searchForm: this.formModel
        }
      } else {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfob,
          searchForm: this.auditFormb
        }
      }
      this.$router.push({
        name: 'notice_new',
        query:
        {
          type: '0',
          searchData: JSON.stringify(this.searchData)
        }
      })
    },
    xiugai(id, type) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfo,
        searchForm: this.formModel
      }
      this.$router.push({
        name: 'notice_new',
        query:
        {
          searchData: JSON.stringify(this.searchData),
          id,
          type
        }
      })
    },
    shanchu(id) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        goDelete(id).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getData()
        }).catch(() => {

        })
      }).catch(() => {})
    },
    getAuditFormb(tips = 1) {
      if (tips === 0) {
        this.pageInfob.pageNumber = 1
      }
      const paramsObj = Object.assign({}, this.pageInfob, this.auditFormb)
      this.IsloadingA = true
      // paramsObj.startDate = this.auditFormb.createTime ? this.auditFormb.createTime[0] : ''
      // paramsObj.endDate = this.auditFormb.createTime ? this.auditFormb.createTime[1] : ''
      opinionQuery(paramsObj).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatb = res.list
        this.paramsOldB = paramsObj
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    seachAuditFormb(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditFormb(0)
        } else {
          return false
        }
      })
    },
    clearAuditFormb(formName) {
      this.$refs[formName].resetFields()
      this.getAuditFormb(0)
    },
    handleSizeChangeb(val) {
      this.paramsOldB.pageSize = val
      this.pageInfob.pageSize = val
      this.IsloadingA = true
      opinionQuery(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatb = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeb(val) {
      this.paramsOldB.pageNumber = val
      this.pageInfob.pageNumber = val
      this.IsloadingA = true
      opinionQuery(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatb = res.list
        this.tableDatb.map(item => {
          item.id = item.appId
        })
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    // 获取列表数据
    getData(num) {
      if (num === '0') {
        this.pageInfo.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfo, this.formModel)
      delete params.releaseTime
      params.startDate = this.formModel.releaseTime ? this.formModel.releaseTime[0] : ''
      params.endDate = this.formModel.releaseTime ? this.formModel.releaseTime[1] : ''
      if (this.$store.getters.srnm === '') { // 发送方
        this.isTrue = true
        params.createDept = this.$store.getters.deptId
        this.IsloadingA = true
        getListApi(params).then(res => {
          this.IsloadingA = false
          this.tableData = res.list
          this.paramsOldA = params
          this.total = res.total
        }).catch(() => {
          this.IsloadingA = false
        })
      } else {
        params.riid = this.$store.getters.riid // 接收方用的参数
        this.IsloadingA = true
        getListApijs(params).then(res => {
          this.IsloadingA = false
          this.tableData = res.list
          this.paramsOldA = params
          this.total = res.total
        }).catch(() => {
          this.IsloadingA = false
        })
      }
    },
    seachAuditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getData('0')
        } else {
          return false
        }
      })
    },
    clearAuditForm(formName) {
      this.$refs[formName].resetFields()
      this.getData('0')
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.paramsOldA.pageSize = val
      this.IsloadingA = true
      if (this.isTrue) {
        getListApi(this.paramsOldA).then(res => {
          this.IsloadingA = false
          this.tableData = res.list
          this.total = res.total
        }).catch(() => {
          this.IsloadingA = false
        })
      } else {
        getListApijs(this.paramsOldA).then(res => {
          this.IsloadingA = false
          this.tableData = res.list
          this.total = res.total
        }).catch(() => {
          this.IsloadingA = false
        })
      }
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNumber = val
      this.paramsOldA.pageNumber = val
      this.IsloadingA = true
      if (this.isTrue) {
        getListApi(this.paramsOldA).then(res => {
          this.IsloadingA = false
          this.tableData = res.list
          this.total = res.total
        }).catch(() => {
          this.IsloadingA = false
        })
      } else {
        getListApijs(this.paramsOldA).then(res => {
          this.IsloadingA = false
          this.tableData = res.list
          this.total = res.total
        }).catch(() => {
          this.IsloadingA = false
        })
      }
    }
  }
}
</script>

<style  lang="scss">
.notice {
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
}
</style>
