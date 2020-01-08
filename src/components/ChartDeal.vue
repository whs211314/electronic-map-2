<template>
  <baidu-map :zoom="zoom" :center="center" @ready="handleReady" style="height:455px;">
    <bm-marker :position="center" />
    <bm-control>
    </bm-control>
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
      center: {}
    }
  },
  watch: {
    lng () {
      if (this.map) {
        this.setMarker(1)
      }
    },
    lat () {
      if (this.map) {
        this.setMarker(1)
      }
    }
  },
  mounted () {
  },
  methods: {
    handleReady ({ BMap, map }) {
      this.map = map
      this.BMap = BMap
      map.addControl(new BMap.NavigationControl({
        anchor: global.BMAP_ANCHOR_TOP_RIGHT
      }))
      this.setMarkerExt()
    },
    setMarkerExt () {
      const { BMap } = this
      console.log(this)
      const ggPoint = new BMap.Point('112.0498046875', '27.1484375')
      this.map.centerAndZoom('娄底', 7) // 控制地图大小比例
      const convertor = new BMap.Convertor()
      const pointArr = []
      pointArr.push(ggPoint)
      convertor.translate(pointArr, 1, 5, (data) => {
        if (data.status === 0) {
          this.center = data.points[0]
        }
      })
      this.map.enableScrollWheelZoom(true)
      var mapPoints = [
        { x: 27.82, y: 112.55 },
        { x: 27.73, y: 111.5 },
        { x: 26.13, y: 111.6 },
        { x: 26.9, y: 112.6 },
        { x: 28.19, y: 112.6 }
      ]
      var i = 0
      for (;i < mapPoints.length; i++) {
        var points = new BMap.Point(mapPoints[i].y, mapPoints[i].x)// 创建坐标点
        var markers = new BMap.Marker(points)
        this.map.addOverlay(markers)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
