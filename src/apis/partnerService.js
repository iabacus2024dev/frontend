import RestApiAdapter from '@/adapters/restApiAdapter.js'
import { download } from '@/apis/common/downloadService.js'

export const getPartnersDetail = async (partnersId) => {
  return await RestApiAdapter.get(`/api/v1/partners/${partnersId}`)
}

export const getPartners = async (params) => {
  return await RestApiAdapter.get('/api/v1/partners', params)
}

export const updatePartners = async (id, data) => {
  return await RestApiAdapter.put(`/api/v1/partners/${id}`, data)
}

export const deletePartners = async (id) => {
  return await RestApiAdapter.delete(`/api/v1/partners/${id}`)
}

export const downloadPartners = async (params) => {
  await download('/api/v1/partners/excel/download', params, '협력사 정보')
}

export const downloadPartnersSample = async (params) => {
  await download('/api/v1/partners/excel/sample', params, '협력사 정보_샘플')
}

export const uploadPartners = async (formData) => {
  return await RestApiAdapter.post('/api/v1/partners/excel/upload', formData, null, {
    'Content-Type': 'multipart/form-data',
  })
}
