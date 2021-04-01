<template>
  <el-card class="beianStyle" shadow="never">
    <div slot="header" class="header">
      <div v-if="isPc" style="margin-left:3%;">
        <img :src="bgMonitorImg" alt="">
        <a v-if="this.$route.query.type !== '0'" :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
      </div>
      <div v-else>
        <h2 style="text-align:center">备案名单</h2>
        <a v-if="this.$route.query.type !== '0'" :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
      </div>
    </div>
    <br>
    <el-row v-loading="IsloadingA" :gutter="20">
      <div v-if="tableData.length>0">
        <el-col v-for="item in tableData.slice((pageInfoa.pageNumber-1)*pageInfoa.pageSize,pageInfoa.pageNumber*pageInfoa.pageSize)" :key="item.id" :span="6" :xs="24">
          <el-row class="backgStyle" style="padding:10px;">
            <el-col :span="8" class="colStyle" @click.native="goXiang(item.index)">
              <el-image
                :src="item.appIconPath"
                style="width: 80px; height: 80px;border-radius: 6px 6px;align-self:center;cursor:pointer;"
              />
            </el-col>
            <el-col :span="16">
              <el-row>
                <el-col :span="24">
                  <p class="fontStyle" style="font-size:14px;margin-top:0">{{ item.otherAppName }}</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-tooltip :content="item.rinm" :disabled="Disabled(item.rinm, 17)" class="item" effect="dark" placement="top-start">
                    <p class="fontStyle" style="font-size:12px;color:#708090;">{{ item.rinm }}</p>
                  </el-tooltip>
                </el-col>
              </el-row>
              <div>
                <el-row v-show="item.iosType">
                  <p v-if="!item.androidType" style="height:32px" />
                  <el-col :span="16">
                    <el-tooltip :content="item.iosVersion" :disabled="Disabled(item.iosVersion,7)" class="item" effect="dark" placement="top-start">
                      <p class="fontStyle" style="font-size:12px;color:#708090;"><el-tag>{{ item.iosType }}</el-tag>&nbsp;{{ item.iosVersion }}</p>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="8" style="text-align:right;">
                    <p><el-tag type="success">已备案</el-tag></p>
                  </el-col>
                </el-row>
                <el-row v-show="item.androidType">
                  <p v-if="!item.iosType" style="height:32px" />
                  <el-col :span="16">
                    <el-tooltip :content="item.androidVersion" :disabled="Disabled(item.androidVersion,7)" class="item" effect="dark" placement="top-start">
                      <p class="fontStyle" style="font-size:12px;color:#708090;"><el-tag type="warning">{{ item.androidType }}</el-tag>&nbsp;{{ item.androidVersion }}</p>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="8" style="text-align:right;">
                    <p><el-tag type="success">已备案</el-tag></p>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </div>
      <div v-else>
        <el-alert
          :closable="false"
          title="暂无数据"
          center
          type="warning"
        />
      </div>
    </el-row>
    <br>
    <el-row :gutter="20">
      <el-col :span="13" :xs="24" style="padding:0;">
        <el-alert
          :closable="false"
          type="warning"
          style="background-color:#FFF;padding:0;"
        >
          <template slot-scope>
            <p style="color:#8b9eab;">1.名单以备案系统中区块链记录的审核通过时间顺序排列。</p>
            <p style="color:#8b9eab;">2.版本号对应机构提交备案时的客户端软件版本，后续机构将按照备案相关流程持续更新版本信息。</p>
          </template>
        </el-alert>
      </el-col>
      <el-col :span="11" :xs="24">
        <el-pagination
          v-if="isPc"
          :current-page="pageInfoa.pageNumber"
          :page-size="pageInfoa.pageSize"
          :total="tableData.length"
          :pager-count="5"
          :page-sizes="[12, 24, 48]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangea"
          @current-change="handleCurrentChangea"
        />
        <el-pagination
          v-else
          :current-page="pageInfoa.pageNumber"
          :page-size="pageInfoa.pageSize"
          :total="tableData.length"
          :pager-count="5"
          :page-sizes="[12, 24, 48]"
          background
          :small="true"
          layout="prev, pager, next"
          @size-change="handleSizeChangea"
          @current-change="handleCurrentChangea"
        />
      </el-col>
    </el-row>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      size="50%"
    >

      <div style="width:100%;margin-top:50px;text-align:center">
        <h2>备案证书</h2>
      </div>
      <div class="juzhongStyle">
        <img src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" style="width: 400px;border-radius: 6px 6px;margin-top:10px" alt="图片为空">
      </div>
    </el-drawer>
  </el-card>
