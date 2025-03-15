import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const getAthorities = async () => {
  return await RestApiAdapter.get(`/api/v1/roles`)
}
