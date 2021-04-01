<template>
  <el-card class="journal">
    <div slot="header" class="clearfix btnCard">
      <span>日志管理</span>
    </div>
    <div class="search">
      <el-form ref="auditForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="操作人员">
              <el-input v-model.trim="Usname" :maxlength="20" placeholder="操作人员" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="日期">
              <el-date-picker
                v-model="value1"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="textRight">
            <el-button type="primary" @click="onSubmit">查 询</el-button>
            <el-button @click="clear">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br>
    <el-table v-loading="IsloadingA" :data="tableData">
      <el-table-column type="index" label="序号" width="80" show-overflow-tooltip />
      <el-table-column prop="name" label="操作员" min-width="140" show-overflow-tooltip />
      <el-table-column prop="deptName" label="所属单位" min-width="140" show-overflow-tooltip />
      <el-table-column prop="browserInfo" label="浏览器信息" min-width="140" show-overflow-tooltip />
      <el-table-column prop="operation" label="操作项" min-width="140" show-overflow-tooltip />
      <el-table-column prop="gmtCreate" label="时间" min-width="140" show-overflow-tooltip />
    </el-table>
    <div class="block">
      <el-pagination
        :total="pageInfo.total"
        :current-page="pageInfo.page"
        :page-size="pageInfo.size"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>
<script>
import { getWorkInfo } from '@/api/general.js'
export default {
  data() {
    return {
      tableData: [],
      value1: [this.getDay(-7), this.getDay(0)],
      paramsOldA: {},
      IsloadingA: null,
      pageInfo: {
        page: 1,
        size: 10,
        total: 10
      },
      Usname: ''
    }
  },
  mounted() {
    this.getWork()
  },
  methods: {
    doHandleMonth(month) {
      var m = month
      if (month.toString().length === 1) {
        m = '0' + month
      }
      return m
    },
    getDay(day) {
      var today = new Date()
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
      today.setTime(targetday_milliseconds) // 注意，这行是关键代码
      var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      return tYear + '-' + tMonth + '-' + tDate
    },
    // 点击切换分页
    handleCurrentChange(page) {
      this.pageInfo.page = page
      this.paramsOldA.page = page
      this.IsloadingA = true
      getWorkInfo(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.pageInfo.total = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.size = size
      this.paramsOldA.size = size
      this.IsloadingA = true
      getWorkInfo(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.pageInfo.total = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    // 查询
    onSubmit() {
      this.pageInfo.page = 1
      this.getWork()
    },
    clear() {
      this.Usname = ''
      this.value1 = []
      this.getWork()
    },
    getWork() {
      this.pageInfo.page = 1
      const paramsObj = {
        name: this.Usname,
        page: this.pageInfo.page,
        size: this.pageInfo.size,
        startDate: this.value1[0],
        stopDate: this.value1[1]
      }
      this.IsloadingA = true
      getWorkInfo(paramsObj).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.pageInfo.total = res.total
        this.paramsOldA = paramsObj
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .journal{

// }
</style>

