import { restApiConfig } from '@/config/restApiConfig'
import axios from 'axios'
import { useToast } from 'vue-toastification'

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
  static async request(url, method = 'GET', reqData = null) {
    const toast = useToast()
    try {
      const response = await this.getInstance().request({
        method,
        url,
        data: reqData,
      })
      return response.data
    } catch (error) {
      toast.error(error.response?.data.message ?? error.message)
      throw error
    }
  }

  static async get(url) {
    return this.request(url, 'GET')
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
