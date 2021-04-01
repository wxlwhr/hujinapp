<template>
  <el-card class="jgdpStyle">
    <div slot="header" class="clearfix btnCard jgdpheard">
      <span>移动金融APP备案</span>
      <a :style="{ backgroundImage: 'url(' + require('@/assets/back/back.png') + ')' , backgroundRepeat: 'no-repeat'}" class="back" @click="goBack" />
      <div class="top"><img src="../../assets/jgmap/top.png"></div>
    </div>
    <el-row>
      <el-col :span="6">
        <el-col :span="24" class="border">
          <div class="header">
            <span>App备案排名</span>
          </div>
          <RecordRanking v-if="RecordRankingParams.dataMsg.length>0" :params-old="RecordRankingParams" style="width:100%;" />
        </el-col>
        <el-col :span="24" class="border" style="position:relative">
          <div>
            <div class="header">
              <span>各行业App备案类型分布</span>
            </div>
            <AppFilingType v-if="AppFilingTypeParams.dataMsg.length>0" :params-old="AppFilingTypeParams" :edata="AppFilingTypeArr" style="margin-top:-40px;" />
          </div>
          <div class="header filing-type">
            <el-button-group>
              <el-button :id="zijinTips?'checked':''" class="tabBtn" type="primary" @click="getFilingType('资金')">资金交易</el-button>
              <el-button :id="xinxiTips?'checked':''" class="tabBtn" type="primary" @click="getFilingType('信息')">信息采集<i class=" el-icon--right" /></el-button>
              <el-button :id="zixunTips?'checked':''" class="tabBtn" type="primary" @click="getFilingType('资讯')">资讯查询</el-button>
            </el-button-group>
          </div>
        </el-col>
        <!-- <el-col :span="24" class="border">
          <div>
            <div class="header">
              <span>机构App备案数量分布</span>
            </div>
            <AppNumberOfRecords v-if="AppNumberOfRecordsParams.dataMsg.length>0" :params-old="AppNumberOfRecordsParams" style="margin-top:-40px;" />
          </div>
        </el-col> -->
      </el-col>
      <el-col :span="12" class="center" style="position:relative">
        <el-Row>
          <el-col v-for="(wrapItem,wrapIndex) in centerNumData" :key="wrapIndex" :span="6" align="center" class="top-show">
            <div style="position:relative">
              <p class="num-name">{{ wrapItem.data.name }}</p>
              <span v-for="(item,index) in wrapItem.data.num" :id="numTest(index,wrapItem.data.num)?'is-zero':'not-zero'" :key="index" class="num">
                {{ item }}
              </span>
              <span class="unit">{{ wrapItem.data.unit }}</span>
            </div>
          </el-col>
        </el-Row>
        <el-Row style="position:relative;width:100%">
          <el-col :span="18">
            <chinaMap v-if="RecordRankingParams.dataMsg.length>0 && provinceData.length>0" style="width:100%;heigh:100%;transform:translateX(-2%)" :params-old="RecordRankingParams.dataMsg" :province-data="provinceData" @sendMsg="sendMsg" /></el-col>
          <!-- <el-col :span="6">
            <div style="color:#fff;position:absolute;right:5%;top:100%; transform:translateY(70%);" class="map-right-data">
              <div v-for="(item,index) in mapRightData" :key="index">
                <p class="top-name">{{ item.name }}</p>
                <p class="main">
                  <span class="main-num">
                    <span class="main-num-content">
                      {{ toThousands(item.num) }}
                      <span class="main-unit">{{ item.unit }}</span>
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </el-col> -->
        </el-Row>
        <!-- <el-Row style="position:absolute;bottom:0;width:100%;height:35%">
          <el-col :span="24" style="color:#fff;height:100%;">
            <div style="width:100%;height:100%">
              <div class="header" style="width:100%;height:10%;">
                <span style="display:inline-block;padding-top:2.5%;">备案趋势</span>
              </div>
              <FilingTrend v-if="FilingTrendParams.dataMsg.length>0" :params-old="FilingTrendParams" style="width:100%;height:95%;padding-bottom:5%" />
            </div>
          </el-col>
        </el-Row> -->
      </el-col>
      <el-col :span="6">
        <el-col :span="24" class="border" style="position:relative">
          <div>
            <div class="header">
              <span>应用权限分布</span>
            </div>
            <ApplicationPermissions v-if="ApplicationPermissionsParams.dataMsg.length>0" :params-old="ApplicationPermissionsParams" style="margin:-45px 0 0 0;" />
          </div>
          <div class="header">
            <el-button-group style="position:absolute;top:1%;right:1%;">
              <el-button :id="AndroidTips?'checked':''" class="tabBtn" type="primary" @click="getApplicationPermissions('C2000030')">Android</el-button>
              <el-button :id="IOSTips?'checked':''" class="tabBtn" type="primary" @click="getApplicationPermissions('C2000031')">IOS<i class=" el-icon--right" /></el-button>
            </el-button-group>
          </div>
        </el-col>
        <!-- <el-col :span="24" class="border">
          <div>
            <div class="header">
              <span>备案类型分布</span>
            </div>
            <FilingType v-if="FilingTypeParams.dataMsg.length>0" :params-old="FilingTypeParams" style="margin-top:-40px;" />
          </div>
        </el-col> -->
        <el-col :span="24" class="border">
          <div>
            <div class="header">
              <span>区块链相关数据展示</span>
            </div>
            <BlockChainDataShow />
          </div>
        </el-col>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import RecordRanking from '@/views/jgmap/RecordRanking'
