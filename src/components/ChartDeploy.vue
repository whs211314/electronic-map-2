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
      currID: '4300'
    }
  },
  mounted () {
    this.mapChart('mapChart')
  },
  methods: {
    mapChart (divid) {
      import(`../../public/map/${this.currID}.json`).then(mapJson => {
        this.chinaJson = mapJson
        this.currJson = mapJson
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
          const { id, name } = param.region
          console.log(this.currID, id, name)
          if (id !== this.currID) {
            this.currID = id
            // 点击到乡级地图
            if (this.currID.split('_').length === 3) {
              const townJson = {
                type: 'FeatureCollection',
                features: this.currJson.features.filter(e => e.id === this.currID)
              }
              this.$emit('goDown', { id, name })
              this.registerAndsetOption(this.myChart, param.name, townJson)
              this.setTownPointer(townJson)
              return
            }
            // 代表有下级地图
            import(`../../public/map/${this.currID}.json`).then(mapJson => {
              this.currJson = mapJson
              this.$emit('goDown', { id, name })
              this.registerAndsetOption(this.myChart, param.name, mapJson)
            })
          } else {
            // 没有下级地图，回到一级中国地图，并将mapStack清空
            this.registerAndsetOption(this.myChart, this.chinaName, this.chinaJson)
            this.$emit('goDown', { id: '4300', name: '湖南省' })
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
      const avgX = x / len
      const avgY = y / len
      console.log([avgX, avgY])
      let ret = Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, i) => {
        let random1 = Math.random() * (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.1)
        let random2 = Math.random() * (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.1)
        return { name: `服务网点${i + 2}`, value: [avgX + random1, avgY + random2, 1] }
      })
      return [...ret, { name: `服务网点1`, value: [avgX, avgY] }]
    },
    // 请求村级服务点数据
    setTownPointer (mapJson) {
      this.myChart.setOption({
        series: [{
          name: 'pointer',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.getMockCoordinate(mapJson),
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
