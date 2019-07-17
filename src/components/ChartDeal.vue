<template>
  <div id='mapChart'></div>
</template>

<script>
import echarts from 'echarts'
import coordinate from '@/assets/js/coordinate'

function getRandom (len, start = 0) {
  return Math.floor(Math.random() * len) + start
}
const fontSize = getComputedStyle(document.body).getPropertyValue('--fontSize-map')

export default {
  data () {
    return {
      chinaJson: null,
      myChart: null,
      currID: '4300',
      timer: null
    }
  },
  computed: {
    currCoordinate () {
      return coordinate[this.currID]
    },
    serisePointer () {
      return {
        name: 'pointer',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: this.currCoordinate,
        symbolSize: 10,
        animation: false,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            color: '#fff',
            show: true
          },
          emphasis: {
            color: '#ff0',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#fff',
            show: true
          },
          emphasis: {
            color: '#ff0',
            show: true
          }
        }
      }
    }
  },
  mounted () {
    this.mapChart('mapChart')
  },
  methods: {
    mapChart (divid) {
      import(`../../public/map/${this.currID}.json`).then(mapJson => {
        this.chinaJson = mapJson
        this.myChart = echarts.init(document.getElementById(divid))
        this.registerAndsetOption(this.myChart, '湖南省', mapJson)
        this.handleShake()
        this.myChart.on('click', this.handleClick)
        this.myChart.on('mouseover', this.handleMouseOver)
        this.myChart.on('mouseout', this.handleMouseout)
      })
    },
    handleClick (param) {
      if (param.seriesType === 'scatter') return
      console.log('======', JSON.stringify(param.region))
      this.handleActivePointer(0)
      if (param.region.id.split('_').length < 2) {
        this.currID = param.region.id
        // 代表有下级地图
        import(`../../public/map/${this.currID}.json`).then(mapJson => {
          this.registerAndsetOption(this.myChart, param.name, mapJson)
        })
      } else {
        this.currID = '4300'
        // 没有下级地图，回到一级中国地图，并将mapStack清空
        this.registerAndsetOption(
          this.myChart,
          this.chinaName,
          this.chinaJson
        )
      }
    },
    handleMouseOver (param) {
      this.myChart.dispatchAction({
        type: 'highlight',
        seriesName: ['pointer'],
        name: param.name
      })
    },
    handleMouseout (param) {
      this.myChart.dispatchAction({
        type: 'downplay',
        seriesName: ['pointer'],
        name: param.name
      })
    },
    handleShake () {
      this.handleActivePointer()
      this.timer && clearInterval()
      this.timer = setInterval(() => {
        this.handleActivePointer()
      }, (getRandom(3, 1)) * 1000)
    },
    // 1 = 设置闪烁点 / 0 = 清除闪烁点
    handleActivePointer (type = 1) {
      this.myChart.setOption({
        textStyle: {
          fontSize,
          fontWeight: 'bold'
        },
        series: [this.serisePointer, {
          name: 'pointer-active',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: type ? this.activePointers() : [],
          symbolSize: 10,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: false,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#ff0',
              shadowBlur: 10,
              shadowColor: '#ff0'
            }
          },
          zlevel: 1
        }]
      })
    },
    /**
     *
     * @param {*} myChart
     * @param {*} name      省市县名称
     * @param {*} mapJson   地图Json数据
     */
    registerAndsetOption (myChart, name, mapJson) {
      echarts.registerMap(name, mapJson)
      myChart.setOption({
        geo: {
          show: true,
          map: name,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(77,141,147,.4)',
              borderColor: '#1dc199'
            },
            emphasis: {
              areaColor: 'rgba(77,141,147,.8)'
            }
          },
          regions: this.initMapData(mapJson)
        },
        textStyle: {
          fontSize,
          fontWeight: 'bold'
        },
        series: [this.serisePointer]
      })
    },
    // 随机亮的个数为 1-5
    activePointers () {
      const random = getRandom(4, 1)
      const copy = this.currCoordinate.concat()
      return copy.sort(() => (0.5 - Math.random())).slice(0, random)
    },
    initMapData (mapJson) {
      var mapData = []
      for (var i = 0; i < mapJson.features.length; i++) {
        mapData.push({
          name: mapJson.features[i].properties.name,
          id: mapJson.features[i].id
        })
      }
      return mapData
    }
  }
}
</script>
