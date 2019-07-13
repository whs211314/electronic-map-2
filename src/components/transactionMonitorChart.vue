<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div class="item active flex-center" @click="chartClick">月交易量</div>
        <div class="item flex-center" @click="gradeClick">全省交易量</div>
        <div class="item flex-center"  @click="activityClick">交易种类分布</div>
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true,
              lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
            },
            axisLabel: { color: '#D2FBFE' }, // x轴字体颜色
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
            barWidth: '10%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 1000, 1300, 1800, 1599, 1000, 1300, 1800, 1599, 1000, 1300, 1800, 1599 ]
          },
          {
            name: '交易金额(万元)',
            type: 'bar',
            barWidth: '10%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 600, 1700, 1000, 699, 600, 1700, 1000, 699, 600, 1700, 1000, 699 ]
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true,
              lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
            },
            axisLabel: { color: '#D2FBFE' }, // x轴字体颜色
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
            barWidth: '10%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 1000, 1300, 1800, 1599, 1000, 1300, 1800, 1599, 1000, 1300, 1800, 1599 ]
          },
          {
            name: '交易金额(万元)',
            type: 'bar',
            barWidth: '10%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 600, 1700, 1000, 699, 600, 1700, 1000, 699, 600, 1700, 1000, 699 ]
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
            data: ['助农取款(T45)', '水电缴费(T22)', '转账汇款(T44)', '通讯缴费(T08+T02)', '现金转账', '消费', '税务代缴'],
            axisTick: {
              alignWithLabel: true,
              lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
            },
            axisLabel: { color: '#D2FBFE' }, // x轴字体颜色
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
            barWidth: '10%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 1000, 1300, 1800, 1599, 1000, 1300, 1800 ]
          },
          {
            name: '交易金额(万元)',
            type: 'bar',
            barWidth: '10%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 600, 1700, 1000, 699, 600, 1700, 1000 ]
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
        &.active {
          background: #098583;
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
