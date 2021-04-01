<template>
  <el-card class="AppRegistrationDetailVivw">
    <div slot="header" class="clearfix btnCard">
      <span>APP版本维护</span>
    </div>
    <el-form ref="form" :model="form">
      <fieldset class="fieldsetStyle">
        <legend style="margin-left: 40px; font-size:17px">APP版本维护</legend>
        <el-row :gutter="20">
          <el-col>
            <el-table
              v-loading="tableLoadingb"
              :data="tableData"
              height="600"
            >
              <el-table-column label="序号" type="index" width="50" />
              <el-table-column prop="appMarket" label="应用市场" show-overflow-tooltip />
              <el-table-column prop="appVersion" label="APP版本" show-overflow-tooltip />
              <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip />
              <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button type="text" @click="deleteData(scope.row)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </fieldset>
    </el-form>
    <div>
      <el-row style="text-align:center;padding-top:50px">
        <el-col :span="24">
          <el-button type="primary" @click="goBack">返 回</el-button>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { his, relieve } from '@/api/zilv.js'
export default {
  data() {
    return {
      tableLoadingb: false,
      form: {},
      tableData: [],
      applicationList: [
        {
          codeKey: '11',
          codeValue: 'AppStore'
        },
        {
          codeKey: '21',
          codeValue: '华为应用商店'
        },
        {
          codeKey: '22',
          codeValue: '小米应用商店'
        },
        {
          codeKey: '23',
          codeValue: 'OPPO应用商店'
        },
        {
          codeKey: '24',
          codeValue: 'VIVO应用商店'
        },
        {
          codeKey: '25',
          codeValue: '应用宝'
        },
        {
          codeKey: '26',
          codeValue: '360'
        },
        {
          codeKey: '27',
          codeValue: '豌豆荚'
        },
        {
          codeKey: '28',
          codeValue: '百度'
        },
        {
          codeKey: '99',
          codeValue: '其他'
        }
      ]
    }
  },
  mounted() {
    this.getMsg()
    console.log(this.$route.query.searchData)
  },
  methods: {
    getMsg() {
      this.tableLoadingb = true
      const obj = {
        pageNumber: '1',
        pageSize: '100000',
        type: '1',
        appId: this.$route.query.id
      }
      his(obj).then(res => {
        this.tableData = res.list.map(item => {
          for (let i = 0; i < this.applicationList.length; i++) {
            if (this.applicationList[i].codeKey === item.appMarket) {
              item.appMarket = this.applicationList[i].codeValue
              break
            }
          }
          return item
        })
        this.tableLoadingb = false
      })
    },
    goBack() {
      const obj = JSON.parse(this.$route.query.searchData)
      obj.ifReview = true
      this.$router.push({
        name: sessionStorage.getItem('routerName'),
        params: {
          tabMsg: { tabMsg: sessionStorage.getItem('tabMsg') },
          searchData: obj
        }
      })
    },
    deleteData(row) {
      this.$confirm('是否删除该数据记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        relieve(row.id).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getMsg()
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style>

</style>
