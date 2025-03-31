import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const getMyEmployeeDetail = async () => {
  return await RestApiAdapter.get('/api/v1/employees/my')
}

export const getEmployees = async (params) => {
  return await RestApiAdapter.get('/api/v1/employees', params)
}

export const getEmployeeDetail = async (id) => {
  return await RestApiAdapter.get(`/api/v1/employees/${id}`)
}
