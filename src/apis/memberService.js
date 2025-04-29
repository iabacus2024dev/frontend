import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const changePassword = async (form) => {
  return await RestApiAdapter.patch('/api/v1/members/password', form)
}

export const deleteMemberAccount = async (form) => {
  return await RestApiAdapter.delete('/api/v1/members/account', form)
}
