<template>
  <baidu-map :zoom="zoom" :center="{lng, lat}"
    @ready="handleReady"
    @moveend="syncCenterAndZoom"></baidu-map>
</template>

<script>
export default {
  props: {
    lng: {
      type: Number,
      default: 116.232922
    },
    lat: {
      type: Number,
      default: 39.542637
    },
    zoom: {
      type: Number,
      default: 15
    }
  },
  data () {
    return {
      map: null
    }
  },
  methods: {
    handleReady ({ BMap, map }) {
      this.map = map
      this.BMap = BMap
      map.addControl(new BMap.NavigationControl())
      this.setMarker(1)
    },
    syncCenterAndZoom () {
      if (this.map) {
        this.setMarker(1)
      }
    },
    setMarker (isTranslate = 0) {
      if (!isTranslate) {
        const { lng, lat, BMap, map } = this
        const ggPoint = new BMap.Point(lng, lat)
        // 添加gps marker和label
        const markergg = new BMap.Marker(ggPoint)
        map.addOverlay(markergg) // 添加GPS marker
        const labelgg = new BMap.Label('原始的GPS坐标', { offset: new BMap.Size(20, -10) })
        markergg.setLabel(labelgg) // 添加GPS label
        return
      }
      this.setMarkerExt()
    },
    setMarkerExt () {
      const { lng, lat, BMap, map } = this
      const ggPoint = new BMap.Point(lng, lat)
      const convertor = new BMap.Convertor()
      const pointArr = []
      pointArr.push(ggPoint)
      convertor.translate(pointArr, 1, 5, (data) => {
        if (data.status === 0) {
          const marker = new BMap.Marker(data.points[0])
          map.addOverlay(marker)
          const label = new BMap.Label('转换的GPS坐标', { offset: new BMap.Size(20, -10) })
          marker.setLabel(label) // 添加百度label
          map.setCenter(data.points[0])
        }
      })
    }
  }
}
</script>
