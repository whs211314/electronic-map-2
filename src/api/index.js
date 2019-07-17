import http from '../http'

// 饼图数据
export function getPieData () {
  return new Promise((resolve, reject) => {
    http.get('/february/front/ecpJxtTranAll/getList').then(res => {
      resolve(res)
    })
  })
}
