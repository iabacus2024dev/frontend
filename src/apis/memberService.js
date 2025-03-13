import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const changePassword = async (form) => {
  return await RestApiAdapter.patch('/api/v1/members/password', form)
}
