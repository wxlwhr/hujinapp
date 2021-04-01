<template>
  <div>
    <div id="FilingType" v-loading="loading" :style="{width: '100%', height: '300px'}" />
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
      echartsData: []
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
      this.echartsData = val.dataMsg.map((item, index) => {
        return {
          value: item.count,
          name: item.typeDescribe
        }
      })
    },
    drawLine() {
      const myChartdegree = this.$echarts.init(document.getElementById('FilingType'))
      myChartdegree.setOption(
        {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              minAngle: [10],
              radius: ['25%', '40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position: 'outside'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold',
                    color: '#fff'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: this.echartsData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  color: function(params) {
                    // 自定义颜色
                    var colorList = [
                      '#4850F4', '#CF49F5', '#4AF8FA'
                    ]
                    return colorList[params.dataIndex]
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

