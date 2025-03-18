import RestApiAdapter from '@/adapters/restApiAdapter.js'
import { useMemberStore } from '@/stores/member.js'
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

export const getMyInfo = async () => {
  return await RestApiAdapter.get('/api/v1/members/my')
}

export const fetchLogin = async (form) => {
  await RestApiAdapter.post('/api/v1/auths/login?remember=true', form)
  await useMemberStore().login()
}

export const fetchLogout = async () => {
  await router.push('/auths/login')
  await RestApiAdapter.post('/api/v1/auths/logout')
  useMemberStore().logout()
}
