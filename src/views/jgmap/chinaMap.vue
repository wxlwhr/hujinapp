<template>
  <div class="box">
    <!-- <button class="backBtn" @click="back()">返回上级</button> -->
    <div class="select">
      <!-- <span style="color:#fff;">城市:</span>
      <el-select
        v-model="value"
        placeholder="请选择"
        style="color:#fff;"
        @change="provinceChange"
      >
        <el-option
          v-for="item in chinaProvince"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
      <!-- <span style="color:#fff;">月份:</span>
      <el-date-picker
        v-model="mounthData"
        style="width:23%"
        type="date"
        format="yyyy-MM-dd"
        placeholder="请选择"
        @change="mounthDataChange"
      />
      <el-button class="all" style="color:#BABEC8;margin-left:4%;">累计</el-button> -->

    </div>

    <div id="mapChart" class="chart" />

  </div>
</template>

<script>
import cityMap from '@/js/china-main-city-map.js'
import echarts from 'echarts'
import axios from 'axios'
import chinaProvince from '@/js/chinaProvince.js'
import {
  getFilingTrendT
} from '@/api/jgmap'
// import Vue from 'vue'
// import registerAndsetOption from '@/js/echarts-map'

// 中国地图（第一级地图）的ID、Name、Json数据
var chinaId = 100000
var chinaName = 'china'

// 记录父级ID、Name
var mapStack = []
var parentId = null
var parentName = null

// Echarts地图全局变量，主要是在返回上级地图的方法中会用到
var myChart = null
export default {

  name: 'ChinaMap',
  props: {
    paramsOld: {
      type: Array,
      default: function() {
        return []
      }
    },
    provinceData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      mounthData: '',
      chinaProvince,
      chinaJson: null,
      value: ''
    }
  },
  mounted: function() {
    this.getMapMaxAndMin()
    this.mapChart('mapChart')
  },
  methods: {
    // 获取地图左下方的横线数据
    getMapMaxAndMin() {
      const arr = this.paramsOld.map(item => {
        return item.count
      })
      arr.sort()
      this.max = Number(arr[arr.length - 1])
      this.min = Number(arr[0])
    },
    // 获取选择的年月，若清空则返回当前年月
    getDay(data) {
      if (data) {
        return data.getFullYear() + '-' + (data.getMonth() + 1)
      } else {
        const now = new Date()
        return now.getFullYear() + '-' + (now.getMonth() + 1)
      }
    },
    // 选择日期
    mounthDataChange(data) {
      const month = this.getDay(data)
      getFilingTrendT({ month }).then(res => {
        this.$emit('sendMsg', res)
      })
    },
    // 下拉菜单选择省
    provinceChange(data) {
      const cityId = cityMap[data]
      var json = require('@/../static/json/map/' + cityId + '.json')
      const mapJson = json
      this.registerAndsetOption(
        myChart,
        cityId,
        data,
        mapJson,
        true
      )
    },
    /**
     * 返回上一级地图
     */
    back() {
      if (mapStack.length !== 0) {
        // 如果有上级目录则执行
        var map = mapStack.pop()
        axios
          .get('./static/json/map/' + map.mapId + '.json', {})
          .then(response => {
            const mapJson = response.data
            this.registerAndsetOption(
              myChart,
              map.mapId,
              map.mapName,
              mapJson,
              false
            )

            // 返回上一级后，父级的ID、Name随之改变
            parentId = map.mapId
            parentName = map.mapName
          })
      }
    },
    /**
     * Echarts地图
     */
    mapChart(divid) {
      var json = require('@/json/map/' + chinaId + '.json')
      const mapJson = json
      this.chinaJson = mapJson
      myChart = echarts.init(document.getElementById(divid))
      this.registerAndsetOption(myChart, chinaId, chinaName, mapJson, false)
      parentId = chinaId
      parentName = 'china'
      var this_chinaJson = this.chinaJson
      myChart.on('click', function(param) {
        var cityId = cityMap[param.name]
        if (cityId) {
          // 代表有下级地图
          // var json = require('@/../static/json/map/' + cityId + '.json')
          // const mapJson = json
          // registerAndsetOption(
          //   myChart,
          //   cityId,
          //   param.name,
          //   mapJson,
          //   true
          // )
        } else {
          // 没有下级地图，回到一级中国地图，并将mapStack清空
          this.registerAndsetOption(myChart, chinaId, chinaName, this_chinaJson, false)
          mapStack = []
          parentId = chinaId
          parentName = chinaName
        }
      })
    },
    registerAndsetOption(myChart, id, name, mapJson, flag) {
      echarts.registerMap(name, mapJson)
      myChart.setOption({
        tooltip: {
          show: true,
          backgroundColor: 'rgba(14,54,108,0.9)',
          formatter: function(params) {
            var str = ''
            str += "<span style='color:rgba(83,249,255);font-weight:bold;font-size:16px;'>" + params.name + '</span><br/>'
            str += "已注册机构：<span style='color:rgba(83,249,255);padding: 5px;'>" + params.data['android'] + '</span>个<br/>'
            str += "已备案APP：<span style='color:rgba(83,249,255);padding: 5px;'>" + params.data['ios'] + '</span>个<br/>'
            str += "已登记APP：<span style='color:rgba(83,249,255);padding: 5px;'>" + params.data['other'] + '</span>个<br/>'
            return "<div style='padding:6px;'>" + str + '</div>'
          }
        },
        visualMap: {
          min: this.min,
          max: this.max,
          type: 'continuous',
          orient: 'horizontal',
          itemWidth: 10,
          itemHeight: 100,
          text: ['高', '低'],
          showLabel: true,
          seriesIndex: [0],
          textStyle: {
            color: '#7B93A7'
          },
          bottom: '10%',
          left: '10%',
          inRange: {
            color: ['rgba(24, 116, 242, 1)', 'rgba(32, 182, 253, 1)', 'rgba(34, 229, 222, 1)', 'rgba(255, 205, 32, 1)', 'rgba(255, 137, 32, 1)']
          }
        },
        series: [
          {
            type: 'map',
            map: name,
            zoom: 1,
            label: {
              normal: {
                show: true,
                color: '#fff'
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                areaColor: 'rgba(24, 116, 242, 1)',
                borderColor: 'rgba(163, 199, 250, 1)',
                shadowBlur: 0,
                borderWidth: 2
              },
              emphasis: {
                areaColor: 'rgba(18, 0, 236, 0.8)'
              }
            },
            data: this.initMapData(mapJson)
          }
        ]
      })

      if (flag) {
        // 往mapStack里添加parentId，parentName,返回上一级使用
        mapStack.push({
          mapId: parentId,
          mapName: parentName
        })
        parentId = id
        parentName = name
      }
    },
    initMapData(mapJson) {
      var mapData = []
      for (var i = 0; i < mapJson.features.length; i++) {
        const name = mapJson.features[i].properties.name
        const obj = this.initMapTooLtipData(mapJson.features[i].id)
        mapData.push({
          name: name,
          value: this.initMapColorData(mapJson.features[i].id),
          android: obj.currOrgCount, // 已注册机构
          ios: obj.currRecordAppCount, // 已登记APP
          other: obj.currReportAppCount, // 其他
          id: mapJson.features[i].id
        })
      }
      return mapData
    },
    // 初始化鼠标划过时，展示的数据
    initMapTooLtipData(data) {
      const arr = this.provinceData.map(item => {
        return item.currProvince
      })
      return this.provinceData[arr.indexOf(data)]
    },
    // 初始化颜色深浅对应的数据
    initMapColorData(data) {
      const arr = this.paramsOld.map(item => {
        return item.provinceCode
      })
      const num = arr.indexOf(data)
      if (num < 0) {
        return 0
      } else {
        return this.paramsOld[num].count
      }
    }
  }
}
</script>

