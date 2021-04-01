<template>
  <div
    v-infinite-scroll="load"
    :style="HeightStyle"
    infinite-scroll-distance="10"
    infinite-scroll-disabled="disabled"
  >
    <el-card class="beianStyle" shadow="never">
      <div slot="header" class="clearfix">
        <el-input
          v-model="appName"
          placeholder="请输入App名称或机构名称搜索"
          prefix-icon="el-icon-search"
          @change="search"
        />
      </div>
      <el-tabs v-model="activeName" v-loading="IsloadingA" :stretch="true" @tab-click="handleClick">
        <el-tab-pane label="银行" name="0">
          <el-row>
            <!-- 循环层 -->
            <el-col v-for="item in tableData" :key="item.id" :span="24" style="margin-top:10px">
              <el-row type="flex" align="middle">
                <el-col :span="5" :sm="3" @click.native="goXiang(item.id)">
                  <el-image
                    :src="item.preview"
                    style="width: 60px; height: 60px;border-radius: 6px 6px;align-self:center;cursor:pointer;"
                  >
                    <div slot="error" class="el-image__error">
                      暂无图片
                    </div>
                  </el-image>
                </el-col>
                <!-- style="padding: 10px 0;border-bottom:1px solid #c6c6c8;" -->
                <el-col :span="19">
                  <el-row>
                    <el-col :span="17" @click.native="goXiang(item.id)">
                      <p class="fontStyle" style="font-size:14px;margin-top:0;color:#333;">{{ item.appName }}</p>
                      <p class="fontStyle" style="font-size:12px;color:#7b7b7b;">{{ item.rinm }}</p>
                    </el-col>
                    <el-col :span="7" style="text-align:right;">
                      <el-button round size="small" style="color:#409eff;" @click="downfun(item.attachId)">下载</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <br>
          <p v-if="noMore" style="text-align:center">没有更多了</p>
        </el-tab-pane>
        <el-tab-pane label="保险" name="1">
          <el-row>
            <!-- 循环层 -->
            <el-col v-for="item in tableData" :key="item.id" :span="24" style="margin-top:10px">
              <el-row type="flex" align="middle">
                <el-col :span="5" :sm="3" @click.native="goXiang(item.id)">
                  <el-image
                    :src="item.preview"
                    style="width: 60px; height: 60px;border-radius: 6px 6px;align-self:center;cursor:pointer;"
                  >
                    <div slot="error" class="el-image__error">
                      暂无图片
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="19">
                  <el-row>
                    <el-col :span="17" @click.native="goXiang(item.id)">
                      <p class="fontStyle" style="font-size:14px;margin-top:0;color:#333;">{{ item.appName }}</p>
                      <p class="fontStyle" style="font-size:12px;color:#7b7b7b;">{{ item.rinm }}</p>
                    </el-col>
                    <el-col :span="7" style="text-align:right;">
                      <el-button round size="small" style="color:#409eff;" @click="downfun(item.attachId)">下载</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <br>
          <p v-if="noMore" style="text-align:center">没有更多了</p>
        </el-tab-pane>
        <el-tab-pane label="支付" name="2">
          <el-row>
            <!-- 循环层 -->
            <el-col v-for="item in tableData" :key="item.id" :span="24" style="margin-top:10px">
              <el-row type="flex" align="middle">
                <el-col :span="5" :sm="3" @click.native="goXiang(item.id)">
                  <el-image
                    :src="item.preview"
                    style="width: 60px; height: 60px;border-radius: 6px 6px;align-self:center;cursor:pointer;"
                  >
                    <div slot="error" class="el-image__error">
                      暂无图片
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="19">
                  <el-row>
                    <el-col :span="17" @click.native="goXiang(item.id)">
                      <p class="fontStyle" style="font-size:14px;margin-top:0;color:#333;">{{ item.appName }}</p>
                      <p class="fontStyle" style="font-size:12px;color:#7b7b7b;">{{ item.rinm }}</p>
                    </el-col>
                    <el-col :span="7" style="text-align:right;">
                      <el-button round size="small" style="color:#409eff;" @click="downfun(item.attachId)">下载</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <br>
          <p v-if="noMore" style="text-align:center">没有更多了</p>
        </el-tab-pane>
        <el-tab-pane label="其他" name="3">
          <el-row>
            <!-- 循环层 -->
            <el-col v-for="item in tableData" :key="item.id" :span="24" style="margin-top:10px">
              <el-row type="flex" align="middle">
                <el-col :span="5" :sm="3" @click.native="goXiang(item.id)">
                  <el-image
                    :src="item.preview"
                    style="width: 60px; height: 60px;border-radius: 6px 6px;align-self:center;cursor:pointer;"
                  >
                    <div slot="error" class="el-image__error">
                      暂无图片
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="19">
                  <el-row>
                    <el-col :span="17" @click.native="goXiang(item.id)">
                      <p class="fontStyle" style="font-size:14px;margin-top:0;color:#333;">{{ item.appName }}</p>
                      <p class="fontStyle" style="font-size:12px;color:#7b7b7b;">{{ item.rinm }}</p>
                    </el-col>
                    <el-col :span="7" style="text-align:right;">
                      <el-button round size="small" style="color:#409eff;" @click="downfun(item.attachId)">下载</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <br>
          <p v-if="noMore" style="text-align:center">没有更多了</p>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>

