module.exports = {
  publicPath: './',
  // devServer: {
  //   proxy: {
  //     '/february': {
  //       target: 'http://172.16.28.96',
  //       changeOrigin: true
  //     }
  //   }
  // },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
