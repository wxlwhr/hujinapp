<template>
  <el-card class="workReport_notice">
    <div slot="header">
      <span>工作台</span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="待办事项" name="0">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" :maxlength="20" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="日期" prop="sendTime">
                <el-date-picker
                  v-model="form.sendTime"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width:100%"
                />
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="24" class="textRight">
              <el-button type="primary" @click="query('form')">查询</el-button>
              <el-button @click="clear('form')">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableData"
        >
          <el-table-column
            type="index"
            property="idx"
            label="序号"
            width="100px"
          />
          <el-table-column
            property="title"
            label="标题"
            show-overflow-tooltip
          />
          <el-table-column
            property="nodeName"
            label="当前环节"
            show-overflow-tooltip
          />
          <el-table-column
            label="日期"
            property="sendTime"
            show-overflow-tooltip
          />
          <el-table-column
            prop="option"
            label="操作"
            width="100"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="goFrom(scope.row)">
                <el-tooltip class="item" effect="dark" content="审核" placement="top">
                  <img src="@/icons/png/shenhe-s.png" alt="">
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="total>0"
          :total="total"
          :current-page="pageInfo.pageNum"
          :page-size="pageInfo.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

      </el-tab-pane>
      <el-tab-pane label="已办事项" name="1">
        <el-form ref="formb" :model="formb" label-width="100px" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="标题" prop="title">
                <el-input v-model="formb.title" :maxlength="20" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="日期" prop="sendTime">
                <el-date-picker
                  v-model="formb.sendTime"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width:100%"
                />
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="24" class="textRight">
              <el-button type="primary" @click="queryb('formb')">查询</el-button>
              <el-button @click="clearb('formb')">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatab"
        >
          <el-table-column
            type="index"
            property="idx"
            label="序号"
            width="100px"
          />
          <el-table-column
            property="title"
            label="标题"
            show-overflow-tooltip
          />
          <el-table-column
            property="nodeName"
            label="当前环节"
            show-overflow-tooltip
          />
          <el-table-column
            label="日期"
            property="sendTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="操作"
            width="100"
            fixed="right"
          >
            <template slot-scope="scope">
              <!-- 被撤回的不能点击查看按钮 -->
              <el-button type="text" @click="watchForm(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="totalb>0"
          :total="totalb"
          :current-page="pageInfob.pageNum"
          :page-size="pageInfob.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeb"
          @current-change="handleCurrentChangeb"
        />

      </el-tab-pane>
      <el-tab-pane label="消息提醒" name="2">
        <el-form ref="formc" :model="formc" label-width="100px" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="标题" prop="title">
                <el-input v-model="formc.title" :maxlength="20" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="日期" prop="sendTime">
                <el-date-picker
                  v-model="formc.sendTime"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width:100%"
                />
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="24" class="textRight">
              <el-button type="primary" @click="queryc('formc')">查询</el-button>
              <el-button @click="clearc('formc')">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
        <br>
        <el-table
          v-loading="IsloadingA"
          :data="tableDatac"
        >
          <el-table-column
            type="index"
            property="idx"
            label="序号"
            width="100px"
          />
          <el-table-column
            property="message"
            label="标题"
            show-overflow-tooltip
          />
          <el-table-column
            property="status"
            label="状态"
            show-overflow-tooltip
          />
          <el-table-column
            label="日期"
            property="createTime"
            show-overflow-tooltip
          />
          <el-table-column
            label="操作"
            width="100"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button :disabled="scope.row.status === '已读'" type="text" @click="biaoJi(scope.row)">阅读</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="totalc>0"
          :total="totalc"
          :current-page="pageInfoc.pageNumber"
          :page-size="pageInfoc.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangec"
          @current-change="handleCurrentChangec"
        />

      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { rzWorkFlow } from '@/api/appbeian/register.js'
