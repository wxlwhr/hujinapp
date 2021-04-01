<template>
  <el-card class="beianStyle" shadow="never">
    <div slot="header" class="header">
      <div v-if="isPc">
        <a v-if="this.$route.query.type !== '0'" :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
      </div>
      <!-- <div v-else>
        <h2 style="text-align:center">备案名单</h2>
        <a v-if="this.$route.query.type !== '0'" :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
      </div> -->
    </div>
    <br>
    <div class="search">
      <el-form ref="auditForm" :model="auditForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6" :xs="24">
            <el-form-item label="App名称" prop="otherAppName">
              <el-input v-model="auditForm.otherAppName" placeholder="App名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="24">
            <el-form-item label="机构名称" prop="rinm">
              <el-input v-model="auditForm.rinm" placeholder="机构名称" clearable />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="备案编号" prop="recordNumber">
              <el-input v-model="auditForm.recordNumber" placeholder="备案编号" clearable />
            </el-form-item>
          </el-col> -->
          <el-col :span="6" :xs="24">
            <el-form-item v-if="isPc" label="注册地区" prop="registerAddr">
              <el-cascader
                v-model="auditForm.registerAddr"
                :options="registerAddrArr"
                :props="{ checkStrictly: true }"
                clearable
                style="width:100%"
              />
            </el-form-item>
            <el-form-item v-else label="注册地区" prop="registerAddr">
              <el-cascader
                v-model="auditForm.registerAddr"
                :options="registerAddrArr"
                :props="{ checkStrictly: true }"
                popper-class="registerStylelist"
                clearable
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="24" class="textRight">
            <el-button type="primary" @click="seachAuditForm('auditForm')">查 询</el-button>
            <el-button @click="clearAuditForm('auditForm')">重 置</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="8" :xs="24">
            <el-form-item label="注册时间" prop="time">
              <el-date-picker
                v-model="auditForm.time"
                type="daterange"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </div>
    <br>
    <el-row v-loading="IsloadingA" :gutter="20">
      <div v-if="tableData.length>0">
        <el-col v-for="item in tableData" :key="item.id" :span="6" :xs="24">
          <el-row class="backgStyle" style="padding:10px;">
            <el-col :span="8" class="colStyle" @click.native="goXiang(item.riid,item.iosId,item.androidId)">
              <el-image
                :src="item.appIconPath"
                style="width: 80px; height: 80px;border-radius: 6px 6px;align-self:center;cursor:pointer;"
              >
                <div slot="error" class="el-image__error">
                  暂无图片
                </div>
              </el-image>
            </el-col>
            <el-col :span="16">
              <el-row>
                <el-col :span="24">
                  <!-- <el-tooltip :content="item.otherAppName" :disabled="Disabled(item.otherAppName,20)" class="item" effect="dark" placement="top-start"> -->
                  <p class="fontStyle" style="font-size:14px;margin-top:0">{{ item.otherAppName }}</p>
                  <!-- </el-tooltip> -->
                </el-col>
                <!-- <el-col :span="10">
                  <p style="text-align:right;font-size:12px;">{{ item.recordNumberTime===null?'':item.recordNumberTime.split(" ")[0] }}</p>
                </el-col> -->
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-tooltip :content="item.rinm" :disabled="Disabled(item.rinm, 17)" class="item" effect="dark" placement="top-start">
                    <p class="fontStyle" style="font-size:12px;color:#708090;">{{ item.rinm }}</p>
                  </el-tooltip>
                </el-col>
              </el-row>
              <div v-if="item.otherType">
                <el-row>
                  <p style="height:32px" />
                  <el-col :span="16">
                    <el-tooltip :content="item.otherVersion" :disabled="Disabled(item.otherVersion,7)" class="item" effect="dark" placement="top-start">
                      <p class="fontStyle" style="font-size:12px;color:#708090;"><el-tag type="info">其他</el-tag>&nbsp;{{ item.otherVersion }}</p>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="8" style="text-align:right;">
                    <p v-show="item.otherStatus !== '已备案'"><el-tag class="anniuStyle" style="cursor:pointer;">已登记</el-tag></p>
                    <p v-show="item.otherStatus === '已备案'"><el-tag type="success" style="cursor:pointer;">已备案</el-tag></p>
                  </el-col>
                </el-row>
              </div>
              <div v-else>
                <el-row v-show="item.iosType">
                  <p v-if="!item.androidType" style="height:32px" />
                  <el-col :span="16">
                    <el-tooltip :content="item.iosVersion" :disabled="Disabled(item.iosVersion,7)" class="item" effect="dark" placement="top-start">
                      <p class="fontStyle" style="font-size:12px;color:#708090;"><el-tag>{{ item.iosType | initialLowercase }}</el-tag>&nbsp;{{ item.iosVersion }}</p>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="8" style="text-align:right;">
                    <p v-show="item.iosStatus !== '已备案'"><el-tag class="anniuStyle" style="cursor:pointer;">已登记</el-tag></p>
                    <p v-show="item.iosStatus === '已备案'"><el-tag type="success" style="cursor:pointer;">已备案</el-tag></p>
                    <!-- @click="imgVivw()" -->
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
                    <p v-show="item.androidStatus !== '已备案'"><el-tag class="anniuStyle" style="cursor:pointer;">已登记</el-tag></p>
                    <p v-show="item.androidStatus === '已备案'"><el-tag type="success" style="cursor:pointer;">已备案</el-tag></p>
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
      <el-col :span="11" :xs="24" style="padding:0;">
        <el-alert
          :closable="false"
          type="warning"
          style="background-color:#FFF;padding:0;"
        >
          <template slot-scope>
            <!-- <p style="color:#8b9eab;">1.名单以备案系统中区块链记录的审核通过时间顺序排列。</p> -->
            <!-- <p style="color:#8b9eab;">1.版本号对应机构提交备案时的客户端软件版本，后续机构将按照备案相关流程持续更新版本信息。</p> -->
            <p style="color:#8b9eab;">经外部机构测评符合国家和监管部门相关安全管理规范要求的移动金融客户端软件可申请备案，完成备案不代表对移动金融客户端应用软件提供方合规经营的其他方面情况的认可。</p>
          </template>
        </el-alert>
      </el-col>
      <el-col :span="13" :xs="24">
        <el-pagination
          v-if="isPc"
          :current-page="pageInfo.pageNumber"
          :page-size="pageInfo.pageSize"
          :total="total"
          :pager-count="5"
          :page-sizes="[12, 24, 48]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangea"
          @current-change="handleCurrentChangea"
        />
        <el-pagination
          v-else
          :current-page="pageInfo.pageNumber"
          :page-size="pageInfo.pageSize"
          :total="total"
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
import { searchQuery, getAdrr } from '@/api/appbeian'
export default {
  data() {
    return {
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
      pageInfo: {
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
        this.auditForm = searchData.searchForm
        this.pageInfo = searchData.pageInfo
      }
    }
    this.getData()
    this.getAuditForm()
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
      if (!this.isPc) {
        location.href = 'https://mftp.nifa.org.cn'
        // location.href = 'http://61.181.59.73:5201'
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
    getData() {
      // 三级联动数据
      getAdrr().then(res => {
        this.registerAddrArr = res
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
    clearAuditForm(formName) {
      this.$refs[formName].resetFields()
      this.getAuditForm()
    },
    getAuditForm() {
      this.pageInfo.pageNumber = 1
      const params = Object.assign({}, this.pageInfo, this.auditForm)
      delete params.time
      delete params.registerAddr
      params.registerProvince = String(this.auditForm.registerAddr[0] ? this.auditForm.registerAddr[0] : '')
      params.registerCity = String(this.auditForm.registerAddr[1] ? this.auditForm.registerAddr[1] : '')
      params.registerArea = String(this.auditForm.registerAddr[2] ? this.auditForm.registerAddr[2] : '')
      params.addTime = this.auditForm.time ? this.auditForm.time[0] : ''
      params.updateTime = this.auditForm.time ? this.auditForm.time[1] : ''
      this.IsloadingA = true
      searchQuery(params).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
        this.paramsOldA = params
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleSizeChangea(val) {
      this.paramsOldA.pageSize = val
      this.pageInfo.pageSize = val
      this.IsloadingA = true
      searchQuery(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    handleCurrentChangea(val) {
      this.paramsOldA.pageNumber = val
      this.pageInfo.pageNumber = val
      this.IsloadingA = true
      searchQuery(this.paramsOldA).then(res => {
        this.IsloadingA = false
        this.total = res.total
        this.tableData = res.list
      }).catch(() => {
        this.IsloadingA = false
      })
    },
    goXiang(riid, iosId, andid) {
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
      this.searchData = {
        pageName: this.$route.name,
        pageInfo: this.pageInfo,
        searchForm: this.auditForm
      }
      this.$router.push({
        name: 'beianxiang',
        query:
        {
          searchData: JSON.stringify(this.searchData),
          type: this.$route.query.type,
          riid: riid,
          iosId: iosId,
          andid
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
.registerStylelist{
.el-cascader-panel{
  flex-direction: column;
  .el-cascader-menu__wrap {
  border-bottom: 1px solid black;
  }
}
}
.beianStyle{
  width: 100%;
  border: none;
  .el-card__header{
    height: 100px;
    padding: 0;
    background: url('~@/assets/login/logow4.png') no-repeat;
    background-size: 100% 100px;
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
