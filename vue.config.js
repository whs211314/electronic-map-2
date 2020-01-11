module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/february': {
        target: 'http://192.168.1.14:8090',
        changeOrigin: true
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
