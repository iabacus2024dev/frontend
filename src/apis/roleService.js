import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const getAuthorities = async () => {
  return await RestApiAdapter.get(`/api/v1/roles`)
}
