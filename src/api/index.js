import http from '../http'

// 饼图数据
export function getPieData () {
  return new Promise((resolve, reject) => {
    http.get('/february/front/ecpJxtTranAll/getList').then(res => {
      resolve(res)
    })
  })
}

// 服务点详情
export function getMchInfo ({ mchId }) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/mchInfo/getMchInfo', {
      params: { mchId }
    }).then(res => {
      resolve(res)
    })
  })
}

// 乡镇下所有服务点
export function getMchInfoList ({ allName }) {
  const [cityName, areaName, streetName] = allName.split('_')
  return new Promise((resolve, reject) => {
    http.get('/february/front/mchInfo/getMchInfoList', {
      params: { cityName, areaName, streetName }
    }).then(res => {
      resolve(res)
    })
  })
}

// 事实监控
export function getTransLog (mchId) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/translog/getTransLog', {
      params: mchId
    }).then(res => {
      resolve(res)
    })
  })
}

// 视图接口
export function getClassInfo (mchId) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/ecpJxtClass/getClassInfo', {
      params: mchId
    }).then(res => {
      resolve(res)
    })
  })
}
