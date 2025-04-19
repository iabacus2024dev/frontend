import RestApiAdapter from '@/adapters/restApiAdapter.js'
import { download } from '@/apis/common/downloadService.js'

export const createEmployee = async (data) => {
  return await RestApiAdapter.post('/api/v1/employees', data)
}

export const getMyEmployeeDetail = async () => {
  return await RestApiAdapter.get('/api/v1/employees/my')
}

export const getEmployees = async (params) => {
  return await RestApiAdapter.get('/api/v1/employees', params)
}

export const getEmployeeDetail = async (id) => {
  return await RestApiAdapter.get(`/api/v1/employees/${id}`)
}

export const updateEmployee = async (id, data) => {
  return await RestApiAdapter.put(`/api/v1/employees/${id}`, data)
}

export const deleteEmployee = async (id) => {
  return await RestApiAdapter.delete(`/api/v1/employees/${id}`)
}

export const leaveEmployee = async (id, data) => {
  return await RestApiAdapter.post(`/api/v1/employees/${id}/leave`, data)
}

export const downloadEmployees = async (params) => {
  await download('/api/v1/employees/excel/download', params, '구성원 정보')
}

export const downloadEmployeeSample = async (params) => {
  await download('/api/v1/employees/excel/sample', params, '구성워 정보_샘플')
}

export const uploadEmployee = async (formData) => {
  return await RestApiAdapter.post('/api/v1/employees/excel/upload', formData, null, {
    'Content-Type': 'multipart/form-data',
  })
}

export const uploadEmployeeSales = async (formData) => {
  return await RestApiAdapter.post('/api/v1/employees/excel/upload/sales', formData, null, {
    'Content-Type': 'multipart/form-data',
  })
}
