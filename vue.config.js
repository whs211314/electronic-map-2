module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/february': {
        target: 'http://54.0.94.84',
        changeOrigin: true
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
