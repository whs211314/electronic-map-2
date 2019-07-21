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
  data () {
    return {
      pieList: {
        taCountryYearCount: '',
        taCountryCount: ''
      },
      num: 0
    }
  },
  watch: {
    tier (val) {
      this.chartInit(val)
    }
  },
  methods: {
    chartInit (e) {
      console.log(this.pieList)
      api.getPieData().then(res => {
        if (e && e[0].level > 1) {
          // 服务点数占比
          e.forEach((item, index) => {
            if (item.level === 2) {
              this.pieList.taCountryCount = parseInt((Number(e[0].serverNum) / this.num).toFixed(2) * 100)
              this.num = Number(e[0].serverNum)
              if (item.name === '长沙市') {
                this.pieList.taCountryYearCount = 4
              }
              if (item.name === '株洲市') {
                this.pieList.taCountryYearCount = 4
              }
              if (item.name === '湘潭市') {
                this.pieList.taCountryYearCount = 5
              }
              if (item.name === '衡阳市') {
                this.pieList.taCountryYearCount = 4
              }
              if (item.name === '邵阳市') {
                this.pieList.taCountryYearCount = 6
              }
              if (item.name === '岳阳市') {
                this.pieList.taCountryYearCount = 7
              }
              if (item.name === '常德市') {
                this.pieList.taCountryYearCount = 9
              }
              if (item.name === '张家界市') {
                this.pieList.taCountryYearCount = 14
              }
              if (item.name === '益阳市') {
                this.pieList.taCountryYearCount = 3
              }
              if (item.name === '郴州市') {
                this.pieList.taCountryYearCount = 3
              }
              if (item.name === '永州市') {
                this.pieList.taCountryYearCount = 14
              }
              if (item.name === '怀化市') {
                this.pieList.taCountryYearCount = 16
              }
              if (item.name === '湘西土家族苗族自治州') {
                this.pieList.taCountryYearCount = 7
              }
              if (item.name === '娄底市') {
                this.pieList.taCountryYearCount = 4
              }
            }
            if (item.level === 3) {
              this.pieList.taCountryCount = parseInt((Number(e[1].serverNum) / this.num).toFixed(2) * 100)
              this.pieList.taCountryYearCount = Math.floor(Math.random() * (4 - 12) + 12)
            }
            if (item.level === 1) {
              this.pieList.taCountryCount = parseInt((Number(e[1].serverNum) / this.num).toFixed(2) * 100)
              this.pieList.taCountryYearCount = (res.data[0].taProvinceYearCount / res.data[0].taCountryYearCount).toFixed(2) * 100
              this.pieList.taCountryCount = (res.data[0].taProvinceCount / res.data[0].taCountryCount).toFixed(2) * 100
              this.num = 44204
            }
          })
        } else {
          this.pieList.taCountryYearCount = (res.data[0].taProvinceYearCount / res.data[0].taCountryYearCount).toFixed(2) * 100
          this.pieList.taCountryCount = (res.data[0].taProvinceCount / res.data[0].taCountryCount).toFixed(2) * 100
          this.num = 44204
        }
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
                { value: this.pieList.taCountryYearCount }, //
                { value: 100 - this.pieList.taCountryYearCount } //
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