</template>
<script>
import bgMonitor from '@/assets/login/logow3.png'
import { searchModel } from '@/api/appbeian'
export default {
  data() {
    return {
      bgMonitorImg: bgMonitor, // 图
      appName: '',
      count: 3,
      HeightStyle: {
        overflow: 'auto',
        height: ''
      },
      ficp: '银行',
      pageInfo: {
        pageNumber: 1,
        pageSize: 12
      },
      total: 0,
      loading: false,
      IsloadingA: false,
      clientHeight: '',
      activeName: '0',
      tableData: []
    }
  },
  computed: {
    noMore() {
      return this.tableData.length >= this.total
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  created() {
    this.handleClick()
  },
  mounted() {
    this.HeightStyle.height = document.body.clientHeight + 'px'
  },
  methods: {
    handleClick() {
      switch (this.activeName) {
        case '0':
          this.ficp = '银行'
          this.search()
          break
        case '1':
          this.ficp = '保险'
          this.search()
          break
        case '2':
          this.ficp = '支付'
          this.search()
          break
        case '3':
          this.ficp = '其他'
          this.search()
          break
      }
    },
    downfun(id) {
      location.href = `nifaRecordQuery/mftps/download/${id}`
    },
    load() {
      this.loading = true
      this.pageInfo.pageNumber += 1
      this.searchAdd()
    },
    searchAdd() {
      const params = Object.assign({}, this.pageInfo)
      params.appName = this.appName
      params.ficp = this.ficp
      this.IsloadingA = true
      searchModel(params).then(res => {
        this.loading = false
        this.IsloadingA = false
        this.total = res.total
        this.tableData.push(...res.list)
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    search() {
      this.pageInfo.pageNumber = 1
      const params = Object.assign({}, this.pageInfo)
      params.appName = this.appName
      params.ficp = this.ficp
      this.IsloadingA = true
      this.tableData = []
      searchModel(params).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    goXiang(id) {
      this.$router.push({
        name: 'modelx',
        query:
        {
          id
        }
      })
    },
    goBack() {
      this.$store.dispatch('MostforcedLogOut').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>
<style lang="scss">
.beianStyle{
  p{
      margin: 6px 2px;
  }
  .el-card__body{
    padding: 0;
  }
  .el-tabs__item {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    color: #575757;
  }
  .el-tabs__content{
    padding: 0 15px;
  }
  .el-input--prefix .el-input__inner{
    border-radius:50px;
  }
  .el-card__header{
    height:25vh;
    background: url('~@/assets/login/model.jpg') center  no-repeat;
    background-size: cover;
  }
}
</style>
