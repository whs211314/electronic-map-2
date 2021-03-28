<template>
  <div class="position-space">
    <div id="line01-chart-bot"></div>
    <div id="line02-chart-bot"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import * as api from '@/api'
const fontSize = getComputedStyle(document.body).getPropertyValue('--fontSize-mapPie')
export default {
  data() {
    return {
      pieList: {
        taCountryYearCount: '',
        taCountryCount: ''
      },
      livelihood: {
        rate: 0,
        count: 0,
        total: 0
      },
      num: 0
    }
  },
  mounted() {
    this.getData().then(() => {
      this.chartInit()
    })
  },
  methods: {
    getData() {
      // 民生占比
      return api.getOneEcpJxtMsjf().then((res) => {
        const { jfbsCount, jfbsMix } = res.data
        this.livelihood = {
          rate: jfbsMix,
          count: jfbsCount,
          total: Math.round(jfbsCount / jfbsMix)
        }
      })
    },
    chartInit(e) {
      let myChart1 = echarts.init(document.getElementById('line01-chart-bot'))
      let myChart2 = echarts.init(document.getElementById('line02-chart-bot'))
      let option1 = {
        title: {
          subtext: '民生缴费笔数及占比' + this.livelihood.rate * 100 + '%',
          left: 'center',
          bottom: '0',
          subtextStyle: {
            fontSize: fontSize,
            color: '#00FFF0'
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['55%', '15%'],
            center: ['50%', '49%'],
            hoverAnimation: false,
            data: [
              {
                value: this.livelihood.count,
                label: {
                  normal: {
                    show: false,
                    formatter: '{c}',
                    position: 'inside',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#fff'
                  },
                  emphasis: {
                    show: true
                  }
                }
              },
              {
                value: this.livelihood.total - this.livelihood.count
              }
            ],
            itemStyle: {
              normal: {
                color: function(params) {
                  // 自定义颜色
                  var colorList = ['#FFA500', '#132C33']
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
          subtext: '年度服务点活跃率100%',
          left: 'center',
          bottom: '0',
          subtextStyle: {
            fontSize: fontSize,
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
            radius: ['55%', '15%'],
            center: ['50%', '49%'],
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
            data: [{ value: 100 }, { value: 0 }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function(params) {
                  // 自定义颜色
                  var colorList = ['#FFA500', '#132C33']
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
      myChart2.setOption(option2, true)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
#line01-chart-bot {
  background-image: url(../assets/images/piebg.png);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 50%;
  height: 100%;
  position: relative;
  left: -23%;
  top: -8%;
  z-index: 1;
}
#line02-chart-bot {
  background-image: url(../assets/images/piebg.png);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 50%;
  height: 100%;
  position: relative;
  right: -27%;
  bottom: 108%;
}
</style>
