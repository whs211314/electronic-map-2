<template>
  <div id='mapChart'></div>
</template>

<script>
import echarts from 'echarts'
import * as api from '@/api'
const fontSize = getComputedStyle(document.body).getPropertyValue('--fontSize-map')

export default {
  data () {
    return {
      chinaJson: null,
      myChart: null,
      currID: '4300',
      jpmData: [],
      regionNetMap: {}
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
        // 获取市的所有服务点数
        api.getAreaServies({ areaType: 1 }).then(res => {
          res.data.forEach(e => {
            this.regionNetMap[e.jrRegionNo] = e.jrServerCount
          })
          this.registerAndsetOption(this.myChart, '湖南省', mapJson)
        })
        this.myChart.on('click', param => {
          if (param.seriesType === 'scatter') {
            const data = this.jpmData.find(e => e.id === param.data.id)
            this.$emit('popup', {
              x: param.event.offsetX,
              y: param.event.offsetY,
              data
            })
            return
          }
          const { id, name, allName } = param.region
          if (id !== this.currID) {
            this.currID = id
            // 点击到乡级地图
            if (this.currID.split('_').length === 3) {
              const townJson = {
                type: 'FeatureCollection',
                features: this.currJson.features.filter(e => e.id === this.currID)
              }
              this.$emit('goDown', { id, name, allName })
              this.registerAndsetOption(this.myChart, param.name, townJson)
              api.getMchInfoList({ allName }).then(res => {
                this.jpmData = res.data
                this.setTownPointer(townJson, res.data)
              })
              return
            }
            // 代表有下级地图
            import(`../../public/map/${this.currID}.json`).then(mapJson => {
              // 县一级服务点
              if (this.currID.split('_').length === 1) {
                api.getAreaServies({ areaType: 2, cityName: name }).then(res => {
                  console.log('====', res)
                  res.data.forEach(e => {
                    this.regionNetMap[`${e.jrCity}_${e.jrArea}`] = e.jrServerCount
                  })
                  this.currJson = mapJson
                  this.$emit('goDown', { id, name, allName })
                  this.registerAndsetOption(this.myChart, param.name, mapJson)
                })
              } else {
                this.currJson = mapJson
                this.$emit('goDown', { id, name, allName })
                this.registerAndsetOption(this.myChart, param.name, mapJson)
              }
            })
          } else {
            // 没有下级地图，回到一级中国地图，并将mapStack清空
            this.registerAndsetOption(this.myChart, this.chinaName, this.chinaJson)
            this.$emit('goDown', { id: '4300', name: '湖南省', allName: '' })
          }
        })
      })
    },
    // 服务点标点数据
    getCoordinate (jpmData) {
      return jpmData.map(e => ({
        id: e.id,
        value: [e.jpmLat, e.jpmLon]
      }))
    },
    // 请求村级服务点数据
    setTownPointer (mapJson, jpmData) {
      this.myChart.setOption({
        series: [{
          name: 'pointer',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.getCoordinate(jpmData),
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
        },
        series: [{
          type: 'scatter',
          coordinateSystem: 'geo',
          animation: false,
          data: this.initMapData(mapJson),
          label: {
            show: true,
            position: 'bottom',
            color: '#fff',
            formatter: params => params.data.allName.split('_').length < 3 ? this.regionNetMap[params.data.id] : ''
          },
          itemStyle: {
            color: 'transparent'
          }
        }]
      }, true)
    },
    initMapData (mapJson, level) {
      var mapData = []
      for (var i = 0; i < mapJson.features.length; i++) {
        mapData.push({
          name: mapJson.features[i].properties.name,
          id: mapJson.features[i].id,
          allName: mapJson.features[i].allName,
          value: mapJson.features[i].properties.cp
        })
      }
      return mapData
    }
  }
}
</script>
