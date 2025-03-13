import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const getMyEmployeeDetail = async () => {
  return await RestApiAdapter.get('/api/v1/employees/my')
}
