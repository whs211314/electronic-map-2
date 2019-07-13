<template>
  <div id='mapChart'></div>
</template>

<style>
#mapChart {
  height: 100%;
  position: absolute;
  top: 0%;
  right: -10%;
  bottom: -10%;
  left: -10%;
}
</style>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      chinaJson: null,
      myChart: null,
      currID: '430000'
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
          if (this.currID !== param.data.id) {
            this.currID = param.data.id
            // 代表有下级地图
            import(`../../public/map/${this.currID}.json`).then(mapJson => {
              this.registerAndsetOption(this.myChart, param.name, mapJson)
            })
          } else {
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
    /**
     *
     * @param {*} myChart
     * @param {*} name      省市县名称
     * @param {*} mapJson   地图Json数据
     */
    registerAndsetOption (myChart, name, mapJson) {
      echarts.registerMap(name, mapJson)
      myChart.setOption({
        series: [{
          type: 'map',
          map: name,
          normal: {
            label: {
              show: true,
              color: '#fff'
            },
            itemStyle: {
              areaColor: 'rgba(77,141,147,.4)',
              borderColor: '#1dc199',
              borderWidth: 1
            }
          },
          emphasis: {
            label: {
              color: '#ff0'
            },
            itemStyle: {
              areaColor: 'rgba(77,141,147,.8)'
            }
          },
          data: this.initMapData(mapJson)
        }]
      })
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
