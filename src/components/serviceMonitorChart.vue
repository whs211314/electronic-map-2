<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div class="item flex-center" :class="isChart ? 'active':''" @click="chartClick"><div class="txt">交易笔数/交易金额</div></div>
        <div class="item flex-center" :class="isGrade ? 'active':''" @click="gradeClick"><div class="txt">开业时间/商户等级</div></div>
        <div class="item flex-center" :class="isActivity ? 'active':''" @click="activityClick"><div class="txt">培训/营销活动</div></div>
      </div>
    </div>
    <!-- 交易笔数柱状图 -->
    <div v-show="isChart" class="chart-wrapper">
        <div class="chart" id="line-chart"></div>
        <div class="chart1" id="line-chart1"></div>
    </div>
    <!-- 开业时间柱状图 -->
    <div v-show="isGrade" class="chart-wrapper">
      <div class="chart" id="line-grade"></div>
      <div class="chart1" id="line-grade1"></div>
    </div>
    <!-- 营销活动 -->
    <div v-show="isActivity" class="chart-wrapper">
      <div class="chart" id="line-activity"></div>
      <div class="chart1" id="line-activity1"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import * as api from '@/api'

export default {
  data () {
    return {
      isChart: true,
      isGrade: false,
      isActivity: false,
      countName: [],
      moneyName: [],
      strokeCount: [], // 笔数列表
      strokeMoney: [], // 金额列表
      strokeTime: [], // 商户时间
      strokeGrade: [], // 等级
      strokeTrain: [], // 培训
      strokeSem: [], // 营销
      headers: ['', '一档', '二档', '三档', '四档'],
      bodys: [
        { type: '笔数', money: '≥100笔', dealStatus: '100<笔数≤200', riskStatus: '200<笔数≤600', isChange: '>600笔' },
        { type: '金额', money: '≤1万元', dealStatus: '1<金额≤5万元', riskStatus: '5<金额≤10万元', isChange: '>10万元' }
      ],
      bodys2: [
        { type: '培训', money: '≥3次', dealStatus: '2次', riskStatus: '1次', isChange: '0次' },
        { type: '活动', money: '≥3次', dealStatus: '2次', riskStatus: '1次', isChange: '0次' }
      ],
      bodys1: [
        { type: '时间', money: '>3年', dealStatus: '2<时间<3年', riskStatus: '1<时间≤2年', isChange: '≤1年' },
        { type: '等级', money: '≥1000', dealStatus: '700<等级<1000', riskStatus: '500<等级≤700', isChange: '≤500' }
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
      api.getClassInfo({ 'reportPlace': 111 }).then(res => {
        api.getClassInfo({ 'reportPlace': 112 }).then(item => {
          const list = { 'dataAxis': ['<100', '100-500', '500-1000', '>1000'], 'data1': [ 199052, 180712, 182496, 185639, 214062, 273379, 358170, 201171, 228013, 233997, 260643, 283312 ], 'data2': [ 35643.57, 36767.92, 39961.55, 36555.09, 38284.09, 43918.13, 56079.01, 33889.10, 40573.43, 37881.13, 36673.25, 36433.18 ] }
          this.countName = list.dataAxis
          this.strokeCount = list.data1
          this.strokeMoney = list.data2
          let myChart = echarts.init(document.getElementById('line-chart'))
          let myChart1 = echarts.init(document.getElementById('line-chart1'))
          let option = {
            color: ['#22E7E4', '#EE7343'],
            title: {
              x: 'right',
              text: '交易笔数(笔)',
              textStyle: {
                color: '#ffffff',
                fontSize: 12
              }
            },
            legend: {
              // data: ['交易笔数(笔)', '交易金额(万元)'],
              position: 'absolute',
              // align: 'left', // 水平方向位置
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
              right: '',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: res.data.dataAxis,
                axisTick: {
                  alignWithLabel: true,
                  lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
                },
                axisLabel: { color: '#D2FBFE', rotate: 40 }, // x轴字体颜色
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
                name: '服务点数(个)',
                type: 'bar',
                barWidth: '20%',
                itemStyle: { // 柱样式
                  normal: {
                    barBorderRadius: [10, 10, 10, 10]
                  }
                },
                data: res.data.data1// this.strokeCount
              }
            ]
          }
          let option1 = {
            color: ['#EE7343', '#EE7343'],
            title: {
              x: 'right',
              text: '交易金额(万元)',
              textStyle: {
                color: '#ffffff',
                fontSize: 12
              }
            },
            legend: {
              // data: ['交易笔数(笔)', '交易金额(万元)'],
              position: 'absolute',
              // align: 'left', // 水平方向位置
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
              right: '',
              bottom: '11%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: item.data.dataAxis,
                axisTick: {
                  alignWithLabel: true,
                  lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
                },
                axisLabel: { color: '#D2FBFE',
                  interval: 0,
                  rotate: 40 }, // x轴字体颜色
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
                name: '服务点数(个)',
                type: 'bar',
                barWidth: '20%',
                itemStyle: { // 柱样式
                  normal: {
                    barBorderRadius: [10, 10, 10, 10]
                  }
                },
                data: item.data.data2 // this.strokeMoney
              }
            ]
          }
          myChart.setOption(option, true)
          myChart1.setOption(option1, true)
        })
      })
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
      api.getClassInfo({ 'reportPlace': 121 }).then(res => {
        api.getClassInfo({ 'reportPlace': 122 }).then(item => {
          // res.data.forEach((el, index) => {
          //   this.strokeTime.push(el.classNum)
          // })
          // item.data.forEach((el, index) => {
          //   this.strokeGrade.push(el.classNum)
          // })
          let myChart = echarts.init(document.getElementById('line-grade'))
          let myChart1 = echarts.init(document.getElementById('line-grade1'))
          let option = {
            color: ['#22E7E4', '#EE7343'],
            title: {
              x: 'right',
              text: '开业日期(年)',
              textStyle: {
                color: '#ffffff',
                fontSize: 10
              }
            },
            legend: {
              // data: ['开业时间(年)', '商户等级'],
              position: 'absolute',
              // align: 'left', // 水平方向位置
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
              right: '',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: res.data.dataAxis,
                axisTick: {
                  alignWithLabel: true,
                  lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
                },
                axisLabel: { color: '#D2FBFE', rotate: 40 }, // x轴字体颜色
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
                name: '服务点数(个)',
                type: 'bar',
                barWidth: '20%',
                itemStyle: { // 柱样式
                  normal: {
                    barBorderRadius: [10, 10, 10, 10]
                  }
                },
                data: res.data.data1 // this.strokeTime
              }
            ]
          }
          let option1 = {
            color: ['#EE7343', '#EE7343'],
            title: {
              x: 'right',
              text: '服务点等级',
              textStyle: {
                color: '#ffffff',
                fontSize: 12
              }
            },
            legend: {
              // data: ['开业时间(年)', '商户等级'],
              position: 'absolute',
              // align: 'left', // 水平方向位置
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
              right: '',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: item.data.dataAxis, // ['青苗', '绿穗', '金谷'],
                axisTick: {
                  alignWithLabel: true,
                  lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
                },
                axisLabel: { color: '#D2FBFE', rotate: 40 }, // x轴字体颜色
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
                name: '服务点数(个)',
                type: 'bar',
                barWidth: '20%',
                itemStyle: { // 柱样式
                  normal: {
                    barBorderRadius: [10, 10, 10, 10]
                  }
                },
                data: item.data.data2 // [13680, 17583, 4480]// this.strokeGrade
              }
            ]
          }
          myChart.setOption(option, true)
          myChart1.setOption(option1, true)
        })
      })
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
      api.getClassInfo({ 'reportPlace': 131 }).then(res => {
        api.getClassInfo({ 'reportPlace': 132 }).then(item => {
          // res.data.forEach((el, index) => {
          //   this.strokeTrain.push(el.classNum)
          // })
          // item.data.forEach((el, index) => {
          //   this.strokeSem.push(el.classNum)
          // })
          let myChart = echarts.init(document.getElementById('line-activity'))
          let myChart1 = echarts.init(document.getElementById('line-activity1'))
          let option = {
            color: ['#22E7E4', '#EE7343'],
            title: {
              x: 'right',
              text: '培训次数(次)',
              textStyle: {
                color: '#ffffff',
                fontSize: 12
              }
            },
            legend: {
              // data: ['培训(次)', '营销活动(次)'],
              position: 'absolute',
              // align: 'left', // 水平方向位置
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
              right: '',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: res.data.dataAxis, // ['0', '1', '2', '≥3'],
                axisTick: {
                  alignWithLabel: true,
                  lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
                },
                axisLabel: { color: '#D2FBFE', rotate: 40 }, // x轴字体颜色
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
                name: '服务点数(个)',
                type: 'bar',
                barWidth: '20%',
                itemStyle: { // 柱样式
                  normal: {
                    barBorderRadius: [10, 10, 10, 10]
                  }
                },
                data: res.data.data1 // [867, 22102, 13261, 7974]// this.strokeTrain
              }
            ]
          }
          let option1 = {
            color: ['#EE7343', '#EE7343'],
            title: {
              x: 'right',
              text: '营销活动(次)',
              textStyle: {
                color: '#ffffff',
                fontSize: 12
              }
            },
            legend: {
              // data: ['培训(次)', '营销活动(次)'],
              position: 'absolute',
              // align: 'left', // 水平方向位置
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
              right: '',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: item.data.dataAxis, // ['0', '1', '2', '≥3'],
                axisTick: {
                  alignWithLabel: true,
                  lineStyle: { color: '#D2FBFE' } // x轴刻度的颜色
                },
                axisLabel: { color: '#D2FBFE', rotate: 40 }, // x轴字体颜色
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
                name: '服务点数(个)',
                type: 'bar',
                barWidth: '20%',
                itemStyle: { // 柱样式
                  normal: {
                    barBorderRadius: [10, 10, 10, 10]
                  }
                },
                data: item.data.data2 // [1734, 30943, 9725, 1802]// this.strokeSem
              }
            ]
          }
          myChart.setOption(option, true)
          myChart1.setOption(option1, true)
        })
      })
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
  .chart {
    position: absolute;
    bottom: 0;
    height: 100%;
    left: 2%;
    width: 46%;
    #line-chart, #line-grade, #line-activity,#line-chart1,#line-grade1,#line-activity1 {
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
        font-size: var(--fontSize-12);
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
    .monitor-table1 {
      @include bgImage('../assets/images/tc-bg01.png');
      @include position(302, -500, 156, 2235);
      font-size: var(--fontSize-12);
      padding: 2%;
      table {
        border-collapse:collapse;
        text-align: center;
        font-size: var(--fontSize-12);
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
  .chart1 {
    position: absolute;
    width: 46%;
    right: 2%;
    bottom: 0;
    height: 100%;
    #line-chart, #line-grade, #line-activity,#line-chart1,#line-grade1,#line-activity1 {
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
        font-size: var(--fontSize-12);
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
    .monitor-table1 {
      @include bgImage('../assets/images/tc-bg01.png');
      @include position(302, -500, 156, 2235);
      font-size: var(--fontSize-12);
      padding: 2%;
      table {
        border-collapse:collapse;
        text-align: center;
        font-size: var(--fontSize-12);
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
