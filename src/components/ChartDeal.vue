<template>
  <div id="multiMap" style="width:100%;height:100%;border: 3px solid #07B3B1;"></div>
</template>

<script>
  import * as api from '@/api'

  const modalMap = [
    { label: '商户名称', key: 'mchName' },
    { label: '业主姓名', key: 'managerName' },
    { label: '经度', key: 'x' },
    { label: '纬度', key: 'y' }
  ]
  export default {
    data() {
      return {
        map: null,
        lastPointCollection: null,
        center: {},
        pointData: {},
        pointList: []
      }
    },
    mounted() {
      this.getMapScript().then(BMap => {
        this.map = new BMap.Map('multiMap', {
          minZoom: 7,
          maxZoom: 13
        })
        this.initMap()
        if (document.createElement('canvas').getContext) {
          this.getPoints().then(() => {
            this.addPointers()
          })
        } else {
          alert('请在chrome、safari、IE8+以上浏览器查看本示例')
        }
      })
    },
    methods: {
      initMap() {
        const self = this
        const top_right_navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_LARGE })
        const mapStyle = {
          features: ['road', 'building', 'water', 'land'], // 隐藏地图上的"poi",
          style: 'dark'
        }
        this.map.setMapStyle(mapStyle)
        this.map.centerAndZoom(new BMap.Point(112.0498046875, 27.1484375), 8) // 初始化地图,设置中心点坐标和地图级别
        // map.enableScrollWheelZoom() // 启用滚轮放大缩小
        this.map.addControl(top_right_navigation);
        this.map.addEventListener("zoomend", function () {
          console.log(this.getZoom())
          const zoom = this.getZoom()
          let size = BMAP_POINT_SIZE_TINY
          if (zoom === 12 || zoom === 13) {
            size = BMAP_POINT_SIZE_NORMAL
          } else if (zoom === 11) {
            size = BMAP_POINT_SIZE_NORMAL
          } else if (zoom === 9 || zoom === 10) {
            size = BMAP_POINT_SIZE_SMALL
          } else if (zoom === 8) {
            size = BMAP_POINT_SIZE_SMALLER
          }
          self.addPointers(size)
        })
      },
      // 获取描点数据
      getPoints() {
        return api.getAllMchInfoList().then(res => {
          this.pointList = res.data
          res.data.forEach(e => {
            this.pointData[`${e.x}_${e.y}`] = e
          })
        })
      },
      // 描点
      addPointers(size = BMAP_POINT_SIZE_SMALLER) {
        const self = this
        if (this.lastPointCollection) {
          this.lastPointCollection.clear()
        }
        const points = []
        for (let i = 0; i < this.pointList.length; i++) {
          points.push(new BMap.Point(this.pointList[i].x, this.pointList[i].y))// 创建坐标点
        }
        const options = {
          size,
          shape: BMAP_POINT_SHAPE_CIRCLE,
          color: '#23E7E4'
        }
        const pointCollection = new BMap.PointCollection(points, options) // 初始化PointCollection
        pointCollection.addEventListener('mouseover', function (e) {
          const key = `${e.point.lng}_${e.point.lat}`
          const item = self.pointData[key]
          if (item) {
            const point = new BMap.Point(e.point.lng, e.point.lat)
            const marker = new BMap.Marker(point)
            const content = `
              <div class="point-modal">
                ${modalMap.map(e => '<div class="item"><b class="label">' + e.label + '</b><span class="value">' + item[e.key] + '</span></div>').join('')}
              </div>
            `
            const infoWindow = new BMap.InfoWindow(content) // 创建信息窗口对象
            this.map.openInfoWindow(infoWindow, point) //开启信息窗口
          }
        })
        this.map.addOverlay(pointCollection) // 添加Overlay
        this.lastPointCollection = pointCollection
      },
      // 获取 map 实例
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

<style lang="scss">
.point-modal {
  .item {
    font-size: 14px;
    display: flex;
    .label {
      width: 80px;
    }
    .value {
      flex: 1;
    }
  }
}
</style>
