<template>
  <div class="position-space">
    <div id="line01-chart"></div>
    <div id="line02-chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import * as api from '@/api'
const fontSize = getComputedStyle(document.body).getPropertyValue('--fontSize-mapPie')
export default {
  props: {
    tier: {
      type: Array
    }
  },
  data() {
    return {
      pieList: {
        taCountryYearCount: '',
        taCountryCount: ''
      },
      num: 0,
      city: {
        cityName: '湖南省',
        areaName: ''
      }
    }
  },
  watch: {
    tier(val) {
      this.chartInit(val)
    }
  },
  methods: {
    chartInit(e) {
      if (e && e.length === 1 && e[0].level === 2) {
        this.city.cityName = e[0].allName
        this.city.areaName = ''
      }
      if (e && e.length === 2 && e[1].level === 3) {
        this.city.areaName = e[1].allName.split('_')[1]
      }
      if (e && e.length === 0) {
        this.city.cityName = '湖南省'
        this.city.areaName = ''
      }
      api.getPieData(this.city).then((res) => {
        this.pieList.taCountryYearCount = Math.round(
          (res.data[0].taProvinceYearCount / res.data[0].taCountryYearCount).toFixed(2) * 100
        )
        this.pieList.taCountryCount = Math.round(
          (res.data[0].taProvinceCount / res.data[0].taCountryCount).toFixed(2) * 100
        )
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
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: this.pieList.taCountryYearCount,
                  label: {
                    normal: {
                      show: false,
                      formatter: '{c}',
                      position: 'inside',
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#00fff0'
                    },
                    emphasis: {
                      show: false,
                      position: 'center'
                    }
                  }
                }, //
                { value: 100 - this.pieList.taCountryYearCount } //
              ],
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
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: this.pieList.taCountryCount,
                  label: {
                    normal: {
                      show: false,
                      formatter: '{c}',
                      position: 'inside',
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#00fff0'
                    },
                    emphasis: {
                      show: false,
                      position: 'center'
                    }
                  }
                },
                { value: 100 - this.pieList.taCountryCount }
              ],
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
      })
    }
  },
  created() {
    console.log(this.pieList)
  },
  mounted() {
    this.chartInit()
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
#line01-chart {
  background-image: url(../assets/images/piebg.png);
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 50%;
  position: absolute;
  left: 1%;
  top: -5%;
}
#line02-chart {
  background-image: url(../assets/images/piebg.png);
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 50%;
  position: absolute;
  right: -1%;
  top: -5%;
}
</style>
