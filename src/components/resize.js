import { debounce } from 'lodash'

const DEFAULT_SIZE = [
  {
    screenWidth: 3840,
    screenHeight: 1200,
    className: 'ratio-large'
  }, {
    screenWidth: 3244,
    screenHeight: 1200,
    className: 'ratio-small'
  }
]

export default {
  data () {
    return {
      layoutIndex: 0,
      isReady: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$app = document.querySelector('#app')
      this.computeScale()
      this.isReady = true
      window.addEventListener('resize', debounce(this.computeScale, 200))
    })
  },
  methods: {
    computeScale () {
      // let scaleVal = 1
      const { innerHeight: height, innerWidth: width } = window
      // 视口长宽比判断使用哪种布局
      this.layoutIndex = width / height < 3 ? 1 : 0
      let { className } = this._getSize(this.layoutIndex)
      this.$app.className = `oh ${className}`
    },
    _getSize (index = 0) {
      return DEFAULT_SIZE[index]
    }
  }
}
