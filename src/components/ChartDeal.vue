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
import coordinate from '@/assets/js/coordinate'

export default {
  data () {
    return {
      chinaJson: null,
      myChart: null,
      currID: '430000',
      deep: 0,
      timer: null
    }
  },
  computed: {
    currCoordinate () {
      console.log(this.currID)
      return coordinate[this.currID]
    },
    activePointer () {
      return this.currCoordinate[Math.floor(Math.random() * this.currCoordinate.length)]
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
      this.deep += 1
      if (this.deep < 2) {
        this.currID = param.region.id
        // 代表有下级地图
        import(`../../public/map/${this.currID}.json`).then(mapJson => {
          this.registerAndsetOption(this.myChart, param.name, mapJson)
        })
      } else {
        this.currID = '430000'
        this.deep = 0
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
      this.pointerActive()
      this.timer && clearInterval()
      this.timer = setInterval(() => {
        this.pointerActive()
      }, (8 + Math.random() * 5) * 1000)
    },
    pointerActive () {
      // setTimeout(() => {
      //   this.myChart.setOption({ series: [this.serisePointer] })
      // }, (2 + Math.random() * 3) * 1000)
      this.myChart.setOption({
        series: [this.serisePointer, {
          name: 'pointer-active',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: [this.activePointer],
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
        series: [this.serisePointer]
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
