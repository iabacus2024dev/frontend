import RestApiAdapter from '@/adapters/restApiAdapter'

export const getPersonnelByContractId = async (contractId) => {
  return await RestApiAdapter.get(`api/v1/inputs?contractId=${contractId}`)
}
