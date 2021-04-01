<template>
  <el-card class="AppRegistrationDetailVivw">
    <div slot="header" class="clearfix btnCard">
      <span>{{ title }}</span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(tabItem,tabIndex) in tabList" :key="tabItem.tabName" :label="tabItem.tabName" :name="tabItem.activeName">
        <div class="search">
          <el-form :ref="'auditForm'+tabIndex" :model="auditForm" label-width="100px">
            <el-row :gutter="20">
              <el-col v-for="queryItem in tabItem.queryCriteria" :key="queryItem.Ename" :span="8">
                <el-form-item v-if="queryItem.type === 'input'" :label="queryItem.Cname" :prop="queryItem.Ename">
                  <el-input v-model="auditForm[queryItem.Ename]" type="text" :placeholder="queryItem.Cname" :clearable="queryItem.clearable" :maxlength="queryItem.maxlength" />
                </el-form-item>
                <el-form-item v-if="queryItem.type === 'select'" :label="queryItem.Cname" :prop="queryItem.Ename">
                  <el-select v-model="auditForm[queryItem.Ename]" placeholder="请选择" :clearable="queryItem.clearable">
                    <el-option
                      v-for="optionItem in queryItem.option"
                      :key="optionItem.codeValue"
                      :label="optionItem.codeValue"
                      :value="optionItem.codeValue"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="queryItem.type === 'address'" :label="queryItem.Cname" :prop="queryItem.Ename">
                  <el-cascader
                    v-model="auditForm[queryItem.Ename]"
                    :options="registerAddrArr"
                    :props="{ checkStrictly: true }"
                    :clearable="queryItem.clearable"
                    style="width:100%"
                  />
                </el-form-item>
                <el-form-item v-if="queryItem.type === 'time'" :label="queryItem.Cname" :prop="queryItem.Ename">
                  <el-date-picker
                    v-model="auditForm.time"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="textRight">
                <el-button type="primary" @click="seachAuditForm()">查 询</el-button>
                <el-button @click="clearAuditForm('auditForm'+tabIndex)">重 置</el-button>
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
          <div v-for="tableItem in tabItem.tableHead" :key="tableItem.Cname">
            <el-table-column v-if="tableItem.type === 'kong'" :prop="tableItem.Ename" :label="tableItem.Cname" show-overflow-tooltip width="2" />
            <el-table-column v-if="tableItem.type === 'selection'" type="selection" width="55" />
            <el-table-column v-if="tableItem.type === 'index'" :label="tableItem.Cname" type="index" width="50" />
            <el-table-column v-if="tableItem.type === 'button'" :prop="tableItem.Ename" :label="tableItem.Cname" min-width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button v-if="tableItem.btnName" type="text" @click="btnEvent(scope.row,tableItem)">{{ tableItem.btnName }}</el-button>
                <el-button v-else type="text" @click="btnEvent(scope.row,tableItem)">{{ scope.row.rinm }}</el-button>
              </template>
            </el-table-column>
            <el-table-column v-if="tableItem.type === 'text'" :prop="tableItem.Ename" :label="tableItem.Cname" min-width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row[tableItem.Ename]===null?'--':scope.row[tableItem.Ename]===''?'--':scope.row[tableItem.Ename] }}
              </template>
            </el-table-column>
            <el-table-column v-if="tableItem.type === 'tag'" :label="tableItem.Cname" min-width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row[tableItem.Ename]">
                  <span v-for="tagItem in tableItem.tagList" :key="tableItem.Ename+tagItem.type">
                    <el-tag v-if="scope.row[tableItem.Ename]===tagItem.name" :type="tagItem.type" style="width:65px">
                      {{ scope.row[tableItem.Ename] }}
                    </el-tag>
                  </span>
                </div>
                <div v-else>
                  --
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="tableItem.type === 'code'" :label="tableItem.Cname" min-width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row[tableItem.Ename]">
                  <div v-for="codeItem in tableItem.codeList" :key="codeItem.codeKey+codeItem.codeValue">
                    <span v-if="scope.row[tableItem.Ename]=== codeItem.codeKey">
                      {{ codeItem.codeValue }}
                    </span>
                  </div>
                </div>
                <div v-else>
                  --
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="tableItem.type === 'sort'" :prop="tableItem.Ename" :label="tableItem.Cname" min-width="80" sortable="custom" show-overflow-tooltip />

            <el-table-column v-if="tableItem.type === 'switch'" :prop="tableItem.Ename" :label="tableItem.Cname" min-width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.otherInfo === "1" ? '启用': '停用' }}</span>
                <el-switch v-model="scope.row.isOpen" style="display: block" @change="switchEvent(scope.row,tableItem)" />
              </template>
            </el-table-column>
          </div>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      v-if="total>0"
      :current-page="pageInfo.pageNumber"
      :page-size="pageInfo.pageSize"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChangea"
      @current-change="handleCurrentChangea"
    />

  </el-card>
</template>

<script>
import { getAdrr } from '@/api/appbeian'
export default {
  name: 'PublicPage',
  props: {
    title: {
      type: String,
      default: ''
    },
    tabList: {
      type: Array,
      default: () => []
    },
    api: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tabName: '',
      IsloadingA: false,
      tableData: [],
      auditForm: {},
      activeName: '0',
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      registerAddrArr: []
    }
  },
  mounted() {
    getAdrr().then(res => {
      this.registerAddrArr = res
    })
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.activeName = searchData.activeName
        this.pageInfo = searchData.pageInfo
        this.auditForm = searchData.searchForm
      }
    } else {
      this.auditForm = this.tabList[0].auditForm
    }
    this.seachAuditForm()
  },
  methods: {
    handleClick(data) {
      this.tabName = data.label
      const arr = this.tabList.filter(item => item.tabName === this.tabName)
      this.auditForm = arr[0].auditForm
      this.activeName = arr[0].activeName
      this.pageInfo.pageNumber = 1
      this.pageInfo.pageSize = 10
      this.seachAuditForm()
    },
    btnEvent(row, item) {
      const obj = {
        pageName: this.$route.name,
        pageInfo: this.pageInfo,
        searchForm: this.auditForm,
        activeName: this.activeName,
        row
      }
      this.$emit(item.btnEventName, obj)
    },
    switchEvent(row, item) {
      this.$emit(item.switchEventName, row)
    },
    seachAuditForm(auditStatus) {
      this.IsloadingA = true
      const obj = Object.assign(this.auditForm, this.pageInfo, {})
      obj.auditStatus = this.tabName || this.tabList[0].tabName
      if (obj.time) {
        obj.startDate = obj.time[0]
        obj.endDate = obj.time[1]
      } else {
        obj.startDate = ''
        obj.endDate = ''
      }
      delete obj.time
      return this.api.query(obj).then(res => {
        this.IsloadingA = false
        this.tableData = res.list
        this.total = res.total
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    clearAuditForm(formName) {
      this.$refs[formName][0].resetFields()
      this.seachAuditForm()
    },
    sortChange(column) {
      if (column.order === 'descending') {
        this.auditForm.sort = '1'
        this.seachAuditForm()
      } else if (column.order === 'ascending') {
        this.auditForm.sort = '0'
        this.seachAuditForm()
      }
    },
    handleSizeChangea(val) {
      this.pageInfo.pageSize = val
      this.seachAuditForm()
    },
    handleCurrentChangea(val) {
      this.pageInfo.pageNumber = val
      this.seachAuditForm()
    }
  }
}
</script>

<style>

</style>
