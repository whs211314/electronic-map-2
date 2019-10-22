<template>
  <baidu-map class="map" :center="{lng, lat}" :zoom="zoom" @ready="handler">
    <bm-marker :position="markerPosition"></bm-marker>
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
      markerPosition: {}
    }
  },
  methods: {
    handler ({ BMap }) {
      const convertor = new BMap.Convertor()
      const ggPoint = new BMap.Point(this.lng, this.lat)
      convertor.translate([ggPoint], 1, 5, (data) => {
        if (data.status === 0) {
          this.markerPosition = data.points[0]
        }
      })
    }
  }
}
</script>
