import { restApiConfig } from '@/config/restApiConfig'
import axios from 'axios'

class RestApiAdapter {

  static axiosInstance = null
  static appContext = null

  constructor() {}

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
    try {
      console.log('API request:', method, url, reqData)
      const response = await this.getInstance().request({
        method,
        url,
        data: reqData,
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error
        console.error('API request error:', axiosError.message)

        // JWT 토큰 만료나 인증 오류 처리
        if (this.appContext?.config?.errorHandler) {
          setTimeout(() => {
            if (this.appContext?.config?.errorHandler) {
              this.appContext.config.errorHandler(axiosError)
            }
          }, 0)
        }
        return "ERROR"
      } else {
        console.error('Unknown error occurred:', error)
        const unknownError = new Error('Unknown error occurred')
        if (this.appContext?.config?.errorHandler) {
          setTimeout(() => {
            if (this.appContext?.config?.errorHandler) {
              this.appContext.config.errorHandler(unknownError)
            }
          }, 0)
        }
        return "ERROR"
      }
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
