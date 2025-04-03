import RestApiAdapter from '@/adapters/restApiAdapter'

export const getTeamList = async () => {
  return await RestApiAdapter.get('/api/v1/teams')
}
export const getTreeViews = async () => {
  return await RestApiAdapter.get('/api/v1/teams/tree')
}

export const getTreeViewsWithMember = async () => {
  return await RestApiAdapter.get('/api/v1/teams/tree/member')
}

export const getDepartments = async () => {
  return await RestApiAdapter.get('api/v1/departments')
}
