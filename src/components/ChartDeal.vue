<template>
  <baidu-map :zoom="zoom" :center="center" @ready="handleReady" style="height:100%">
    <bm-marker :position="center" />
    <bm-control>
    </bm-control>
  </baidu-map>
</template>

<script>
import * as api from '@/api'
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

      // 接口请求海量标点
      this.map.enableScrollWheelZoom(true)
      var point = new BMap.Point('112.0498046875', '27.1484375') // 定位的地图视觉中心
      this.map.centerAndZoom(point, 7) // 设置地图的缩放级别

      api.getAllMchInfoList().then(res => {
        const points = []
        var i = 0
        for (;i < res.data.length; i++) {
          points.push(new BMap.Point(res.data[i].x, res.data[i].y))// 创建坐标点
        }
        const options = {
          size: 13,
          shape: 3,
          color: 'red'
        }
        const pointCollection = new BMap.PointCollection(points, options)
        this.map.addOverlay(pointCollection)
      })
      // 加载海量点《模拟》数据
      // const ggPoint = new BMap.Point('112.0498046875', '27.1484375')
      // this.map.centerAndZoom(ggPoint, 7) // 控制地图大小比例
      // const points = []
      // var mapPoints = [
      //   { y: 27.82, x: 112.55 },
      //   { y: 27.73, x: 111.5 },
      //   { y: 26.13, x: 111.6 },
      //   { y: 26.9, x: 112.6 },
      //   { y: 28.19, x: 112.6 },
      //   { x: 109.98804490894351, y: 27.54911215611929 },
      //   { x: 109.98988774833771, y: 27.557991094785056 },
      //   { x: 110.14803797676342, y: 27.325122562561397 }
      // ]
      // var i = 0
      // for (;i < mapPoints.length; i++) {
      //   points.push(new BMap.Point(mapPoints[i].x, mapPoints[i].y))// 创建坐标点
      // }
      // const options = {
      //   size: 13,
      //   shape: 3,
      //   color: 'red'
      // }
      // console.log(points)
      // const pointCollection = new BMap.PointCollection(points, options)
      // this.map.addOverlay(pointCollection)
      // 加载多个点
      // var mapPoints = [
      //   { y: 27.82, x: 112.55 },
      //   { y: 27.73, x: 111.5 },
      //   { y: 26.13, x: 111.6 },
      //   { y: 26.9, x: 112.6 },
      //   { y: 28.19, x: 112.6 },
      //   { x: 109.98804490894351, y: 27.54911215611929 },
      //   { x: 109.98988774833771, y: 27.557991094785056 },
      //   { x: 110.14803797676342, y: 27.325122562561397 }
      // ]
      // var i = 0
      // for (;i < mapPoints.length; i++) {
      //   var points = new BMap.Point(mapPoints[i].x, mapPoints[i].y)// 创建坐标点
      // var markers = new BMap.Marker(points)
      // this.map.addOverlay(markers)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
