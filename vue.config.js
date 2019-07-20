module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/february': {
        target: 'http://10.0.2.158:8080',
        changeOrigin: true
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
