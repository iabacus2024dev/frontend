import RestApiAdapter from '@/adapters/restApiAdapter'

export const getContractDetail = async (contractId) => {
  return await RestApiAdapter.get(`api/v1/contracts/${contractId}`)
}

export const deleteContract = async (contractId) => {
  await RestApiAdapter.delete(`api/v1/contracts/${contractId}`)
}

export const updateContract = async (contractId, requestData) => {
  await RestApiAdapter.put(`api/v1/contracts/${contractId}`, requestData)
}
