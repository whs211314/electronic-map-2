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
          this.deep += 1
          if (this.deep < 4) {
            console.log(param)
            this.currID = param.region.id
            // 代表有下级地图
            import(`../../public/map/${this.currID}.json`).then(mapJson => {
              this.registerAndsetOption(this.myChart, param.name, mapJson)
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
              color: '#fff'
            },
            emphasis: {
              show: true,
              color: '#ff0',
              shadowBlur: 10,
              shadowColor: '#ff0'
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
