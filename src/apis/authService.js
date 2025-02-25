import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const register = async (form) => {
  return await RestApiAdapter.post('/api/v1/auths/register', form)
}

export const initializePassword = async (form) => {
  return await RestApiAdapter.patch('/api/v1/auths/initialize', form)
}

export const findPassword = async (form) => {
  return await RestApiAdapter.post('/api/v1/auths/find-password', form)
}

export const changePassword = async (form) => {
  return await RestApiAdapter.patch('/api/v1/members/1/password', form)
}
