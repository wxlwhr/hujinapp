<template>
  <div>
    <div id="ApplicationPermissions" v-loading="loading" :style="{width: '100%', height: '300px'}" />
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
      showDataName: [],
      showData: []
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
      this.showDataName = val.dataMsg.slice(0, 8).map((item, index) => {
        return item.permName
      })
      this.showData = val.dataMsg.slice(0, 8).map(item => {
        return {
          value: item.count,
          name: item.permName
        }
      })
    },
    drawLine() {
      const myChartdegree = this.$echarts.init(document.getElementById('ApplicationPermissions'))
      myChartdegree.setOption(
        {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          textStyle: {
            color: '#E3E4E8'
          },
          legend: {
            x: 'center',
            y: '75%',
            textStyle: { // 图例文字的样式
              fontSize: 10,
              color: '#E3E4E8'
            },
            data: this.showDataName
          },
          calculable: true,
          series: [
            {
              name: '应用权限',
              type: 'pie',
              minAngle: [6],
              radius: ['13%', '40%'],
              center: ['47%', '45%'],
              roseType: 'area',
              data: this.showData,
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
                      '#53E9B7', '#3C5ECF', '#9A41E7', '#BC39DE', '#60C3E5', '#6C39DF', '#3EEBEE', '#8257EB'
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

