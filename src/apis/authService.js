import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const register = async (form) => {
  try {
    return await RestApiAdapter.post('/api/v1/auths/register', form)
  } catch (error) {
    throw error
  }
}

export const initializePassword = async (form) => {
  try {
    return await RestApiAdapter.patch('/api/v1/auths/initialize', form)
  } catch (error) {
    throw error
  }
}

export const findPassword = async (form) => {
  try {
    return await RestApiAdapter.post('/api/v1/auths/find-password', form)
  } catch (error) {
    throw error
  }
}

export const changePassword = async (form) => {
  try {
    return await RestApiAdapter.patch('/api/v1/members/1/password', form)
  } catch (error) {
    throw error
  }
}