</template>
<script>
import bgMonitor from '@/assets/login/logow3.png'
import { getData } from '@/data'
// import { searchQuery, getAdrr } from '@/api/appbeian'
export default {
  data() {
    return {
      bgMonitorImg: bgMonitor, // 图
      registerAddrArr: [],
      searchData: {},
      drawer: false,
      isPc: true,
      IsloadingA: false,
      paramsOldA: {},
      auditForm: {
        time: [],
        otherAppName: '',
        rinm: '',
        // recordNumber: '',
        registerAddr: []
      },
      bangzhu1: '注：“已登记”状态指已注册并正在备案系统进行信息申报；“已备案”状态指该APP已通过备案。',
      pageInfoa: {
        pageNumber: 1,
        pageSize: 12
      },
      total: 0,
      tableData: []
    }
  },
  // beforeCreate() {
  //   if (window.location.host.substring(0, 6) !== '172.16') {
  //     this.$router.push({ path: '/login' })
  //   }
  // },
  created() {
    this.IsPC()
  },
  mounted() {
    if (this.$route.params.searchData) {
      const searchData = this.$route.params.searchData
      if ((searchData.pageName === this.$route.name) && searchData.ifReview) {
        this.pageInfoa = searchData.pageInfoa
      }
    }
    this.tableData = getData()
  },
  methods: {
    IsPC() {
      const userAgentInfo = navigator.userAgent
      const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
          this.isPc = false
          break
        }
      }
    },
    imgVivw() {
      this.drawer = true
    },
    Disabled(data, num) {
      if (data !== null) {
        if (data.length < num) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    handleSizeChangea(val) {
      this.pageInfoa.pageSize = val
    },
    handleCurrentChangea(val) {
      this.pageInfoa.pageNumber = val
    },
    goXiang(index) {
      this.searchData = {
        pageName: this.$route.name,
        pageInfoa: this.pageInfoa
      }
      this.$router.push({
        name: 'beianxiang',
        query:
        {
          searchData: JSON.stringify(this.searchData),
          index
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
.registerStyle{
.el-cascader-panel{
  flex-direction: column;
  .el-cascader-menu__wrap {
  border-bottom: 1px solid black;
  }
}
}
.beianStyle{
    .el-card__header{
    height: 80px;
    line-height: 80px;
     background-color: rgb(255, 255, 255);
  }
  .backgStyle{
    height: 130px;
    border-radius: 6px 6px;
    margin-bottom: 10px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    p{
      margin: 4px 2px;
    }
  }
  .fontStyle{
      width:100%;
      text-align:left;
     overflow: hidden;
     text-overflow:ellipsis;
     white-space: nowrap;
   }
    .backgStyle:hover {
  box-shadow: 5px 5px 10px 2px rgba(0,0,0,0.1);
  }
  .colStyle{
    height: 100%;
     display: flex;
  }
  .anniuStyle{
    background-color:#E3F6F7;
    border-color: #E3F6F7;
    color: #4F8285;
  }
   .juzhongStyle{
    width:800px;
     display: flex;
     display: -webkit-flex;
     justify-content: center;
     align-items: center;
     position: absolute;
    top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
}
</style>
