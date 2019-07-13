<template>
  <div class="position-space">
    <div id="line01-chart"></div>
    <span class="Total-trade">年度总交易笔数占比80%</span>
    <div id="line02-chart"></div>
    <span class="service-points">服务点数量占比80%</span>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {

    }
  },
  methods: {
    chartInit () {
      let myChart1 = echarts.init(document.getElementById('line01-chart'))
      let myChart2 = echarts.init(document.getElementById('line02-chart'))
      let option1 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
        },
        series: [
          {
            name: '年度总交易',
            type: 'pie',
            radius: ['50%', '20%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20px',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335 },
              { value: 20 }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function (params) {
                  // 自定义颜色
                  var colorList = [
                    '#FFA500', '#D2691E'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
      myChart1.setOption(option1, true)
      let option2 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
        },
        series: [
          {
            name: '年度总交易',
            type: 'pie',
            radius: ['50%', '20%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20px',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335 },
              { value: 20 }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function (params) {
                  // 自定义颜色
                  var colorList = [
                    '#FFA500', '#D2691E'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
      myChart2.setOption(option2, true)
    }
  },
  mounted () {
    this.chartInit()
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
#line01-chart {
  height: 100%;
  position: relative;
  left: -23%;
  top: -8%;
}
.Total-trade {
  @include position(1038, 58, 18, 162);
  font-size: 8px;
  color: #00FFF0;
}
#line02-chart {
  height: 100%;
  position: relative;
  right: -27%;
  bottom: 108%;
}
.service-points {
  @include position(1038, 58, 18, 2362);
  font-size: 8px;
  color: #00FFF0;
}
</style>
