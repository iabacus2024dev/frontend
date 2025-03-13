import RestApiAdapter from '@/adapters/restApiAdapter.js'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'

export const register = async (form) => {
  return await RestApiAdapter.post('/api/v1/auths/register', form)
}

export const initializePassword = async (form) => {
  return await RestApiAdapter.patch('/api/v1/auths/initialize', form)
}

export const findPassword = async (form) => {
  return await RestApiAdapter.post('/api/v1/auths/find-password', form)
}

export const fetchLogin = async (form) => {
  const response = await RestApiAdapter.post('/api/v1/auths/login?remember=true', form)
  await useUserStore().login()
  return response
}

export const fetchLogout = async () => {
  await router.push('/auths/login')
  await RestApiAdapter.post('/api/v1/auths/logout')
  useUserStore().logout()
}
