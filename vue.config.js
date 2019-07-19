module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/february': {
        target: 'http://192.168.1.9:8080',
        changeOrigin: true
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
