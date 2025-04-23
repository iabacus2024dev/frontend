import RestApiAdapter from '@/adapters/restApiAdapter.js'
import { download } from '@/apis/common/downloadService.js'

export const getMyProjects = async () => {
  return await RestApiAdapter.get('/api/v1/projects/my')
}

export const createProject = async (data) => {
  return await RestApiAdapter.post('api/v1/projects', data)
}

export const getProjects = async (params) => {
  return await RestApiAdapter.get('/api/v1/projects', params)
}

export const getProjectDetail = async (id) => {
  return await RestApiAdapter.get(`/api/v1/projects/${id}`)
}

export const updateProject = async (id, data) => {
  return await RestApiAdapter.put(`/api/v1/projects/${id}`, data)
}

export const deleteProject = async (id) => {
  return await RestApiAdapter.delete(`/api/v1/projects/${id}`)
}

export const downloadProjects = async (params) => {
  await download('/api/v1/projects/excel/download', params, '프로젝트 정보 정보')
}

export const downloadProjectsSample = async (params) => {
  await download('/api/v1/projects/excel/sample', params, '프로젝트 정보_샘플')
}

export const uploadProjects = async (formData) => {
  return await RestApiAdapter.post('/api/v1/projects/excel/upload', formData, null, {
    'Content-Type': 'multipart/form-data',
  })
}
