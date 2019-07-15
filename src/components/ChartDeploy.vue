<template>
  <div id='mapChart'></div>
</template>

<style>
#mapChart {
  position: absolute;
  top: -10%;
  right: -10%;
  bottom: -10%;
  left: -10%;
}
</style>

<script>
import echarts from 'echarts'
const fontSize = getComputedStyle(document.body).getPropertyValue('--fontSize-map')

export default {
  data () {
    return {
      chinaJson: null,
      myChart: null,
      currID: '430000',
      deep: 0
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
        this.myChart.on('click', param => {
          if (param.seriesType === 'scatter') {
            this.$emit('popup', {
              x: param.event.offsetX,
              y: param.event.offsetY
            })
            return
          }
          this.deep += 1
          if (this.deep < 4) {
            this.currID = param.region.id
            console.log(this.currID)
            // 代表有下级地图
            import(`../../public/map/${this.currID}.json`).then(mapJson => {
              this.registerAndsetOption(this.myChart, param.name, mapJson)
              if (this.deep === 3) {
                this.setTownPointer(mapJson)
              }
            })
          } else {
            this.deep = 0
            // 没有下级地图，回到一级中国地图，并将mapStack清空
            this.registerAndsetOption(
              this.myChart,
              this.chinaName,
              this.chinaJson
            )
          }
        })
      })
    },
    getMockCoordinate (mapJson) {
      const len = mapJson.features.length
      let x = 0
      let y = 0
      mapJson.features.forEach(e => {
        x += e.properties.cp[0]
        y += e.properties.cp[1]
      })
      return [(x / len).toFixed(2), (y / len).toFixed(2)]
    },
    // 请求村级服务点数据
    setTownPointer (mapJson) {
      this.myChart.setOption({
        series: [{
          name: 'pointer',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: [this.getMockCoordinate(mapJson)],
          symbolSize: fontSize,
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
              show: true,
              color: '#fff',
              fontSize,
              fontWeight: 'bold'
            },
            emphasis: {
              show: true,
              color: '#ff0',
              shadowBlur: 10,
              shadowColor: '#ff0',
              fontSize,
              fontWeight: 'bold'
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
        }
      }, true)
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
