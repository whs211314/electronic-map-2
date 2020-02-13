<template>
  <div id="multiMap" style="width:100%;height:100%;"></div>
</template>

<script>
import * as api from '@/api'
export default {
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
    this.getMapScript().then(BMap => {
      var map = new BMap.Map('multiMap', {}) // 创建Map实例
      map.centerAndZoom(new BMap.Point(112.0498046875, 27.1484375), 8) // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom() // 启用滚轮放大缩小
      if (document.createElement('canvas').getContext) { // 判断当前浏览器是否支持绘制海量点
      // 接口加载
        api.getAllMchInfoList().then(res => {
          const points = []
          var i = 0
          for (;i < res.data.length; i++) {
            points.push(new BMap.Point(res.data[i].x, res.data[i].y))// 创建坐标点
          }
          var options = {
            size: BMAP_POINT_SIZE_SMALL,
            shape: BMAP_POINT_SHAPE_CIRCLE,
            color: '#009900'
          }
          var pointCollection = new BMap.PointCollection(points, options) // 初始化PointCollection
          pointCollection.addEventListener('click', function (e) {
            alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat) // 监听点击事件
          })
          map.addOverlay(pointCollection) // 添加Overlay
        })

        // 假数据模拟
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
        // var options = {
        //   size: BMAP_POINT_SIZE_SMALL,
        //   shape: BMAP_POINT_SHAPE_CIRCLE,
        //   color: '#009900'
        // }
        // var pointCollection = new BMap.PointCollection(points, options) // 初始化PointCollection
        // pointCollection.addEventListener('click', function (e) {
        //   alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat) // 监听点击事件
        // })
        // map.addOverlay(pointCollection) // 添加Overlay
      } else {
        alert('请在chrome、safari、IE8+以上浏览器查看本示例')
      }
    })
  },
  methods: {
    getMapScript () {
      if (!global.BMap) {
        const ak = 'O6GKe9A0L4xThRNPHotMrd5YpYlKotDY'
        global.BMap = {}
        global.BMap._preloader = new Promise((resolve, reject) => {
          global._initBaiduMap = function () {
            resolve(global.BMap)
            global.document.body.removeChild($script)
            global.BMap._preloader = null
            global._initBaiduMap = null
          }
          const $script = document.createElement('script')
          global.document.body.appendChild($script)
          $script.src = `https://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=_initBaiduMap`
        })
        return global.BMap._preloader
      } else if (!global.BMap._preloader) {
        return Promise.resolve(global.BMap)
      } else {
        return global.BMap._preloader
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
