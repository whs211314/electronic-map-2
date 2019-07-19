<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div class="item active flex-center">预警点数量：6278  占比：10%</div>
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
              <td>64</td>
              <td>181</td>
              <td>543</td>
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
              <td>651</td>
              <td>430</td>
              <td>108</td>
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
      headers: ['移机', '高额小频', '异常大频'],
      headers1: ['三个月不动户', '半年不动户', '一年不动户'],
      bodys: [
        { type: '1500个', money: '2500个', dealStatus: '3500个' }
      ],
      echartsList: [],
      echarTable: []
    }
  },
  methods: {
    chartInit () {
      let classType = {
        classType: 8
      }
      let className = {
        classType: 8
      }
      api.getClassInfo(classType).then(res => {
        api.getClassInfo(className).then(item => {
          res.data.forEach((el, index) => {
            if (index > 0) {
              this.echartsList.push(el)
            }
          })
          item.data.forEach((el, index) => {
            if (index > 0) {
              this.echarTable.push(el.classNum)
            }
          })
          console.log(this.echarTable)
          let myChart = echarts.init(document.getElementById('line-chart'))
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            title: {
              text: res.data[0].classNum,
              left: '20%',
              top: '50%',
              textStyle: {
                color: '#fff',
                fontSize: 12,
                align: 'center'
              }
            },
            graphic: {
              type: 'text',
              left: '22.5%',
              top: '43%',
              style: {
                text: res.data[0].className,
                textAlign: 'center',
                fill: '#fff',
                fontSize: 12
              }
            },
            series: [
              {
                name: '',
                type: 'pie',
                radius: ['30%', '70%'],
                center: ['27%', '55%'],
                label: {
                  normal: {
                    formatter: '{a|{b}}\n{hr|}\n{per|{d}%}',
                    show: true,
                    padding: [0, -35],
                    rich: {
                      a: {
                        color: '#ffffff',
                        fontSize: 8,
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
                        fontSize: 8
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
                data: this.echartsList.map(item => Object.assign(item, {
                  value: item.classNum,
                  name: item.className
                })),
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
        width: 36%;
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
