<template>
  <div class="position-space">
    <div id="line01-chart"></div>
    <div id="line02-chart"></div>
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
        title: {
          subtext: '年度总交易笔数占比80%',
          left: 'center',
          bottom: '0',
          subtextStyle: {
            fontSize: '8px',
            color: '#00FFF0'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          showContent: false
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '20%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 75 },
              { value: 25 }
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
                    '#FFA500', '#132C33'
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
        title: {
          subtext: '服务点数量占比80%',
          left: 'center',
          bottom: '0',
          subtextStyle: {
            fontSize: '8px',
            color: '#00FFF0'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          showContent: false
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '20%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 75 },
              { value: 25 }
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
                    '#FFA500', '#132C33'
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
#line02-chart {
  height: 100%;
  position: relative;
  right: -27%;
  bottom: 108%;
}
</style>
