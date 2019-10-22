<template>
  <baidu-map
    class="map"
    ref="baiduMap"
    :zoom="zoom"
    :center="{lng, lat}"
    @moving="syncCenterAndZoom"
    @moveend="syncCenterAndZoom"
    @zoomend="syncCenterAndZoom">
    <bm-marker :position="center"></bm-marker>
  </baidu-map>
</template>

<script>
export default {
  props: {
    lng: {
      type: Number,
      default: 112.0498046875
    },
    lat: {
      type: Number,
      default: 27.1484375
    },
    zoom: {
      type: Number,
      default: 15
    }
  },
  data () {
    return {
      center: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.handlePointConvert()
    })
  },
  methods: {
    handlePointConvert () {
      this.BMap = this.$refs.baiduMap.map
      const ggPoint = new this.BMap.Point(this.lng, this.lat)
      const convertor = new this.BMap.Convertor()
      convertor.translate([ggPoint], 1, 5, (data) => {
        if (data.status === 0) {
          this.markerPosition = data.points[0]
        }
      })
    },
    syncCenterAndZoom (e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      console.log(111)
      this.zoom = e.target.getZoom()
    }
  }
}
</script>
