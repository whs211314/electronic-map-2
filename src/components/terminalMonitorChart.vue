<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div
          class="item flex-center"
          v-for="tab in tabs"
          :key="tab.key"
          :class="riskStatus === tab.key ? 'active' : ''"
          @click="handleTab(tab)"
        >
          <div class="txt">{{ tab.label }} {{ tab.count }}</div>
        </div>
      </div>
    </div>
    <!-- 交易笔数柱状图 -->
    <div class="chart-wrapper">
      <div id="line-chart"></div>
      <div class="monitor-table">
        <div class="row">
          <div class="col flex-center" :key="index" v-for="(item, index) in headers">
            <b>{{ item }}</b>
          </div>
        </div>
        <div class="row border">
          <div class="col flex-center" :key="index" v-for="(item, index) in num">
            <b>{{ item }}</b>
          </div>
        </div>
        <div class="row">
          <div class="col flex-center" :key="index" v-for="(item, index) in headers1">
            <b>{{ item }}</b>
          </div>
        </div>
        <div class="row border">
          <div class="col flex-center" :key="index" v-for="(item, index) in num1">
            <b>{{ item }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import * as api from '@/api'
// 暂定前端维护
const exceptionTypes = {
  'E01': '缺纸异常',
  'E02': '通讯异常',
  'E03': '打印模块',
  'E04': '非接模块',
  'E05': '电池模块',
  'E99': '其他'
}
// const mockData = {
//   code: 0,
//   msg: null,
//   count: 0,
//   data: {
//     allCtInfo: 74047,
//     termErrors: [
//       { errorType: 'E01', count: 863, rate: 1.17 },
//       { errorType: 'E02', count: 97, rate: 0.13 },
//       { errorType: 'E03', count: 118, rate: 0.16 },
//       { errorType: 'E04', count: 129, rate: 0.16999999999999998 },
//       { errorType: 'E05', count: 4492, rate: 6.069999999999999 }
//     ]
//   }
// }

export default {
  props: ['riskStatus'],
  data () {
    return {
      tabs: [
        { key: 0, label: '未处理', count: 0 },
        { key: 1, label: '已处理', count: 0 },
        { key: 2, label: '总量', count: 0 }
      ],
      headers: [],
      num: [],
      headers1: [],
      num1: [],
      echartsList: [],
      abnormalAll: 0, // 异常总数
      proportion: 0 // 占比
    }
  },
  mounted () {
    this.getTabSum()
    this.chartInit()
  },
  methods: {
    reset () {
      this.headers = []
      this.num = []
      this.headers1 = []
      this.num1 = []
      this.echartsList = []
      this.abnormalAll = 0 // 异常总数
      this.proportion = 0
    },
    handleTab (tab) {
      this.$emit('update:riskStatus', tab.key)
      this.reset()
      this.chartInit()
    },
    getTabSum () {
      api.getTotalErrorsReport().then(res => {
        const data = res.data || {}
        this.tabs = [
          { key: 1, label: '未处理', count: data.weiCountTotal || 0 },
          { key: 2, label: '已处理', count: data.yiCountNewTotal || 0 },
          { key: 3, label: '总量', count: data.countTotal || 0 }
        ]
      })
    },
    chartInit () {
      api.getErrorsReportJscT(this.riskStatus).then(res => {
        res.data.termErrors.forEach((el, index) => {
          console.log(index)
          if (index < 3) {
            this.headers.push(exceptionTypes[el.errorType])
            this.num.push(el.count)
          }
          if (index > 2) {
            this.headers1.push(exceptionTypes[el.errorType] ? exceptionTypes[el.errorType] : '其他')
            this.num1.push(el.count ? el.count : 0)
          }
          this.echartsList.push(el.count)
          this.abnormalAll = this.abnormalAll + el.count
        })
        this.proportion = ((this.abnormalAll / res.data.allCtInfo).toFixed(2)) * 100
        let myChart = echarts.init(document.getElementById('line-chart'))
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          title: {
            text: this.abnormalAll,
            left: '41%',
            top: '50%',
            textStyle: {
              color: '#fff',
              fontSize: 12,
              align: 'center'
            }
          },
          graphic: {
            type: 'text',
            left: '40.5%',
            top: '45%',
            style: {
              text: '总数量',
              textAlign: 'center',
              fill: '#fff',
              fontSize: 12
            }
          },
          color: ['#f6da22', '#bbe2e8', '#6cacde', '#00FFF0'],
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['30%', '60%'],
              // center: ['30%', '50%'],
              label: {
                normal: {
                  formatter: '{a|{b}}\n{hr|}\n{per|{d}%}',
                  show: true,
                  padding: [0, -25],
                  rich: {
                    a: {
                      color: '#ffffff',
                      fontSize: 10,
                      lineHeight: 20,
                      align: 'center'
                    },
                    hr: {
                      width: '100%',
                      height: 0,
                      alien: 'center'
                    },
                    per: {
                      color: '#ffffff',
                      align: 'center',
                      fontSize: 12
                    }
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '12'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.echartsList,
              // this.echartsList.map(item => Object.assign(item, {
              //   value: item.classNum,
              //   name: item.className
              // })),
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        myChart.setOption(option, true)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.monitor-chart {
  .chart-wrapper {
    #line-chart,
    #line-grade,
    #line-activity {
      height: 100%;
      position: absolute;
      left: 0;
      width: 48%;
    }
    .monitor-table {
      position: absolute;
      right: 2%;
      width: 46%;
      top: 10%;
      bottom: 10%;
      @include bgImage('../assets/images/tc-bg02.png');
      background-size: 100% 100%;
      font-size: var(--fontSize-12);
      padding: 2%;
      .row {
        height: 25%;
        display: flex;
        .col {
          flex: 1;
        }
        &.border {
          border: 1px solid #00c6d9;
          border-right: 0;
          .col {
            border-right: 1px solid #00c6d9;
          }
        }
      }
    }
  }
}
</style>
