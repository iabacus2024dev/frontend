import RestApiAdapter from '@/adapters/restApiAdapter'

export const getRankList = async () => {
  return await RestApiAdapter.get('/api/v1/classifications/R')
}

export const getTypeList = async () => {
  return await RestApiAdapter.get('/api/v1/classifications/T')
}

export const getGradeList = async () => {
  return await RestApiAdapter.get('/api/v1/classifications/G')
}
