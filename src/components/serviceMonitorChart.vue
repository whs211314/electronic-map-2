<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div class="item flex-center" :class="isChart ? 'active':''" @click="chartClick">交易笔数/交易金额</div>
        <div class="item flex-center" :class="isGrade ? 'active':''" @click="gradeClick">开业时间/商户等级</div>
        <div class="item flex-center" :class="isActivity ? 'active':''" @click="activityClick">培训/营销活动</div>
      </div>
    </div>
    <!-- 交易笔数柱状图 -->
    <div v-show="isChart" class="chart">
      <div id="line-chart"></div>
      <div class="monitor-table">
        <table>
          <thead>
            <tr>
              <td :key="index" v-for="(item, index) in headers">{{item}}</td>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(item, index) in bodys">
              <td>{{item.type}}</td>
              <td>{{item.money}}</td>
              <td>{{item.dealStatus}}</td>
              <td>{{item.riskStatus}}</td>
              <td>{{item.isChange}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 开业时间柱状图 -->
    <div v-show="isGrade" class="chart">
      <div id="line-grade"></div>
      <div class="monitor-table">
        <table>
          <thead>
            <tr>
              <td :key="index" v-for="(item, index) in headers">{{item}}</td>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(item, index) in bodys">
              <td>{{item.type}}</td>
              <td>{{item.money}}</td>
              <td>{{item.dealStatus}}</td>
              <td>{{item.riskStatus}}</td>
              <td>{{item.isChange}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 营销活动 -->
    <div v-show="isActivity" class="chart">
      <div id="line-activity"></div>
      <div class="monitor-table">
        <table>
          <thead>
            <tr>
              <td :key="index" v-for="(item, index) in headers">{{item}}</td>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(item, index) in bodys">
              <td>{{item.type}}</td>
              <td>{{item.money}}</td>
              <td>{{item.dealStatus}}</td>
              <td>{{item.riskStatus}}</td>
              <td>{{item.isChange}}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
      isActivity: false,
      headers: ['', '一档', '二档', '三档', '四档'],
      bodys: [
        { type: '培训', money: '20万内', dealStatus: '20万内', riskStatus: '20万内', isChange: '20万内' },
        { type: '活动', money: '20万内', dealStatus: '20万内', riskStatus: '20万内', isChange: '20万内' }
      ]
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
          x: 200, // 距离x轴的距离
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
          right: '44%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月'],
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
            barWidth: '20%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 1000, 1300, 1800, 1599 ]
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
            data: [ 600, 1700, 1000, 699 ]
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
          data: ['开业时间(年)', '商户等级'],
          position: 'absolute',
          align: 'left', // 水平方向位置
          verticalAlign: 'top', // 垂直方向位置
          x: 200, // 距离x轴的距离
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
          right: '44%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月'],
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
            name: '开业时间(年)',
            type: 'bar',
            barWidth: '20%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 1000, 1300, 1800, 1599 ]
          },
          {
            name: '商户等级',
            type: 'bar',
            barWidth: '20%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 600, 1700, 1000, 699 ]
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
          data: ['培训(次)', '营销活动(次)'],
          position: 'absolute',
          align: 'left', // 水平方向位置
          verticalAlign: 'top', // 垂直方向位置
          x: 200, // 距离x轴的距离
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
          right: '44%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月'],
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
            name: '培训(次)',
            type: 'bar',
            barWidth: '20%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 1000, 1300, 1800, 1599 ]
          },
          {
            name: '营销活动(次)',
            type: 'bar',
            barWidth: '20%',
            itemStyle: { // 柱样式
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            data: [ 600, 1700, 1000, 699 ]
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
          background:#00b7b4;
        }
      }
    }
  }
  .chart {
    position: absolute;
    left: 20%;
    bottom: 0;
    height: 86%;
    width: 70%;
    #line-chart, #line-grade, #line-activity {
      height: 100%;
    }
    .monitor-table {
      @include bgImage('../assets/images/tc-bg01.png');
      @include position(302, -500, 156, 2235);
      font-size: var(--fontSize-12);
      padding: 2%;
      table {
        border-collapse:collapse;
        text-align: center;
        font-size: var(--fontSize-8);
        thead {
          tr {
            height: 20px;
          }
        }
        tbody{
          td {
            width: 21%;
            border: 1px solid #00C6D9;
          }
          td:nth-child(1){
            border-left: 0;
            border-top: 0;
            border-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
