<template>
  <div>
    <div id="AppNumberOfRecords" v-loading="loading" :style="{width: '100%', height: '300px'}" />
  </div>
</template>

<script>
export default {
  props: {
    paramsOld: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      educationOpion: [],
      education: [],
      numberOfRecords: [],
      Xdata: [],
      YmaxData: ''
    }
  },
  watch: {
    paramsOld() {
      // this.getData()
    }
  },
  mounted() {
    this.getData(this.paramsOld)
    this.drawLine()
  },
  methods: {
    // 获取、造一些图表需要的数据
    getData(val) {
      this.Xdata = val.dataMsg.map((item, index) => {
        return item.limitDescribe
      })
      this.numberOfRecords = val.dataMsg.map(item => {
        return Number(item.count)
      })
      this.YmaxData = (Math.ceil(Math.max.apply(null, this.numberOfRecords) / 10) * 10) === 0 ? 1000 : (Math.ceil(Math.max.apply(null, this.numberOfRecords) / 10) * 10)
    },
    drawLine() {
      const myChartdegree = this.$echarts.init(document.getElementById('AppNumberOfRecords'))
      myChartdegree.setOption(
        {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: []
          },
          grid: {
            left: '1%',
            right: '10%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.Xdata,
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#A9A6D3'
                },
                interval: 0
              },
              axisLine: {
                lineStyle: {
                  color: '#565486'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              max: this.YmaxData,
              min: 0,
              interval: this.YmaxData / 5,
              axisLine: {
                lineStyle: {
                  color: '#565486'
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#A9A6D3'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: '#565486'
                }
              }
            }
          ],
          series: [
            {
              name: '备案数量',
              type: 'bar',
              barWidth: 20,
              data: this.numberOfRecords,
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 1, 0, 0, // 0,0,1,0表示从左向右    0,0,0,1表示从右向左
                    [
                      { offset: 1, color: '#40BFFB' },
                      { offset: 0, color: '#4381FF' }
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

<style lang="scss">
</style>>

