module.exports = {
  publicPath: './',
  configureWebpack: {
    externals: {
      BMap: 'BMap'
    }
  },
  devServer: {
    proxy: {
      '/february': {
        target: 'http://47.104.150.189:8090',
        changeOrigin: true
      }
    }
  },
  transpileDependencies: ['vue-echarts', 'resize-detector']
}