<style>
/* body {
  background-image: url("../../assets/beijingtupian.png");
} */
</style>

<style scoped>
.all{
  border: 1px solid #506BCD;
  border-radius: 0;
  background: #22215B;
}
.select{
 margin-top: 5%;
 margin-left: 14%;
}
.title {
  width: 100%;
  height: 10vh;
  text-align: center;
  color: #fff;
  font-size: 2em;
  line-height: 10vh;
}
.box {
  position: absolute;
  width: 90%;
  height: 80vh;
  left: 5%;
  top: 10%;
  /* background-color: rgba(24, 27, 52, 0.62); */
}

.chart {
  position: relative;
  min-height: 500px;
  min-width: 450px;
  margin:0 auto;
}
.backBtn {
  position: absolute;
  top: 0;
  background-color: #00c298;
  border: 0;
  color: #fff;
  height: 27px;
  font-family: Microsoft Yahei;
  font-size: 1em;
  cursor: pointer;
}
.myBlog {
  position: absolute;
  top: 2px;
  right: 5%;
  display: block;
  border: 2px solid #262a53;
}
.myBlog a {
  text-decoration: none;
  display: inline-block;
  color: #fff;
  padding: 5px;
  font-size: 1em;
}

.myBlog a img {
  vertical-align: middle;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin: -5px 5px auto auto;
}
.bottom {
  position: absolute;
  width: 100%;
  height: 5%;
  line-height: 100%;
  left: 0;
  bottom: 0%;
  text-align: center;
}
.tooltipStyle{
    color:rgba(83,249,255)
}
</style>
<style>

.box .select .el-select{
  color: #fff;
  width: 17%;
  height: 25px;
}
.box .select .el-input{
  color: #fff;
}
.box .select .el-input__inner {

     border: none;
     background: #22215B;
     border: 1px solid #506BCD;
     border-radius: 0;
}
.box .select .el-input__inner:hover {
     border: 1px solid #506BCD;
     border-radius: 0;
}
.box .select .el-input__inner:focus {
     border: 1px solid #506BCD;
     border-radius: 0;
}
</style>
