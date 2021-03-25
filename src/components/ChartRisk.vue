<template>
  <div id="mapChart"></div>
</template>

<script>
import echarts from 'echarts'
import * as api from '@/api'
const fontSize = getComputedStyle(document.body).getPropertyValue('--fontSize-map')

export default {
  props: ['riskStatus'], // 0=未处理，1=已处理，2=全部
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
  watch: {
    riskStatus: {
      handler () {
        this.mapChart()
      },
      immediate: true
    }
  },
  methods: {
    mapChart () {
      import(`../../public/map/${this.currID}.json`).then(mapJson => {
        this.chinaJson = mapJson
        this.currJson = mapJson
        this.myChart = echarts.init(document.getElementById('mapChart'))
        api.organJscDay(this.riskStatus).then(res => {
          this.regionNetMap = res.data
          this.registerAndsetOption(this.myChart, '湖南省', mapJson)
        })
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
            fontSize,
            fontWeight: 'bold',
            formatter: params => {
              const obj = this.regionNetMap[params.data.name]
              return obj ? obj.sum : '-'
            }
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
    }
  }
}
</script>
