<template>
  <baidu-map :zoom="zoom" :center="{lng, lat}"
    @ready="handleReady"
    @moveend="syncCenterAndZoom">
    <bm-marker :position="position" />
  </baidu-map>
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
      map: null,
      position: {}
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
        const { lng, lat } = this
        this.position = { lng, lat }
        return
      }
      this.setMarkerExt()
    },
    setMarkerExt () {
      const { lng, lat, BMap } = this
      const ggPoint = new BMap.Point(lng, lat)
      const convertor = new BMap.Convertor()
      const pointArr = []
      pointArr.push(ggPoint)
      convertor.translate(pointArr, 1, 5, (data) => {
        if (data.status === 0) {
          this.position = data.points[0]
        }
      })
    }
  }
}
</script>