import AppFilingType from '@/views/jgmap/AppFilingType'
// import AppNumberOfRecords from '@/views/jgmap/AppNumberOfRecords'
import ApplicationPermissions from '@/views/jgmap/ApplicationPermissions'
// import FilingType from '@/views/jgmap/FilingType'
import chinaMap from '@/views/jgmap/chinaMap'
// import FilingTrend from '@/views/jgmap/FilingTrend'
import BlockChainDataShow from '@/views/jgmap/BlockChainDataShow'

import {
  getAppRecordRanking,
  getAppTypeOfIndustryFiling,
  // getAppNumberOfRecords,
  // getFilingType,
  getApplicationPermissions,
  getNumberData,
  getFilingTrendT,
  getProvinceData
} from '@/api/jgmap'
export default {
  components: {
    RecordRanking, // app备案排名
    AppFilingType, // 各行业APP备案类型分布
    // AppNumberOfRecords, // 机构APP备案数量分布
    ApplicationPermissions, // 应用权限分布
    // FilingType, // 备案类型分布
    chinaMap, // 中国地图
    // FilingTrend, // 备案趋势
    BlockChainDataShow // 区块链数据展示
  },
  data() {
    return {
      zijinTips: true,
      xinxiTips: false,
      zixunTips: false,
      provinceData: [],
      AndroidTips: true,
      IOSTips: false,
      AppFilingTypeArr: {
        name: '',
        arr: []
      },
      RecordRankingParams: {
        dataMsg: []
      },
      AppFilingTypeParams: {
        dataMsg: []
      },
      AppNumberOfRecordsParams: {
        dataMsg: []
      },
      ApplicationPermissionsParams: {
        dataMsg: []
      },
      FilingTypeParams: {
        dataMsg: []
      },
      FilingTrendParams: {
        dataMsg: []
      },
      centerNumData: {
        allFilingInstitution: {
          data: {
            unit: '家',
            name: '累计备案机构',
            num: '0000'
          }
        },
        allFilingApp: {
          data: {
            unit: '个',
            name: '累计备案APP',
            num: '0000'
          }
        },
        todayFilingInstitution: {
          data: {
            unit: '家',
            name: '今日备案机构',
            num: '0000'
          }
        },
        todayFilingApp: {
          data: {
            unit: '个',
            name: '今日备案APP',
            num: '0000'
          }
        }
      },
      mapRightData: [
        {
          name: '已注册机构',
          num: '',
          unit: '家'
        },
        {
          name: '已登记APP',
          num: '',
          unit: '个'
        },
        {
          name: '已备案APP',
          num: '',
          unit: '个'
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取表格数据
    getData() {
      getProvinceData({ range: '' }).then(res => {
        this.provinceData = res
      })
      getAppRecordRanking().then(res => {
        this.RecordRankingParams.dataMsg = res
      })
      getAppTypeOfIndustryFiling().then(res => {
        this.AppFilingTypeParams.dataMsg = res
        this.AppFilingTypeArr.name = '资金交易'
        this.AppFilingTypeArr.arr = res.map(item => {
          return {
            value: item.count[0],
            name: item.industryName
          }
        })
      })
      // getAppNumberOfRecords().then(res => {
      //   this.AppNumberOfRecordsParams.dataMsg = res
      // })
      // getFilingType().then(res => {
      //   this.FilingTypeParams.dataMsg = res
      // })
      getApplicationPermissions({ productType: 'C2000030' }).then(res => {
        this.ApplicationPermissionsParams.dataMsg = res
      })
      getNumberData().then(res => {
        const arr = Object.values(res).slice(0, 4)
        Object.values(this.centerNumData).filter((item, index) => {
          item.data.num = repairZero(arr[index])
          function repairZero(data) {
            if (data.length < 4) {
              data = '0' + data
              return repairZero(data)
            } else {
              return data
            }
          }
        })
        const brr = Object.values(res).slice(4)
        this.mapRightData.filter((item, index) => {
          item.num = brr[index]
        })
      })
      getFilingTrendT({ month: this.getDay() }).then(res => {
        this.FilingTrendParams.dataMsg = res
      })
    },
    // 把chainaMap中的月份信息传递到备案趋势中
    sendMsg(data) {
      this.FilingTrendParams.dataMsg = data
    },
    // 备案类型切换
    getFilingType(type) {
      const arr = this.AppFilingTypeParams.dataMsg.map(item => {
        return {
          value: item.count[0],
          name: item.industryName
        }
      })
      const brr = this.AppFilingTypeParams.dataMsg.map(item => {
        return {
          value: item.count[1],
          name: item.industryName
        }
      })
      const crr = this.AppFilingTypeParams.dataMsg.map(item => {
        return {
          value: item.count[2],
          name: item.industryName
        }
      })
      if (type === '资金') {
        this.zijinTips = true
        this.xinxiTips = false
        this.zixunTips = false
        this.AppFilingTypeArr.name = '资金交易'
        this.AppFilingTypeArr.arr = arr
      } else if (type === '信息') {
        this.zijinTips = false
        this.xinxiTips = true
        this.zixunTips = false
        this.AppFilingTypeArr.name = '信息采集'
        this.AppFilingTypeArr.arr = brr
      } else if (type === '资讯') {
        this.zijinTips = false
        this.xinxiTips = false
        this.zixunTips = true
        this.AppFilingTypeArr.name = '资讯直询'
        this.AppFilingTypeArr.arr = crr
      }
    },
    // android和ios切换
    getApplicationPermissions(val) {
      if (val === 'C2000030') {
        this.AndroidTips = true
        this.IOSTips = false
      } else {
        this.AndroidTips = false
        this.IOSTips = true
      }
      getApplicationPermissions({ productType: val }).then(res => {
        this.ApplicationPermissionsParams.dataMsg = res
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    // 获取当前年月
    getDay() {
      const now = new Date()
      return now.getFullYear() + '-' + (now.getMonth() + 1)
    },
    // 把数字转化成555,666,555这种带逗号格式
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    },
    // 区分如0056与0506中的前面的零与中间的零
    numTest(index, data) {
      if (data[index] !== '0') {
        return false
      } else if (data[index] === '0' && index === 0) {
        return true
      } else {
        return this.numTest(index - 1, data)
      }
    }
  }
}
</script>
<style lang="scss">
.jgdpStyle{
  min-height: 100%;
  width: 100%;
  background:url(../../assets/jgmap/监管大屏背景图.png);
  background-size:auto;
  .top{
    margin: 0 auto;
    transform: translateY(-30%);
  }
  .el-card__header{
  border: none;
}
  .header{
    padding: 8px 10px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    font-weight: 700;
    span{
      color: #43ECF1;
    }
    .tabBtn{
      border-radius: 0;
      border: 1px solid #5A78E8;
      background: #251D58;
    }
    #checked{
      background: #514FA1;
    }
  }
  .filing-type{
   z-index: 10000;
   position: absolute;
   top: 0;
   right: 0;
   transform: translate(1%,-2%);
    .el-button--primary {
      font-size: 12px;
      padding: 3px 1px;
    }
  }
  .center{
    .top-show{
      .num-name{
        color: #EBEEF5;
        font-size: 12px;
        margin-left: -40px;
        text-align: center;
        transform: translateY(10px);
      }
      .num{
        font-weight: bolder;
        color: #45F8FB;
        display: inline-block;
        height: 22px;
        width: 22px;
        border: 1.5px solid #3C79D9;
        box-shadow: 0px 0px 5px rgb(108, 161, 247);
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        margin-left: 4px;
        border-radius: 3px;
      }
      .unit{
        font-size: 12px;
        color: #EBEEF5;
      }
      #is-zero{
        color: #fff;

      }
    }
    .map-right-data{
      .top-name{
        color: #6DF8FA;
        font-size: 12px;
        margin-left: -40px;
        text-align: center;
        transform: translateY(10px);
      }
      .main{
        .main-num{
          display: inline-block;
          min-width: 100px;
          height: 35px;
          background: linear-gradient(to left, #6DF8FA, #6DF8FA) left top no-repeat,
          linear-gradient(to bottom, #6DF8FA, #6DF8FA) left top no-repeat,
          linear-gradient(to left, #6DF8FA, #6DF8FA) right top no-repeat,
          linear-gradient(to bottom, #6DF8FA, #6DF8FA) right top no-repeat,
          linear-gradient(to left, #6DF8FA, #6DF8FA) left bottom no-repeat,
          linear-gradient(to bottom, #6DF8FA, #6DF8FA) left bottom no-repeat,
          linear-gradient(to left, #6DF8FA, #6DF8FA) right bottom no-repeat,
          linear-gradient(to left, #6DF8FA, #6DF8FA) right bottom no-repeat;
          background-size: 2px 4px, 4px 2px, 2px 4px, 4px 2px;
          .main-unit{
            font-size: 12px;
            color: #F3F3F9;
          }
          .main-num-content{
            display: inline-block;
            font-size: 18px;
            text-align: center;
            line-height: 31px;
            font-weight: 200;
            color: #6DF8FA;
            width: 96px;
            height: 31px;
            background: rgba(24, 25, 71,0.3);
            transform: translate(2px,2px)
          }
        }

      }
    }
  }
  .border{
    height:30%;
    border:2px solid rgb(96, 123, 241);
    border-radius:5px;
    margin: 10% 0 10%;
    box-shadow: 0px 0px 15px rgb(74, 105, 241) ;
  }
  .jgdpheard{
    font-size: 35px;
    font-weight: bold;
    text-align: center;
    span{
      color: #EBEEF5;
      text-shadow: 0 0 30px #87e0f2;
    }
  }
}
</style>
