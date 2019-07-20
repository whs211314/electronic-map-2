<template>
  <div id='mapChart'></div>
</template>

<script>
import echarts from 'echarts'
import * as api from '@/api'
import { serverIcon, netIcon } from '@/assets/js/utils'
const fontSize = getComputedStyle(document.body).getPropertyValue('--fontSize-map')

export default {
  data () {
    return {
      chinaJson: null,
      myChart: null,
      currID: '4300',
      jpmData: [],
      regionNetMap: {},
      currentLevel: 1
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
        this.myChart.on('click', this.handleClick)
      })
    },
    handleClick (param) {
      if (param.seriesType === 'scatter' && this.currentLevel === 4) {
        const data = this.jpmData.find(e => e.id === param.data.id)
        this.$emit('popup', {
          x: param.event.offsetX,
          y: param.event.offsetY,
          data
        })
        return
      }
      // console.log(param.region)
      if (!param.region) return
      const { id, name, allName } = param.region
      if (id !== this.currID) {
        this.currID = id
        // 点击到乡级地图
        if (this.currID.split('_').length === 3) {
          const townJson = {
            type: 'FeatureCollection',
            features: this.currJson.features.filter(e => e.id === this.currID)
          }
          this.currentLevel = 4
          this.$emit('goDown', { id, name, allName, level: this.currentLevel })
          this.registerAndsetOption(this.myChart, param.name, townJson)
          api.getMchInfoList({ allName }).then(res => {
            this.jpmData = res.data
            this.setTownPointer(townJson, res.data)
          })
          return
        }
        // 代表有下级地图
        import(`../../public/map/${this.currID}.json`).then(mapJson => {
          this.currJson = mapJson
          // 县一级服务点
          if (this.currID.split('_').length === 1) {
            this.currentLevel = 2
            this.$emit('goDown', { id, name, allName, level: this.currentLevel })
            echarts.registerMap(param.name, mapJson)
            this.handleCountyPointer(name)
          } else {
            this.currentLevel = 3
            this.$emit('goDown', { id, name, allName, level: this.currentLevel })
            this.registerAndsetOption(this.myChart, param.name, mapJson)
          }
        })
      } else {
        this.currentLevel = 1
        // 没有下级地图，回到一级中国地图，并将mapStack清空
        this.currJson = this.chinaJson
        this.registerAndsetOption(this.myChart, this.chinaName, this.chinaJson)
        this.$emit('goDown', { id: '4300', name: '湖南省', allName: '', level: this.currentLevel })
      }
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
          symbol: `image://${serverIcon}`,
          animation: false,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              color: '#fff',
              show: true
            },
            emphasis: {
              show: false
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
          regions: this.initMapData()
        },
        series: [{
          name: 'serverStation',
          type: 'scatter',
          coordinateSystem: 'geo',
          animation: false,
          data: this.initMapData(),
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
    initMapData () {
      const mapJson = this.currJson
      const mapData = []
      for (var i = 0; i < mapJson.features.length; i++) {
        mapData.push({
          name: mapJson.features[i].properties.name,
          id: mapJson.features[i].id,
          allName: mapJson.features[i].allName,
          value: mapJson.features[i].properties.cp
        })
      }
      return mapData
    },
    // 合作视图筛选
    handleFilter (tradeName) {
      if (this.currentLevel > 2) return
      api.getTrade({ areaType: this.currentLevel, tradeName }).then(res => {
        const map = res.data
        function getCount (params) {
          if (!map[params.data.name]) return 0
          return map[params.data.name][0].count
        }
        this.myChart.setOption({
          series: [{
            name: 'serverStation',
            type: 'scatter',
            coordinateSystem: 'geo',
            animation: false,
            data: this.initMapData(),
            label: {
              show: true,
              position: 'bottom',
              color: '#fff',
              formatter: params => params.data.allName.split('_').length < 3 ? getCount(params) : ''
            },
            itemStyle: {
              color: 'transparent'
            }
          }]
        })
      })
    },
    // 进入县级标记网点和服务点数量
    handleCountyPointer (name) {
      Promise.all([api.getAreaNet(name), api.getAreaServies({ areaType: 2, cityName: name })]).then(([netRes, serverRes]) => {
        const netData = netRes.data.map(e => ({
          name: e.jpmBankName,
          id: e.jpmBankNo,
          value: [e.jpmLat, e.jpmLon]
        }))
        serverRes.data.forEach(e => {
          this.regionNetMap[`${e.jrCity}_${e.jrArea}`] = e.jrServerCount
        })

        this.myChart.setOption({
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
            regions: this.initMapData()
          },
          series: [{
            name: 'netStation',
            type: 'scatter',
            coordinateSystem: 'geo',
            animation: false,
            symbolSize: fontSize,
            symbol: `image://${netIcon}`,
            data: netData,
            label: {
              show: false
            }
          }, {
            name: 'serverStation',
            type: 'scatter',
            coordinateSystem: 'geo',
            animation: false,
            data: this.initMapData(),
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
      })
    }
  }
}
</script>
