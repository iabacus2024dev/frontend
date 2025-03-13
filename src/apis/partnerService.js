import RestApiAdapter from '@/adapters/restApiAdapter.js'

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
