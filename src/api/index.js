import dayjs from 'dayjs'
import http from '../http'
import mapName2Code from '@/assets/js/map'
// import { mock1, mock2 } from './mock'

// 异常终端视图汇总
export function getTotalErrorsReport() {
  return http.get('/february/backend/ecp-jxt-term-errors/getTotalErrorsReportDay', {
    params: { orgCode: '430000000', orgLevel: 1, status: 2 }
  })
}

// 异常终端地图联动
export function getErrorsReportJsc(status) {
  const endDateStr = dayjs().format('YYYY-MM-DD hh:mm:ss')
  const beginDateStr = dayjs().format('YYYY-01-01 00:00:00')
  return http.get('/february/backend/ecp-jxt-term-errors/getErrorsReportJscDay', {
    params: { status, orgCode: '430000000', pageNo: 1, pageSize: 30, beginDateStr, endDateStr }
  })
}

// 异常终端
export function getErrorsReportJscT(status) {
  const endDateStr = dayjs().format('YYYY-MM-DD hh:mm:ss')
  const beginDateStr = dayjs().format('YYYY-01-01 00:00:00')
  return http.get('/february/backend/ecp-jxt-term-errors/getErrorsReportJscTDay', {
    params: { status, orgCode: '430000000', pageNo: 1, pageSize: 30, beginDateStr, endDateStr }
  })
}

// 左导数据
export function getBtList() {
  return new Promise((resolve, reject) => {
    http.get('/february/stdImmBt/getBtList').then((res) => {
      resolve(res)
    })
  })
}

// 民生缴费占比
export function getOneEcpJxtMsjf() {
  return http.get('/february/ecpJxtMsjf/getOneEcpJxtMsjf', { params: { jrName: '湖南省' } })
}

// 饼图下方数据
export function getDataSumNew(params) {
  return http.get('/february/backend/indexMapInfo/getDataSumNew', {
    params: { streetName: '', orgCode: '430000000', ...params }
  })
}

// 服务点交易视图查询
export function getMchPhotoInfo(params) {
  return http.get('/february/backend/ecp-jxt-ct-info/getMchPhotoInfo', { params })
}

// 饼图数据
export function getPieData(mchId) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/ecpJxtTranAll/getListByparent', {
        params: mchId
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 服务点详情
export function getMchInfo({ mchId }) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/mchInfo/getMchInfo', {
        params: { mchId }
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 乡镇下所有服务点
export function getMchInfoList({ allName = '' } = {}) {
  const [cityName = '', areaName = '', streetName = ''] = allName.split('_')
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/mchInfo/getMchInfoList', {
        params: { cityName, areaName, streetName }
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 事实监控
export function getTransLog(mchId) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/translog/getTransLog', {
        params: mchId
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 服务信息
export function getMchInfoListLog(mchId) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/mchInfo/getMchInfoList', {
        params: mchId
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 客户经理信息
export function getManagerInfo(mchId) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/ecpJxtCustomerManager/getManagerInfo', {
        params: mchId
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 巡检记录
export function getCheckInfo(mchId) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/ecpCheck/getCheckInfo', {
        params: mchId
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 交易
export function getMchTrans(mchId) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/ecpJxtMchTop/getMchTrans', {
        params: mchId
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 饼图下数据
export function getDataSum(mchId) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/ecpJxtDataSum/getDataSum', {
        params: mchId
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 视图接口
export function getClassInfo(mchId) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/ecp_jxt_report_place/query', {
        params: mchId
      })
      .then((res) => {
        resolve(res)
      })
  })
}
// 获取所有服务点
export function getAllMchInfoList(mchId) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/mchInfo/getAllMchInfoList', {
        params: mchId
      })
      .then((res) => {
        resolve(res)
      })
  })
}
// 风险预警视图
export function countRiskWarn(mchId) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/ecp-jxt-riskwarn/countRiskWarn', {
        // /february/front/ecpJxtClass/getClassInfo
        params: mchId
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// top100
export function getTop(key) {
  const url = {
    0: '/february/front/ecpJxtMchTop/getTopNew',
    1: '/february/front/ecpJxtMchTop/getTopByOldYear'
  }
  return http.get(url[key])
  // const a = { 0: mock1, 1: mock2 }
  // return Promise.resolve(a[key])
}

// 获取地区服务点数量 地区类型areaType，1市，2县
export function getAreaServies({ areaType, cityName = '', tradeName = '' }) {
  if (![1, 2].includes(areaType)) {
    return Promise.reject(new Error('areaType 仅支持1、2'))
  }
  if (!tradeName) {
    return new Promise((resolve, reject) => {
      http
        .get('/february/front/ecpJxtRegion/getArea', {
          params: { areaType, cityName, areaName: '', streetName: '' }
        })
        .then((res) => {
          const ret = {}
          res.data.forEach((e) => {
            let code = ''
            if (areaType === 1) {
              code = mapName2Code[e.jrCityName]
            } else if (areaType === 2) {
              code = mapName2Code[`${e.jrCityName}_${e.jrAreaName}`]
            }
            ret[code] = e.jrServerCount
          })
          resolve(ret)
        })
    })
  }
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/ecpJxtRegion/getAreaNew', {
        params: { areaType, cityName, areaName: '', streetName: '', tradeName }
      })
      .then((res) => {
        const ret = {}
        res.data.trades.forEach((e) => {
          let code = ''
          if (areaType === 1) {
            code = mapName2Code[e.jpmCity]
          } else if (areaType === 2) {
            code = mapName2Code[`${e.jpmCity}_${e.jpmArea}`]
          }
          ret[code] = e.count
        })
        resolve(ret)
      })
  })
}

// 合作视图  地区类型0省，1市，2区县，3乡镇
export function getTrade({ areaType, cityName = '', tradeName = '' }) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/ecpJxtTrade/getTrade', {
        params: { areaType, cityName, areaName: '', streetName: '', tradeName }
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 合作视图  地区类型0省，1市，2区县，3乡镇
export function getTradeNew({ areaType, cityName = '', tradeName = '' }) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/ecpJxtTrade/getTradeNew', {
        params: { areaType, cityName, areaName: '', streetName: '', tradeName }
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 获取地市下面的区县网点
export function getAreaNet(cityName) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/front/bankpoint/getAreaNet', {
        params: { cityName }
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 巡检
export function getCheckInfoPage(params) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/ecpJxtCheckJsc/getCheckInfoPage', {
        params
      })
      .then((res) => {
        resolve(res)
      })
  })
}

// 异常终端视图
export function query(mchId) {
  return new Promise((resolve, reject) => {
    http
      .get('/february/backend/ecp-jxt-term-errors/query', {
        params: mchId
      })
      .then((res) => {
        resolve(res)
      })
  })
}
