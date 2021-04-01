<template>
  <div>
    <div id="AppFilingType" v-loading="loading" :style="{width: '100%', height: '300px'}" />
  </div>
</template>

<script>
export default {
  props: {
    paramsOld: {
      type: Object,
      required: true
    },
    edata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      educationOpion: [],
      education: [],
      capitalTransactionData: [],
      informationAcquisitionData: [],
      informationDirectData: [],
      name: '资金交易'
    }
  },
  watch: {
    edata: {
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
      // const arr = val.dataMsg.map(item => {
      //   return [...item.count]
      // })
      // this.YmaxData = (Math.ceil(Math.max.apply(null, this.largestOfArr(arr)) / 10) * 10) === 0 ? 250 : (Math.ceil(Math.max.apply(null, this.largestOfArr(arr)) / 10) * 10)
    },
    // 二维数组最大值
    // largestOfArr(arr) {
    //   return arr.map(Function.apply.bind(Math.max, null))
    // },
    drawLine() {
      const myChartdegree = this.$echarts.init(document.getElementById('AppFilingType'))
      myChartdegree.setOption(
        {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: this.edata.name,
              type: 'pie',
              minAngle: '6',
              radius: ['20%', '32%'],
              center: ['50%', '57%'],
              min: 20,
              label: {
                formatter: ' {b} ',
                borderWidth: 1,
                borderRadius: 4
              },
              data: this.edata.arr
              // itemStyle: {
              //   normal: {
              //     color: function(params) {
              //       // 自定义颜色
              //       var colorList = [
              //         '#3C5ECF', '#9A41E7', '#BC39DE', '#60C3E5', '#6C39DF', '#3EEBEE', '#8257EB'
              //       ]
              //       return colorList[params.dataIndex]
              //     }
              //   }
              // }
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

