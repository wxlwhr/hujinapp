<template>
  <el-card class="noteReading">
    <div slot="header" class="clearfix btnCard">
      <span>通知公告</span>
      <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
    </div>
    <el-tabs v-model="activeName" @tab-click="tabChange">
      <el-tab-pane label="已读" name="readed">
        <el-table :data="readedData" tooltip-effect="dark">
          <el-table-column label="序号" type="index" />
          <el-table-column label="名称" prop="reName" />
          <el-table-column label="阅读时间" prop="reDate" />
          <el-table-column label="阅读方式" prop="reType" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未读" name="noread">
        <el-table :data="noreadData" tooltip-effect="dark">
          <el-table-column label="序号" type="index" />
          <el-table-column label="名称" prop="noName" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已反馈" name="backed">
        <el-table :data="backedData" tooltip-effect="dark">
          <el-table-column label="序号" type="index" />
          <el-table-column label="名称" prop="baName" />
          <el-table-column label="反馈时间" prop="bareDate" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未反馈" name="nobanck">
        <el-table :data="nobanckData" tooltip-effect="dark">
          <el-table-column label="序号" type="index" />
          <el-table-column label="名称" prop="nobaName" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="hanldUrge(scope)">催办</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-pagination :current-page="pageNum" :page-size="pageSize" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>
</template>
<script>
export default {
  name: 'NoteReading',
  data() {
    return {
      backImg: {
        backgroundImage: 'url(' + require('@/assets/back/back.png') + ')',
        backgroundRepeat: 'no-repeat'
      },
      activeName: 'readed',
      readedData: [
        {
          reName: '已读',
          reDate: '2019：01：18',
          reType: '密信'
        },
        {
          reName: '已读哇哈哈哈',
          reDate: '3749274927',
          reType: '网页'
        }
      ],
      noreadData: [
        {
          noName: '未阅读'
        }
      ],
      backedData: [
        {
          baName: '已反馈',
          bareDate: '2019-01-22'
        }
      ],
      nobanckData: [
        {
          nobaName: '未反馈'
        }
      ],
      pageNum: 1,
      pageSize: 10,
      total: null
    }
  },
  mounted() {
    this.activeSta()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    // 路由传过来 - 当前状态
    activeSta() {
      switch (this.$route.query.activeStatus) {
        case '1':
          this.activeName = 'readed'
          break
        case '2':
          this.activeName = 'noread'
          break
        case '3':
          this.activeName = 'backed'
          break
        case '4':
          this.activeName = 'nobanck'
          break

        default:
          break
      }
    },

    // 切换标签页
    tabChange(tab, event) {
      //
    },

    // 未阅读 催办
    hanldUrge() {},

    // 返回
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.noteReading{
 position: relative;
  .back {
    width: 45px;
    height: 45px;
    position: absolute;
    top: -20px;
    right: -20px;
  }
}
</style>

