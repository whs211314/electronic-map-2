<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div class="item active flex-center">异常终端数量：678 占比：1.5%</div>
      </div>
    </div>
    <!-- 交易笔数柱状图 -->
    <div class="chart">
      <div id="line-chart"></div>
      <div class="monitor-table">
        <table>
          <thead>
            <tr>
              <td :key="index" v-for="(item, index) in headers">{{item}}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>34</td>
              <td>89</td>
              <td>254</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <td :key="index" v-for="(item, index) in headers1">{{item}}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>60</td>
              <td>100</td>
              <td>141</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import * as api from '@/api'

export default {
  data () {
    return {
      headers: ['缺纸', '缺纸预警', '通讯异常'],
      headers1: ['打印模块异常', '身份证模块异常', '其他'],
      bodys: [
        { type: '34个', money: '254个', dealStatus: '160个', riskStatus: '230个' }
      ],
      echartsList: []
    }
  },
  methods: {
    chartInit () {
      let classType = {
        classType: 7
      }
      let className = {
        classType: 7
      }
      api.getClassInfo(classType).then(res => {
        api.getClassInfo(className).then(item => {
          res.data.forEach((el, index) => {
            if (index > 0) {
              this.echartsList.push(el)
            }
          })
          let myChart = echarts.init(document.getElementById('line-chart'))
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            title: {
              text: res.data[0].classNum,
              left: '25%',
              top: '52%',
              textStyle: {
                color: '#fff',
                fontSize: 12,
                align: 'center'
              }
            },
            graphic: {
              type: 'text',
              left: '24.5%',
              top: '45%',
              style: {
                text: res.data[0].className,
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
                radius: ['30%', '70%'],
                center: ['30%', '55%'],
                label: {
                  normal: {
                    formatter: '{a|{b}}\n{hr|}\n{per|{d}%}',
                    show: true,
                    padding: [0, -25],
                    rich: {
                      a: {
                        color: '#ffffff',
                        fontSize: 11,
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
                data: [34, 89, 254, 60, 100, 141],
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
        width: 50%;
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
    width: 70%;
    #line-chart, #line-grade, #line-activity {
      height: 100%;
    }
    .monitor-table {
      @include bgImage('../assets/images/tc-bg02.png');
      @include position(52, -500, 52, 2355);
      // background: #2C848B;
      // border-radius: 5px;
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
          tr {
            td {
              width: 21%;
              padding: 8% 0;
              border: 1px solid #00C6D9;
            }
          }
        }
      }
    }
  }
}
</style>
