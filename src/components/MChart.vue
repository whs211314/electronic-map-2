<template>
  <div id="mapChart"></div>
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
import cityMap from '@/assets/js/map'

export default {
  data () {
    return {
      // 地图（第一级地图）的ID、Name、Json数据
      chinaId: '430000',
      chinaName: '湖南省',
      chinaJson: null,
      // 记录父级ID、Name
      mapStack: [],
      parentId: null,
      parentName: null,
      // 地图实例
      myChart: null
    }
  },
  mounted () {
    this.mapChart('mapChart')
  },
  methods: {
    mapChart (divid) {
      import(`../assets/map/${this.chinaId}.json`).then(mapJson => {
        this.chinaJson = mapJson
        this.myChart = echarts.init(document.getElementById(divid))
        this.registerAndsetOption(this.myChart, this.chinaId, this.chinaName, mapJson, false)
        this.parentId = this.chinaId
        this.parentName = 'china'
        this.myChart.on('click', (param) => {
          var cityId = cityMap[param.name]
          if (cityId) {
            // 代表有下级地图
            import(`../assets/map/${cityId}.json`)
              .then(mapJson => {
                this.registerAndsetOption(
                  this.myChart,
                  cityId,
                  param.name,
                  mapJson,
                  true
                )
              })
          } else {
            // 没有下级地图，回到一级中国地图，并将mapStack清空
            this.registerAndsetOption(this.myChart, this.chinaId, this.chinaName, this.chinaJson, false)
            this.mapStack = []
            this.parentId = this.chinaId
            this.parentName = this.chinaName
          }
        })
      })
    },
    /**
     *
     * @param {*} myChart
     * @param {*} id        省市县Id
     * @param {*} name      省市县名称
     * @param {*} mapJson   地图Json数据
     * @param {*} flag      是否往mapStack里添加parentId，parentName
     */
    registerAndsetOption (myChart, id, name, mapJson, flag) {
      echarts.registerMap(name, mapJson)
      myChart.setOption({
        series: [
          {
            type: 'map',
            map: name,
            label: {
              show: true,
              color: '#fff'
            },
            itemStyle: {
              areaColor: 'rgba(77,141,147,.4)',
              borderColor: '#1dc199',
              borderWidth: 1
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
          }
        ]
      })

      if (flag) {
        // 往mapStack里添加parentId，parentName,返回上一级使用
        this.mapStack.push({
          mapId: this.parentId,
          mapName: this.parentName
        })
        this.parentId = this.id
        this.parentName = this.name
      }
    },
    initMapData (mapJson) {
      var mapData = []
      for (var i = 0; i < mapJson.features.length; i++) {
        mapData.push({
          name: mapJson.features[i].properties.name
        })
      }
      return mapData
    }
  }
}
</script>
