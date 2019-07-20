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
    <div v-show="isChart" class="chart">
      <div id="line-chart"></div>
    </div>
    <!-- 开业时间柱状图 -->
    <div v-show="isGrade" class="chart">
      <div id="line-grade"></div>
    </div>
    <!-- 营销活动 -->
    <div v-show="isActivity" class="chart">
      <div id="line-activity"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      isChart: true,
      isGrade: false,
      isActivity: false
    }
  },
  methods: {
    // 交易笔数交易金额
    chartClick () {
      this.isActivity = false
      this.isChart = true
      this.isGrade = false
      setTimeout(() => {
        this.chartInit()
      }, 500)
    },
    chartInit () {
      let myChart = echarts.init(document.getElementById('line-chart'))
      let option = {
        color: ['#22E7E4', '#EE7343'],
        title: {
          left: '30%',
          text: '2018年7月到2019年6月',
          textStyle: {
            color: '#ffffff',
            fontSize: 8
          }
        },
        legend: {
          // data: ['交易笔数(笔)', '交易金额(万元)'],
          position: 'absolute',
          align: 'left', // 水平方向位置
          verticalAlign: 'top', // 垂直方向位置
          x: 0, // 距离x轴的距离
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
          left: '',
          right: '21%',
          bottom: '',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06'],
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
            max: 400000,
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
            }
          }, {
            name: '交易金额(万元)',
            type: 'value',
            scale: true,
            max: 60000,
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
            data: [ 199052, 180712, 182496, 185639, 214062, 273379, 358170, 201171, 228013, 233997, 260643, 283312 ]
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
            data: [ 35643.57, 36767.92, 39961.55, 36555.09, 38284.09, 43918.13, 56079.01, 33889.10, 40573.43, 37881.13, 36673.25, 36433.18 ]
          }
        ]
      }
      myChart.setOption(option, true)
    },
    gradeClick () {
      this.isChart = false
      this.isGrade = true
      this.isActivity = false
      setTimeout(() => {
        this.grade()
      }, 500)
    },
    // 等级
    grade () {
      let myChart = echarts.init(document.getElementById('line-grade'))
      let option = {
        color: ['#22E7E4', '#EE7343'],
        title: {
          left: '30%',
          text: '2018年7月到2019年6月',
          textStyle: {
            color: '#ffffff',
            fontSize: 8
          }
        },
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
          left: '',
          right: '21%',
          bottom: '',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '彬州', '永州', '怀化', '自治州', '娄底'],
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
            max: 600000,
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
            }
          }, {
            name: '交易金额(万元)',
            type: 'value',
            scale: true,
            max: 100000,
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
            data: [ 137601, 121650, 151597, 113148, 181207, 205524, 281101, 425936, 117021, 107261, 432000, 528152, 217211, 130695 ]
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
            data: [ 27333.50, 26710.28, 18416.42, 52640.04, 49369.49, 26060.31, 91813.30, 19342.85, 22524.67, 25273.82, 93326.60, 90784.93, 55564.81, 7770.19 ]
          }
        ]
      }
      myChart.setOption(option, true)
    },
    // 营销活动
    activityClick () {
      this.isActivity = true
      this.isChart = false
      this.isGrade = false
      setTimeout(() => {
        this.activity()
      }, 500)
    },
    activity () {
      let myChart = echarts.init(document.getElementById('line-activity'))
      let option = {
        color: ['#22E7E4', '#EE7343'],
        title: {
          left: '30%',
          text: '2018年7月到2019年6月',
          textStyle: {
            color: '#ffffff',
            fontSize: 8
          }
        },
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
          left: '',
          right: '21%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['助农取款', '行政代收付', '转账汇款', '现金汇款', '水电缴费', '通讯缴费', '消费'],
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
            data: [ 430341, 96264, 148848, 14095, 1369839, 497268, 928740 ]
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
            data: [ 41133.20, 1312.26, 32705.16, 935.3364, 42266.35, 2250.15, 489915.33 ]
          }
        ]
      }
      myChart.setOption(option, true)
    }

  },
  mounted () {
    this.chartInit()
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.monitor-chart {
  .title {
    position: absolute;
    top: 1%;
    left: 20%;
    width: 100%;
    height: 12%;
    font-size: var(--fontSize-12);
    font-weight: bold;
    .tab {
      @extend .flex-center;
      justify-content: start;
      .item {
        width: 22%;
        cursor: pointer;
        &.active {
          background: #00b7b4;
        }
      }
    }
  }
  .chart {
    position: absolute;
    left: 20%;
    bottom: 0;
    height: 86%;
    width: 100%;
    #line-chart, #line-grade, #line-activity {
      height: 100%;
    }
  }
}
</style>
