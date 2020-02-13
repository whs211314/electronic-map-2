<template>
  <div id="multiMap"></div>
</template>

<script>
import data from './mockData'
  export default {
    mounted() {
      this.getMapScript().then(BMap => {
        var map = new BMap.Map("multiMap", {})                        // 创建Map实例
        map.centerAndZoom(new BMap.Point(112.0498046875, 27.1484375), 8)     // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom()                        //启用滚轮放大缩小
        if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
          var points = []  // 添加海量点数据
          for (var i = 0; i < data.data.length; i++) {
            points.push(new BMap.Point(data.data[i][0], data.data[i][1]))
          }
          var options = {
            size: BMAP_POINT_SIZE_SMALL,
            shape: BMAP_POINT_SHAPE_CIRCLE,
            color: 'red'
          }
          var pointCollection = new BMap.PointCollection(points, options)  // 初始化PointCollection
          pointCollection.addEventListener('click', function (e) {
            alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat)  // 监听点击事件
          })
          map.addOverlay(pointCollection);  // 添加Overlay
        } else {
          alert('请在chrome、safari、IE8+以上浏览器查看本示例')
        }
      })
    },
    methods: {
      getMapScript() {
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

<style>
  #multiMap {
    width: 800px;
    height: 800px;
  }
</style>