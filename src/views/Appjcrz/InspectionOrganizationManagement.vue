<template>
  <el-card class="continue continueaa">
    <div slot="header" class="clearfix btnCard">
      <span>关联检测机构管理</span>
    </div>
    <div>
      <el-form ref="auditForm" :model="auditForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="检测机构 :">
              <el-input v-model="testName" type="text" placeholder="检测机构名称" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="9">
            <el-button type="primary" @click="queryTest">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="clearTestName">清空</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="addTest">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        v-loading="IsloadingA"
        :data="tableData"
      >
        <el-table-column prop="rinm" label="检测机构名称" show-overflow-tooltip />
        <el-table-column prop="monitorName" label="联系人" show-overflow-tooltip />
        <el-table-column prop="managerTel" label="联系电话" show-overflow-tooltip />
        <el-table-column prop="operation" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              v-model="switchValue"
              :disabled="true"
              class="switchStyle"
              active-text="启用"
              inactive-text="停用"
            />
            <el-button type="text" @click="deleteLine(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="pageInfo.pageNumber"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfo.pageInfo"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      :visible.sync="deleteVisible"
      width="30%"
      center
    >
      <span>是否确认删除该条已关联的检测机构？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureDelete">确 定</el-button>
      </span>
    </el-dialog>
    <div class="chuansuo">
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        min-width="30%"
        :show-close="showClo"
        center
      >
        <div style="text-align: center">
          <el-transfer
            v-model="transferValue"
            style="text-align: left; display: inline-block"
            :titles="['源列表', '目标列表']"
            :button-texts="['加入左侧', '加入右侧']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            :data="transferData"
            @change="rightChange"
          >
            <span slot-scope="{ option }">
              <span>{{ option.key }} - {{ option.label }}</span>
            </span>
          </el-transfer>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelAddData">取 消</el-button>
          <el-button type="primary" @click="addData">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </el-card>
</template>

<script>
import {
  querydeletectionList, // 查询出所有已经备案的检测机构
  deletedetectionauth, // 删除认证所关联的检测机构
  querylist, // 查询所有的已关联的检测机构（带分页）
  audit, // 添加已备案的检测机构
  queryDetectionAuth// 查询出所有已经关联的检测机构
} from '@/api/register/register.js'
export default {
  data() {
    return {
      deleteVisible: false,
      rightChecked: [],
      showClo: false,
      testName: '',
      rightData: [],
      riid: '',
      transferValue: [1, 4],
      centerDialogVisible: false,
      currentPage: 8,
      IsloadingA: true,
      auditForm: {},
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 20
      },
      value: '',
      allData: [],
      tableData: [],
      transferData: [],
      switchValue: true
    }
  },
  mounted() {
    this.queryRelation()
  },
  methods: {
    rightChange(data) {
      this.rightChecked = data
    },
    // 点击新增按钮
    addTest() {
      this.centerDialogVisible = true
      querydeletectionList().then(res => {
        this.allData = res
        this.getChecked(res)
      })
    },
    // 获取添加弹框右侧的列表
    getChecked(data) {
      const arr = []
      queryDetectionAuth({ riid: this.$store.getters.riid }).then(res => {
        data.map((item, index) => {
          for (let i = 0; i < res.length; i++) {
            if (item.riid === res[i].riid) {
              arr.push(index)
              return
            }
          }
          return item
        })
        this.transferValue = arr
        this.generateData(data)
      })
    },
    // 获取添加弹框的左侧的列表
    generateData(data) {
      const arr = []
      data.map((item, index) => {
        arr.push({
          key: index,
          label: item.rinm
        })
        return item
      })
      this.transferData = arr
    },
    // 添加弹框确认
    addData() {
      const arr = []
      // const brr = []
      if (this.transferValue.length > 0) {
        for (let i = 0; i < this.transferValue.length; i++) {
          arr.push(this.allData[Number(this.transferValue[i])].riid)
        }
      }

      queryDetectionAuth({ riid: this.$store.getters.riid }).then(res => {
        this.rightData = res.length > 0 ? res.map(item => {
          return item.riid
        }) : res
        // console.log(78787, arr)
        // brr = arr.filter(v => {
        //   return (this.rightData.indexOf(v) === -1)
        // })
        const obj = {
          authenticationId: this.$store.getters.riid,
          cids: arr.length > 0 ? arr.join(',') : ''
        }
        audit(obj).then(res => {
          this.queryRelation()
          this.centerDialogVisible = false
        })
      })
    },
    // 添加弹框取消
    cancelAddData() {
      this.centerDialogVisible = false
      querydeletectionList().then(res => {
        this.getChecked(res)
      })
    },
    // 首次加载获取的列表数据和点击添加时的列表数据
    queryRelation() {
      const obj = {
        riid: this.$store.getters.riid,
        rinm: this.testName,
        pageNumber: 1,
        pageSize: 10
      }
      querylist(obj).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.IsloadingA = false
      })
    },
    // 点击清空
    clearTestName() {
      this.testName = ''
      this.queryRelation()
    },
    // 点击查询
    queryTest() {
      const obj = {
        riid: this.$store.getters.riid,
        rinm: this.testName,
        pageNumber: this.pageInfo.pageNumber,
        pageSize: this.pageInfo.pageSize
      }
      querylist(obj).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
      })
    },
    // 点击每页多少条
    handleSizeChange(num) {
      const obj = {
        riid: this.$store.getters.riid,
        rinm: this.testName,
        pageNumber: this.pageInfo.pageNumber,
        pageSize: num
      }
      querylist(obj).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
      })
    },
    // 点击分页
    handleCurrentChange(num) {
      const obj = {
        riid: this.$store.getters.riid,
        rinm: this.testName,
        pageNumber: num,
        pageSize: this.pageInfo.pageSize
      }
      querylist(obj).then(res => {
        this.tableData = res.list
        this.pageInfo.total = res.total
      })
    },
    // 确定删除
    sureDelete() {
      this.deleteVisible = false
      const authenticationId = this.$store.getters.riid
      const detectionId = this.riid
      deletedetectionauth({ authenticationId, detectionId }).then(res => {
        this.queryTest()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    },
    // 点击删除
    deleteLine(row) {
      this.deleteVisible = true
      this.riid = row.riid
    }
  }
}
</script>

<style>

.continueaa .el-dialog--center .el-dialog__body{
  text-align: center;
}
.continueaa .chuansuo .el-dialog--center{
  width: 760px;
}
.chuansuo .el-checkbox__label {
  overflow: visible !important;
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
</style>
