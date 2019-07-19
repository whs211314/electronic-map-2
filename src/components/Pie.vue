<template>
  <div class="position-space">
    <div id="line01-chart"></div>
    <div id="line02-chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import * as api from '@/api'
const fontSize = getComputedStyle(document.body).getPropertyValue('--fontSize-map')
export default {
  props: {
    // pieList: {
    //   type: Object
    // }
  },
  data () {
    return {
      pieList: {
        taCountryYearCount: '',
        taCountryCount: ''
      }
    }
  },
  methods: {
    chartInit () {
      console.log(this.pieList)
      api.getPieData().then(res => {
        this.pieList.taCountryYearCount = (res.data[0].taProvinceYearCount / res.data[0].taCountryYearCount).toFixed(2) * 100
        this.pieList.taCountryCount = (res.data[0].taProvinceCount / res.data[0].taCountryCount).toFixed(2) * 100
        console.log(this.pieList)
        let myChart1 = echarts.init(document.getElementById('line01-chart'))
        let myChart2 = echarts.init(document.getElementById('line02-chart'))
        let option1 = {
          title: {
            subtext: '年度总交易笔数占比' + this.pieList.taCountryYearCount + '%',
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
              data: [
                { value: 75 }, // this.pieList.taCountryYearCount
                { value: 25 } // 100 - this.pieList.taCountryYearCount
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
                      '#fe7e12', '#132C33'
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
            subtext: '服务点数量占比' + this.pieList.taCountryCount + '%',
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
              data: [
                { value: this.pieList.taCountryCount },
                { value: 100 - this.pieList.taCountryCount }
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
      })
    }
  },
  created () {
    console.log(this.pieList)
  },
  mounted () {
    this.chartInit()
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
#line01-chart {
  background-image: url(../assets/images/piebg.png);
  background-repeat: no-repeat;
  background-position:50%;
  background-size: 50%;
  height: 100%;
  position: relative;
  left: -23%;
  top: -8%;
}
#line02-chart {
  background-image: url(../assets/images/piebg.png);
  background-repeat: no-repeat;
  background-position:50%;
  background-size: 50%;
  height: 100%;
  position: relative;
  right: -27%;
  bottom: 108%;
}
</style>
