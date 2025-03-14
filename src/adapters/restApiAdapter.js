import { restApiConfig } from '@/config/restApiConfig'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'
import { useCookies } from 'vue3-cookies'

class RestApiAdapter {
  static axiosInstance = null
  static appContext = null

  static initialize(appContext) {
    this.appContext = appContext
  }

  // Axios 인스턴스 가져오기 (없으면 생성)
  static getInstance() {
    if (!RestApiAdapter.axiosInstance) {
      RestApiAdapter.axiosInstance = axios.create(restApiConfig)
      RestApiAdapter.axiosInstance.defaults.withCredentials = true
    }
    return RestApiAdapter.axiosInstance
  }

  // API 요청 처리
  static async request(url, method = 'GET', reqData = null, params = null) {
    try {
      let { cookies } = useCookies()
      const cookieXsrf = cookies.get('XSRF-TOKEN')
      if (cookieXsrf) {
        localStorage.setItem('XSRF-TOKEN', cookieXsrf)
      }
      const xsrf = localStorage.getItem('XSRF-TOKEN')
      const headers = xsrf ? { 'X-XSRF-TOKEN': xsrf } : {}
      const response = await this.getInstance().request({
        method,
        url,
        data: reqData,
        params,
        headers,
      })
      return response.data
    } catch (error) {
      if (error.response?.data.code === '403') {
        await router.push('/')
      } else if (error.response?.data.code === '401') {
        useUserStore().logout()
        await router.push('/auths/login')
      }
      const toast = useToast()
      toast.error(error.response?.data.message ?? error.message)
      throw error
    }
  }

  static async get(url, params) {
    return this.request(url, 'GET', null, params)
  }

  static async post(url, data) {
    return this.request(url, 'POST', data)
  }

  static async put(url, data) {
    return this.request(url, 'PUT', data)
  }

  static async patch(url, data) {
    return this.request(url, 'PATCH', data)
  }

  static async delete(url) {
    return this.request(url, 'DELETE')
  }
}

export default RestApiAdapter
