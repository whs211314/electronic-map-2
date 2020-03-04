<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div class="item flex-center" :class="isChart ? 'active':''" @click="chartClick">月交易量</div>
        <div class="item flex-center" :class="isGrade ? 'active':''" @click="gradeClick">地市交易</div>
        <div class="item flex-center" :class="isActivity ? 'active':''"  @click="activityClick">交易种类分布</div>
      </div>
    </div>
    <!-- 交易笔数柱状图 -->
    <div v-show="isChart" class="chart-wrapper">
      <div id="line-chart"></div>
    </div>
    <!-- 开业时间柱状图 -->
    <div v-show="isGrade" class="chart-wrapper">
      <div id="line-grade"></div>
    </div>
    <!-- 营销活动 -->
    <div v-show="isActivity" class="chart-wrapper">
      <div id="line-activity"></div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
import echarts from 'echarts'

export default {
  data () {
    return {
      isChart: true,
      isGrade: false,
      isActivity: false,
      // 月交易量
      chartList: [],
      chartStrokeCount: [],
      chartNum: [],
      // 地市交易
      gradeList: [],
      gradeStrokeCount: [],
      gradetNum: [],
      // 交易种类分布
      activityList: [],
      activityStrokeCount: [],
      activityNum: []
    }
  },
  methods: {
    // 交易笔数交易金额
    chartClick () {
      // const list = { 'dataAxis': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '自治州', '娄底'], 'data2': ['143193589', '210927236', '165573746', '148498393', '399551593', '293959838', '410724505', '186772210', '143527674', '171968171', '756672763', '842089629', '246434172', '163790509'], 'data1': ['1174286', '1087766', '724476', '1193744', '1717996', '1400677', '2002448', '2101917', '588114', '1397801', '7784269', '5677594', '1093692', '1185870'] }
      let classType = {
        reportPlace: 311
      }
      api.getClassInfo(classType).then(res => {
        this.isActivity = false
        this.isChart = true
        this.isGrade = false
        this.chartList = res.data.dataAxis
        this.chartStrokeCount = res.data.data1
        this.chartNum = res.data.data2
        setTimeout(() => {
          this.chartInit()
        }, 500)
      })
      // const list = { 'dataAxis': ['2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06'], 'data1': [ 199052, 180712, 182496, 185639, 214062, 273379, 358170, 201171, 228013, 233997, 260643, 283312 ], 'data2': [ 35643.57, 36767.92, 39961.55, 36555.09, 38284.09, 43918.13, 56079.01, 33889.10, 40573.43, 37881.13, 36673.25, 36433.18 ] }
      // this.isActivity = false
      // this.isChart = true
      // this.isGrade = false
      // this.chartList = list.dataAxis
      // this.chartStrokeCount = list.data1
      // this.chartNum = list.data2
      // setTimeout(() => {
      //   this.chartInit()
      // }, 500)
    },
    chartInit () {
      let myChart = echarts.init(document.getElementById('line-chart'))
      let option = {
        color: ['#22E7E4', '#EE7343'],
        // title: {
        //   left: '30%',
        //   text: '2018年7月到2019年6月',
        //   textStyle: {
        //     color: '#ffffff',
        //     fontSize: 8
        //   }
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '20%',
          left: '1%',
          right: '1%',
          bottom: '',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartList,
            axisTick: {
              alignWithLabel: true,
              lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
            },
            axisLabel: { color: '#D2FBFE', interval: 0, rotate: 40 }, // x轴字体颜色
            axisLine: {
              lineStyle: { color: '#CAF7FF' } // x轴坐标轴颜色
            }
          }
        ],
        yAxis: [
          {
            name: '交易笔数(笔)',
            type: 'value',
            scale: true,
            // max: 400000,
            // min: 0,
            axisLabel: { color: '#D2FBFE' }, // y轴字体颜色
            axisLine: {
              show: false,
              lineStyle: {
                color: '#D2FBFE'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(202,247,255,0.51)'
              }
            },
            nameTextStyle: {
              color: '#22E7E4',
              fontWeight: 'bold'
            }
          }, {
            name: '交易金额(万元)',
            type: 'value',
            scale: true,
            // max: 60000,
            // min: 0,
            axisLabel: { color: '#D2FBFE' }, // y轴字体颜色
            axisLine: {
              show: false,
              lineStyle: {
                color: '#EE7343'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(202,247,255,0.51)'
              }
            },
            nameTextStyle: {
              color: '#EE7343',
              fontWeight: 'bold'
            }
          }
        ],
        series: [
          {
            // name: '交易笔数(笔)',
            type: 'bar',
            barWidth: '15%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            yAxisIndex: 0,
            data: this.chartStrokeCount
          },
          {
            // name: '交易金额(万元)',
            type: 'bar',
            barWidth: '15%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            yAxisIndex: 1,
            data: this.chartNum
          }
        ]
      }
      myChart.setOption(option, true)
    },
    gradeClick () {
      let classType = {
        reportPlace: 321
      }
      api.getClassInfo(classType).then(res => {
        this.gradeList = res.data.dataAxis
        this.gradeStrokeCount = res.data.data1
        this.gradeNum = res.data.data2
        this.isChart = false
        this.isGrade = true
        this.isActivity = false
        setTimeout(() => {
          this.grade()
        }, 500)
      })
      // this.isChart = false
      // this.isGrade = true
      // this.isActivity = false
      // setTimeout(() => {
      //   this.grade()
      // }, 500)
    },
    // 等级
    grade () {
      let myChart = echarts.init(document.getElementById('line-grade'))
      let option = {
        color: ['#22E7E4', '#EE7343'],
        // title: {
        //   left: '30%',
        //   text: '2018年7月到2019年6月',
        //   textStyle: {
        //     color: '#ffffff',
        //     fontSize: 8
        //   }
        // },
        legend: {
          // data: ['交易笔数(笔)', '交易金额(万元)'],
          position: 'absolute',
          align: 'left', // 水平方向位置
          verticalAlign: 'top', // 垂直方向位置
          x: 100, // 距离x轴的距离
          y: 0, // 距离Y轴的距离
          textStyle: {
            color: '#ffffff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '20%',
          left: '1%',
          right: '1%',
          bottom: '',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.gradeList,
            axisTick: {
              alignWithLabel: true,
              lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
            },
            axisLabel: { color: '#D2FBFE', interval: 0, rotate: 40 }, // x轴字体颜色
            axisLine: {
              lineStyle: { color: '#CAF7FF' } // x轴坐标轴颜色
            }
          }
        ],
        yAxis: [
          {
            name: '交易笔数(笔)',
            type: 'value',
            scale: true,
            // max: 600000,
            // min: 0,
            axisLabel: { color: '#D2FBFE' }, // y轴字体颜色
            axisLine: {
              show: false,
              lineStyle: {
                color: '#D2FBFE'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(202,247,255,0.51)'
              }
            },
            nameTextStyle: {
              color: '#22E7E4',
              fontWeight: 'bold'
            }
          }, {
            name: '交易金额(万元)',
            type: 'value',
            scale: true,
            // max: 100000,
            // min: 0,
            axisLabel: { color: '#D2FBFE' }, // y轴字体颜色
            axisLine: {
              show: false,
              lineStyle: {
                color: '#EE7343'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(202,247,255,0.51)'
              }
            },
            nameTextStyle: {
              color: '#EE7343',
              fontWeight: 'bold'
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '15%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            yAxisIndex: 0,
            data: this.gradeStrokeCount
          },
          {
            name: '',
            type: 'bar',
            barWidth: '15%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            yAxisIndex: 1,
            data: this.gradeNum
          }
        ]
      }
      myChart.setOption(option, true)
    },
    // 营销活动
    activityClick () {
      let classType = {
        reportPlace: 331
      }
      api.getClassInfo(classType).then(res => {
        this.activityList = res.data.dataAxis
        this.activityStrokeCount = res.data.data1
        this.activityNum = res.data.data2
        this.isActivity = true
        this.isChart = false
        this.isGrade = false
        setTimeout(() => {
          this.activity()
        }, 500)
      })
      // this.isActivity = true
      // this.isChart = false
      // this.isGrade = false
      // setTimeout(() => {
      //   this.activity()
      // }, 500)
    },
    activity () {
      let myChart = echarts.init(document.getElementById('line-activity'))
      let option = {
        color: ['#22E7E4', '#EE7343'],
        // title: {
        //   left: '30%',
        //   text: '2018年7月到2019年6月',
        //   textStyle: {
        //     color: '#ffffff',
        //     fontSize: 8
        //   }
        // },
        legend: {
          // data: ['交易笔数(笔)', '交易金额(万元)'],
          position: 'absolute',
          align: 'left', // 水平方向位置
          verticalAlign: 'top', // 垂直方向位置
          x: 100, // 距离x轴的距离
          y: 0, // 距离Y轴的距离
          textStyle: {
            color: '#ffffff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '20%',
          left: '1%',
          right: '1%',
          bottom: '',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.activityList,
            axisTick: {
              alignWithLabel: true,
              lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
            },
            axisLabel: { color: '#D2FBFE',
              interval: 0,
              formatter: function (value, index) {
                if (index % 2 !== 0) {
                  return '\n\n' + value
                } else {
                  return value
                }
              } }, // x轴字体颜色
            axisLine: {
              lineStyle: { color: '#CAF7FF' } // x轴坐标轴颜色
            }
          }
        ],
        yAxis: [
          {
            name: '交易笔数(笔)',
            type: 'value',
            max: 1300000,
            min: 0,
            axisLabel: { color: '#D2FBFE' }, // y轴字体颜色
            axisLine: {
              show: false,
              lineStyle: {
                color: '#D2FBFE'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(202,247,255,0.51)'
              }
            },
            nameTextStyle: {
              color: '#22E7E4',
              fontWeight: 'bold'
            }
          }, {
            name: '交易金额(万元)',
            type: 'value',
            max: 500000,
            min: 0,
            axisLabel: { color: '#D2FBFE' }, // y轴字体颜色
            axisLine: {
              show: false,
              lineStyle: {
                color: '#EE7343'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(202,247,255,0.51)'
              }
            },
            nameTextStyle: {
              color: '#EE7343',
              fontWeight: 'bold'
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '20%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            yAxisIndex: 0,
            data: this.activityStrokeCount
          },
          {
            name: '',
            type: 'bar',
            barWidth: '20%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            yAxisIndex: 1,
            data: this.activityNum
          }
        ]
      }
      myChart.setOption(option, true)
    }

  },
  mounted () {
    let classType = {
      reportPlace: 311
    }
    api.getClassInfo(classType).then(res => {
      this.chartList = res.data.dataAxis
      this.chartStrokeCount = res.data.data1
      this.chartNum = res.data.data2
      this.chartInit()
    })
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.monitor-chart {
  .chart-wrapper {
    #line-chart, #line-grade, #line-activity {
      height: 100%;
    }
  }
}
</style>
