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
export function getMchInfoList ({ allName = '' } = {}) {
  const [cityName = '', areaName = '', streetName = ''] = allName.split('_')
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

// 服务信息
export function getMchInfoListLog (mchId) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/mchInfo/getMchInfoList', {
      params: mchId
    }).then(res => {
      resolve(res)
    })
  })
}

// 客户经理信息
export function getManagerInfo (mchId) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/ecpJxtCustomerManager/getManagerInfo', {
      params: mchId
    }).then(res => {
      resolve(res)
    })
  })
}

// 巡检记录
export function getCheckInfo (mchId) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/ecpCheck/getCheckInfo', {
      params: mchId
    }).then(res => {
      resolve(res)
    })
  })
}

// 交易
export function getMchTrans (mchId) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/ecpJxtMchTop/getMchTrans', {
      params: mchId
    }).then(res => {
      resolve(res)
    })
  })
}

// 饼图下数据
export function getDataSum (mchId) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/ecpJxtDataSum/getDataSum', {
      params: mchId
    }).then(res => {
      resolve(res)
    })
  })
}

// 视图接口
export function getClassInfo (mchId) {
  return new Promise((resolve, reject) => {
    http.get('/february/ecp_jxt_report_place/query', {
      params: mchId
    }).then(res => {
      resolve(res)
    })
  })
}

// top100
export function getTop ({ allName = '' } = {}) {
  const [cityName = '', areaName = '', streetName = ''] = allName.split('_')
  return new Promise((resolve, reject) => {
    http.get('/february/front/ecpJxtMchTop/getTop', {
      params: { cityName, areaName, streetName, pageIndex: 1 }
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取地区服务点数量 地区类型areaType，1市，2县
export function getAreaServies ({ areaType, cityName = '' }) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/ecpJxtRegion/getArea', {
      params: { areaType, cityName, areaName: '', streetName: '' }
    }).then(res => {
      resolve(res)
    })
  })
}

// 合作视图  地区类型0省，1市，2区县，3乡镇
export function getTrade ({ areaType, cityName = '', tradeName = '' }) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/ecpJxtTrade/getTrade', {
      params: { areaType, cityName, areaName: '', streetName: '', tradeName }
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取地市下面的区县网点
export function getAreaNet (cityName) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/bankpoint/getAreaNet', {
      params: { cityName }
    }).then(res => {
      resolve(res)
    })
  })
}

// 巡检
export function getCheckInfoPage (mchId) {
  return new Promise((resolve, reject) => {
    http.get('/february/front/ecpCheck/getCheckInfoPage', {
      params: mchId
    }).then(res => {
      resolve(res)
    })
  })
}

// 异常终端视图
export function query (mchId) {
  return new Promise((resolve, reject) => {
    http.get('/february/backend/ecp-jxt-term-errors/query', {
      params: mchId
    }).then(res => {
      resolve(res)
    })
  })
}
