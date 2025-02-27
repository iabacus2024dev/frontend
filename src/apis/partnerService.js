import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const getPartnersDetail = async (partnersId) => {
  return await RestApiAdapter.get(`/api/v1/partners/${partnersId}`)
}

export const getPartners = async () => {
  return await RestApiAdapter.get('/api/v1/partners')
}
