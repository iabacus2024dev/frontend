import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const getAggregate = async (year) => {
  return await RestApiAdapter.get(`/api/v1/sales?year=${year}`)
}
