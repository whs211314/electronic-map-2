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
          text: '2018年6月到2019年6月',
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
          right: '20%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06'],
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
            max: 12000000,
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
            name: '交易金额(元)',
            type: 'value',
            scale: true,
            max: 12000000,
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
            data: [ 1003350, 1208449, 1395990, 1578529, 1764168, 1976702, 2250079, 358.170, 559341, 791677, 1025686, 1286511.00, 1569823 ]
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
            data: [ 200188.24, 240988.59, 277756.51, 316362.77, 316362.77, 389604.17, 433252.30, 56.079, 89968, 131402.61, 169303.93, 205977.11, 242410.36 ]
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
        legend: {
          data: ['交易笔数(笔)', '交易金额(万元)'],
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
          left: '3%',
          right: '25%',
          bottom: '10%',
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
            name: '',
            type: 'value',
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
            name: '交易笔数(笔)',
            type: 'bar',
            barWidth: '15%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 698265, 733354, 579139, 958516, 1118388, 626360, 1433636, 931963, 605743, 2252222, 2771606, 1030707, 2276084, 752674 ]
          },
          {
            name: '交易金额(万元)',
            type: 'bar',
            barWidth: '15%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 142428.58, 97943.77, 264195.40, 244703.65, 136583.85, 113870.23, 428922.86, 66953.70, 129756.24, 474175.21, 458702.67, 260171.75, 106633.13, 144616.13 ]
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
        legend: {
          data: ['交易笔数(笔)', '交易金额(万元)'],
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
          left: '3%',
          right: '25%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['助农取款', '行政代收付', '转账汇款', '现金转账', '水电缴费', '通讯缴费', '消费'],
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
            name: '',
            type: 'value',
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
            name: '交易笔数(笔)',
            type: 'bar',
            barWidth: '20%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 10020, 13020, 18020, 15929, 1020, 13020, 12200 ]
          },
          {
            name: '交易金额(万元)',
            type: 'bar',
            barWidth: '20%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 60076, 17077, 10077, 6997, 60077, 17007, 10007 ]
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
