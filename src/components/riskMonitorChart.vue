<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div class="item active flex-center"><span>预警点数量：1494  占比：3.4%</span></div>
      </div>
    </div>
    <!-- 交易笔数柱状图 -->
    <div class="chart-wrapper">
      <div id="line-chart"></div>
      <div class="monitor-table">
        <div class="row">
          <div class="col flex-center" :key="index" v-for="(item, index) in headers"><b>{{item}}</b></div>
        </div>
        <div class="row border">
          <div class="col flex-center" :key="index" v-for="(item, index) in [64, 181, 43, 17]"><b>{{item}}</b></div>
        </div>
        <div class="row">
          <div class="col flex-center" :key="index" v-for="(item, index) in headers1"><b>{{item}}</b></div>
        </div>
        <div class="row border">
          <div class="col flex-center" :key="index" v-for="(item, index) in [651, 430, 108]"><b>{{item}}</b></div>
        </div>
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
      headers: ['移机', '高额小频', '异常大频', '异常归集'],
      headers1: ['三个月不动户', '半年不动户', '一年不动户'],
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
              text: 1494,
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
                data: [64, 181, 43, 17, 651, 430, 108],
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
  .chart-wrapper {
    #line-chart, #line-grade, #line-activity {
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
      // background: #2C848B;
      // border-radius: 5px;
      font-size: var(--fontSize-8);
      padding: 2%;
      .row {
        height: 25%;
        display: flex;
        .col {
          flex: 1;
        }
        &.border {
          border: 1px solid #00C6D9;
          border-right: 0;
          .col {
            border-right: 1px solid #00C6D9;
          }
        }
      }
    }
  }
}
</style>
