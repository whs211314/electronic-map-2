<template>
  <baidu-map :zoom="zoom" :center="center" @ready="handleReady">
    <bm-marker :position="center" />
    <bm-control>
      <div class="back" @click="handleBack">返回</div>
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
  methods: {
    handleBack () {
      this.$emit('back')
    },
    handleReady ({ BMap, map }) {
      this.map = map
      this.BMap = BMap
      map.addControl(new BMap.NavigationControl({
        anchor: global.BMAP_ANCHOR_TOP_RIGHT
      }))
      this.setMarker(1)
    },
    setMarker (isTranslate = 0) {
      if (!isTranslate) {
        const { lng, lat } = this
        this.center = { lng, lat }
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
          this.center = data.points[0]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.back {
  margin: 10px;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 2px;
  background-color: #3f51b5;
  color: rgba(255, 255, 255, .87);
  box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
}
</style>
