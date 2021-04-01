<template>
  <div style="margin-top: -46px;">
    <div id="RecordRanking" v-loading="loading" :style="{width: '100%', height: '300px'}" />
  </div>
</template>
<script>
export default {
  props: {
    paramsOld: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      educationOpion: [],
      education: [],
      provinceName: [],
      provinceCount: []
    }
  },
  mounted() {
    this.getData(this.paramsOld)
    this.drawLine()
  },
  methods: {
    compare(property) {
      return function(a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    },
    // 获取、造一些图表需要的数据
    getData(val) {
      val.dataMsg.sort(this.compare('count'))
      val.dataMsg = val.dataMsg.length > 5 ? val.dataMsg.slice(0, 5) : val.dataMsg
      this.provinceName = val.dataMsg.map((item, index) => {
        return (index + 1) + ' ' + item.provinceName
      })
      this.provinceCount = val.dataMsg.map(item => {
        return item.count
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChartdegree = this.$echarts.init(document.getElementById('RecordRanking'))
      // 绘制图表
      myChartdegree.setOption(
        {
          title: {},
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '1%',
            right: '10%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            show: false
          },
          yAxis: {
            type: 'category',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#E3E4E8'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: this.provinceName.reverse()
          },
          textStyle: {
            color: '#E3E4E8'
          },
          series: [
            {
              name: '统计',
              type: 'bar',
              barMinHeight: [25],
              label: {
                show: true,
                position: 'right'
              },
              barMaxWidth: 20,
              data: this.provinceCount.reverse(),
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  barBorderRadius: [10, 10, 10, 10],
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 1, 0, // 0,0,1,0表示从左向右    0,0,0,1表示从右向左
                    [
                      { offset: 1, color: '#3EA0FE' },
                      { offset: 0, color: '#53DAFC' }
                    ]
                  )
                }
              }
            }
          ]
        }
      )
    }
  }
}
</script>
