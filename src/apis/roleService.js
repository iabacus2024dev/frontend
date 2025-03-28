import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const getMyAuthorities = async () => {
  return await RestApiAdapter.get(`/api/v1/roles/my`)
}

export const getRoles = async () => {
  return await RestApiAdapter.get(`/api/v1/roles`)
}

export const addRole = async (data) => {
  return await RestApiAdapter.post('/api/v1/roles', data)
}
