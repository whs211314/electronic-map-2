import axios from 'axios'
import router from './router'
import vue from 'vue'

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data.code === 0) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          vue.toasted.show('未登录')
          router.replace({ path: '/login' })
          break
        default:
          vue.toasted.show(error.response.data.message)
      }
      return Promise.reject(error.response)
    }
  }
)

export default axios