import { parseTime } from '@/utils/index.js'
import { commonValidate2 } from '@/utils/formValidate'
import { oparateData, getData, getmessage, updateMessage } from '@/api/home/index.js'
import {
  getButton
} from '@/api/workflow/index.js'
export default {
  name: 'WorkReportNotice',
  filters: {
    parseTime(sendTime) {
      return parseTime(sendTime, '')
    }
  },
  data() {
    return {
      activeName: '0',
      IsloadingA: false,
      searchData: {},
      paramsOldA: {},
      paramsOldB: {},
      paramsOldC: {},
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      pageInfoc: {
        pageNumber: 1,
        pageSize: 10
      },
      totalc: 0,
      pageInfob: {
        pageNum: 1,
        pageSize: 10
      },
      totalb: 0,
      form: {
        title: '',
        sendTime: []
      },
      formb: {
        title: '',
        sendTime: []
      },
      formc: {
        title: '',
        sendTime: []
      },
      tableData: [],
      tableDatab: [],
      tableDatac: [],
      rules: {
        title: [{ required: false, validator: commonValidate2, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.activeName = searchData.activeName
        if (searchData.activeName === '0') {
          this.form = searchData.searchForm
          this.pageInfo = searchData.pageInfo
        } else if (searchData.activeName === '1') {
          this.formb = searchData.searchForm
          this.pageInfob = searchData.pageInfo
        } else if (searchData.activeName === '2') {
          this.formc = searchData.searchForm
          this.pageInfoc = searchData.pageInfo
        }
      }
    }
    this.handleClick()
  },
  methods: {
    biaoJi(row) {
      const obj = {
        id: row.id,
        status: '1'
      }
      updateMessage(obj).then(res => {
        this.getMessage()
      })
    },
    // 工作流到详情页
    goFrom(obj) {
      if (this.activeName === '0') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfo,
          searchForm: this.form,
          activeName: this.activeName
        }
      } else if (this.activeName === '1') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfob,
          searchForm: this.formb,
          activeName: this.activeName
        }
      } else if (this.activeName === '2') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoc,
          searchForm: this.formc,
          activeName: this.activeName
        }
      }
      if (obj.flowId === 'organRegister') {
        if (this.$store.getters.srnm === '') {
          this.$router.push({
            name: 'jgmaintenance',
            query: {
              name: obj.name,
              nodeName: obj.nodeName,
              sendSubjectionName: obj.sendSubjectionName,
              subjectionId: obj.subjectionId,
              trackId: obj.trackId,
              workId: obj.workId,
              searchData: JSON.stringify(this.searchData)
            }
          })
        } else if (this.$store.getters.srnm === '1') {
          this.$router.push({
            name: 'maintenancerz',
            query: {
              type: '0',
              searchData: JSON.stringify(this.searchData)

            }
          })
        } else if (this.$store.getters.srnm === '2') {
          this.$router.push({
            name: 'maintenancejc',
            query: {
              type: '0',
              searchData: JSON.stringify(this.searchData)

            }
          })
        } else {
          this.$router.push({
            name: 'maintenance',
            query: {
              type: '0',
              searchData: JSON.stringify(this.searchData)
            }
          })
        }
      } else {
        if (this.$store.getters.srnm === '') {
          const obj0 = {
            name: obj.name ? obj.name : '',
            sendSubjectionName: obj.sendSubjectionName,
            subjectionId: obj.subjectionId,
            trackId: obj.trackId,
            workId: obj.workId
          }
          rzWorkFlow(obj0).then(res => {
            this.$router.push({
              name: 'AppVivw',
              query: {
                id: res.formData.data.id,
                name: obj.name,
                nodeName: obj.nodeName,
                sendSubjectionName: obj.sendSubjectionName,
                subjectionId: obj.subjectionId,
                trackId: obj.trackId,
                workId: obj.workId,
                activeName: this.activeName,
                searchData: JSON.stringify(this.searchData)
              }
            })
          })
        } else if (this.$store.getters.srnm === '1') {
          this.$router.push({
            name: 'apprzxq',
            query: {
              name: obj.name,
              nodeName: obj.nodeName,
              sendSubjectionName: obj.sendSubjectionName,
              subjectionId: obj.subjectionId,
              trackId: obj.trackId,
              workId: obj.workId,
              activeName: this.activeName,
              searchData: JSON.stringify(this.searchData)
            }
          })
        } else if (this.$store.getters.srnm === '2') {
          this.$router.push({
            name: 'appjcxq',
            query: {
              name: obj.name,
              nodeName: obj.nodeName,
              sendSubjectionName: obj.sendSubjectionName,
              subjectionId: obj.subjectionId,
              trackId: obj.trackId,
              workId: obj.workId,
              activeName: this.activeName,
              searchData: JSON.stringify(this.searchData)
            }
          })
        } else {
          const obj0 = {
            name: obj.name ? obj.name : '',
            sendSubjectionName: obj.sendSubjectionName,
            subjectionId: obj.subjectionId,
            trackId: obj.trackId,
            workId: obj.workId
          }
          rzWorkFlow(obj0).then(res => {
            const id = res.formData.data.id
            const newres = JSON.parse(JSON.stringify(res))
            delete res.formData
            const obj1 = {
              name: res.name ? obj.name : '',
              sendSubjectionName: res.sendSubjectionName || '',
              subjectionId: res.subjectionId,
              trackId: res.trackId,
              workId: res.workId
            }
            getButton(obj1).then(res => {
              if (newres.formData.data.flowType === '3') {
                this.$router.push({
                  name: 'Appmodify',
                  query: {
                    num: '2',
                    name: '重大变更',
                    id,
                    queryData: JSON.stringify(res),
                    update: '重大变更'
                  }
                })
              } else {
                this.$router.push({
                  name: 'Appmodify',
                  query: {
                    num: '1',
                    name: '修改',
                    id,
                    queryData: JSON.stringify(res),
                    searchData: JSON.stringify(this.searchData)
                  }
                })
              }
            })
          })
        }
      }
    },
    watchForm(obj) {
      if (this.activeName === '0') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfo,
          searchForm: this.form,
          activeName: this.activeName
        }
      } else if (this.activeName === '1') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfob,
          searchForm: this.formb,
          activeName: this.activeName
        }
      } else if (this.activeName === '2') {
        this.searchData = {
          pageName: this.$route.name,
          pageInfo: this.pageInfoc,
          searchForm: this.formc,
          activeName: this.activeName
        }
      }
      if (obj.flowId === 'organRegister') {
        if (this.$store.getters.srnm === '') {
          this.$router.push({
            name: 'jgmaintenance',
            query: {
              from: '详情页',
              name: obj.name,
              nodeName: obj.nodeName,
              sendSubjectionName: obj.sendSubjectionName,
              subjectionId: obj.subjectionId,
              trackId: obj.trackId,
              workId: obj.workId,
              searchData: JSON.stringify(this.searchData)
            }
          })
        } else if (this.$store.getters.srnm === '1') {
          this.$router.push({
            from: '详情页',
            name: 'maintenancerz',
            query: {
              type: '0',
              searchData: JSON.stringify(this.searchData)
            }
          })
        } else if (this.$store.getters.srnm === '2') {
          this.$router.push({
            from: '详情页',
            name: 'maintenancejc',
            query: {
              type: '0',
              searchData: JSON.stringify(this.searchData)
            }
          })
        } else {
          this.$router.push({
            from: '详情页',
            name: 'maintenance',
            query: {
              type: '0',
              searchData: JSON.stringify(this.searchData)
            }
          })
        }
      } else {
        if (this.$store.getters.srnm === '') {
          const obj0 = {
            name: obj.name ? obj.name : '',
            sendSubjectionName: obj.sendSubjectionName,
            subjectionId: obj.subjectionId,
            trackId: obj.trackId,
            workId: obj.workId
          }
          rzWorkFlow(obj0).then(res => {
            this.$router.push({
              id: res.formData.data.id,
              name: 'AppVivw',
              query: {
                id: res.formData.data.id,
                from: '详情页',
                name: obj.name,
                nodeName: obj.nodeName,
                sendSubjectionName: obj.sendSubjectionName,
                subjectionId: obj.subjectionId,
                trackId: obj.trackId,
                workId: obj.workId,
                activeName: this.activeName,
                searchData: JSON.stringify(this.searchData)
              }
            })
          })
        } else if (this.$store.getters.srnm === '1') {
          this.$router.push({
            name: 'apprzxq',
            query: {
              from: '详情页',
              name: obj.name,
              nodeName: obj.nodeName,
              sendSubjectionName: obj.sendSubjectionName,
              subjectionId: obj.subjectionId,
              trackId: obj.trackId,
              workId: obj.workId,
              activeName: this.activeName,
              searchData: JSON.stringify(this.searchData)
            }
          })
        } else if (this.$store.getters.srnm === '2') {
          this.$router.push({
            name: 'appjcxq',
            query: {
              from: '详情页',
              name: obj.name,
              nodeName: obj.nodeName,
              sendSubjectionName: obj.sendSubjectionName,
              subjectionId: obj.subjectionId,
              trackId: obj.trackId,
              workId: obj.workId,
              activeName: this.activeName,
              searchData: JSON.stringify(this.searchData)
            }
          })
        } else {
          this.$router.push({
            from: '详情页',
            name: 'AppRegChange',
            query: {
              name: obj.name,
              nodeName: obj.nodeName,
              sendSubjectionName: obj.sendSubjectionName,
              subjectionId: obj.subjectionId,
              trackId: obj.trackId,
              workId: obj.workId,
              activeName: this.activeName,
              searchData: JSON.stringify(this.searchData)
            }
          })
        }
      }
    },
    // 初始化方法
    init(num) {
      if (num === '0') {
        this.pageInfo.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfo, this.form)
      delete params.sendTime
      params.startDate = this.form.sendTime ? this.form.sendTime[0] : ''
      params.endDate = this.form.sendTime ? this.form.sendTime[1] : ''
      this.IsloadingA = true
      oparateData(params).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
        this.paramsOldA = params
      })
    },
    // 已办事项
    alreadyBacklog(num) {
      if (num === '0') {
        this.pageInfob.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfob, this.formb)
      delete params.sendTime
      params.startDate = this.formb.sendTime ? this.formb.sendTime[0] : ''
      params.endDate = this.formb.sendTime ? this.formb.sendTime[1] : ''
      this.IsloadingA = true
      getData(params).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
        this.paramsOldB = params
      })
    },
    getMessage(num) {
      if (num === '0') {
        this.pageInfoc.pageNumber = 1
      }
      const params = Object.assign({}, this.pageInfoc, this.formc)
      delete params.title
      delete params.sendTime
      params.message = this.formc.title
      params.startDate = this.formc.sendTime ? this.formc.sendTime[0] : ''
      params.endDate = this.formc.sendTime ? this.formc.sendTime[1] : ''
      params.deptId = this.$store.getters.riid ? this.$store.getters.riid : this.$store.getters.userId
      this.IsloadingA = true
      getmessage(params).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list
        this.paramsOldC = params
      })
    },
    handleClick() {
      switch (this.activeName) {
        case '0':
          this.init()
          sessionStorage.setItem('tabMsg', '待办事项')
          break
        case '1':
          this.alreadyBacklog()
          sessionStorage.setItem('tabMsg', '已办事项')
          break
        case '2':
          this.getMessage()
          sessionStorage.setItem('tabMsg', '消息提醒')
          break
      }
    },
    query(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.init('0')
        } else {
          return false
        }
      })
    },
    queryb(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.alreadyBacklog('0')
        } else {
          return false
        }
      })
    },
    queryc(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getMessage('0')
        } else {
          return false
        }
      })
    },
    clear(formName) {
      this.$refs[formName].resetFields()
      this.init('0')
    },
    clearb(formName) {
      this.$refs[formName].resetFields()
      this.alreadyBacklog('0')
    },
    clearc(formName) {
      this.$refs[formName].resetFields()
      this.getMessage('0')
    },
    handleSizeChange(val) {
      this.paramsOldA.pageSize = val
      this.pageInfo.pageSize = val
      this.IsloadingA = true
      oparateData(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChange(val) {
      this.paramsOldA.pageNum = val
      this.pageInfo.pageNum = val
      this.IsloadingA = true
      oparateData(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangeb(val) {
      this.paramsOldB.pageSize = val
      this.pageInfob.pageSize = val
      this.IsloadingA = true
      getData(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangeb(val) {
      this.paramsOldB.pageNum = val
      this.pageInfob.pageNum = val
      this.IsloadingA = true
      getData(this.paramsOldB).then(res => {
        this.IsloadingA = false
        this.totalb = res.total
        this.tableDatab = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangec(val) {
      this.paramsOldC.pageSize = val
      this.pageInfoc.pageSize = val
      this.IsloadingA = true
      getmessage(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangec(val) {
      this.paramsOldC.pageNumber = val
      this.pageInfoc.pageNumber = val
      this.IsloadingA = true
      getmessage(this.paramsOldC).then(res => {
        this.IsloadingA = false
        this.totalc = res.total
        this.tableDatac = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .el-range-editor--medium.el-input__inner {
//   width: 250px;

// }
.workReport_button{
  background: #fff;
  color: #000;
  border: 1px solid #ccc;
}
</style>
