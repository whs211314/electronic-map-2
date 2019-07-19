<template>
  <div id='mapChart'></div>
</template>

<script>
import echarts from 'echarts'
import map from '@/assets/js/map'
import { getRandom } from '@/assets/js/utils'
const fontSize = getComputedStyle(document.body).getPropertyValue('--fontSize-map')

export default {
  props: {
    topData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      myChart: null,
      jpmData: []
    }
  },
  computed: {
    countyID () {
      const { jpmCity, jpmArea } = this.topData
      return map[`${jpmCity}_${jpmArea}`]
    },
    townName () {
      const { jpmCity, jpmArea, jpmStreet } = this.topData
      return `${jpmCity}_${jpmArea}_${jpmStreet}`
    }
  },
  methods: {
    mapChart () {
      import(`../../public/map/${this.countyID}.json`).then(mapJson => {
        const townJson = {
          type: 'FeatureCollection',
          features: mapJson.features.filter(e => e.allName === this.townName)
        }
        this.myChart = echarts.init(document.getElementById('mapChart'))
        this.registerAndsetOption(this.myChart, '', townJson)
        this.myChart.on('click', param => {
          if (param.seriesType === 'scatter') {
            this.$emit('popup', {
              x: param.event.offsetX,
              y: param.event.offsetY,
              data: this.topData
            })
            return
          }
          this.$emit('showDeploy', { id: '4300', name: '湖南省' })
        })
      })
    },
    getCoordinate (mapJson) {
      let len = mapJson.features.length
      let x = 0
      let y = 0
      mapJson.features.forEach(e => {
        x += +e.properties.cp[0]
        y += +e.properties.cp[1]
      })
      const random1 = getRandom(10) * 0.0024 * (Math.random() < 0.5 ? -1 : 1)
      const random2 = getRandom(10) * 0.0016 * (Math.random() < 0.5 ? -1 : 1)
      return [[x / len + random1, y / len + random2]]
    },
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
          }
        },
        series: [{
          name: 'pointer',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.getCoordinate(mapJson),
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
      }, true)
    }
  }
}
</script>
