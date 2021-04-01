<template>
  <div>
    <div id="FilingTrend" v-loading="loading" :style="{width: '100%', height: '100%'}" />
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
      dayData: [],
      countData: [],
      YmaxData: ''
    }
  },
  watch: {
    paramsOld: {
      handler(newVal, oldVal) {
        this.getData(newVal)
        this.drawLine()
      },
      deep: true
    }
  },
  mounted() {
    this.getData(this.paramsOld)
    this.drawLine()
  },
  methods: {
    // 获取、造一些图表需要的数据
    getData(val) {
      this.dayData = val.dataMsg.map((item, index) => {
        return item.day
      })
      this.countData = val.dataMsg.map(item => {
        return item.count
      })
      this.YmaxData = (Math.ceil(Math.max.apply(null, this.countData) / 10) * 10) === 0 ? 1000 : (Math.ceil(Math.max.apply(null, this.countData) / 10) * 10)
    },
    drawLine() {
      const myChartdegree = this.$echarts.init(document.getElementById('FilingTrend'))
      var colors = ['#5793f3', '#d14a61', '#675bba']
      myChartdegree.setOption(
        {
          title: {
            title: '',
            subtext: '(个)',
            top: '0',
            left: '5%'
          },
          color: colors,
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            top: 50,
            height: '65%'
          },
          xAxis: [
            {
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#A9A6D3'
                }
              },
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#5A5988'
                }
              },
              axisPointer: {
                label: {
                  formatter: function(params) {
                    return '备案数  ' + params.value + '日' +
                            (params.seriesData.length ? '：' + params.seriesData[0].data + '个' : '')
                  }
                }
              },
              data: this.dayData
            }
          ],
          yAxis: [
            {
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#5A5988'
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
              },
              type: 'value',
              max: this.YmaxData,
              min: 0,
              interval: this.YmaxData / 5
            }
          ],
          series: [
            {
              name: '2016 降水量',
              type: 'line',
              smooth: true,
              data: this.countData,
              areaStyle: {
                normal: {
                  color: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: ' rgb(41, 80, 206)' // 0% 处的颜色
                    }, {
                      offset: 0.7,
                      color: 'rgb(92, 118, 204,0)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  }
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

