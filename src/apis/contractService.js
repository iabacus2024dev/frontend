import RestApiAdapter from '@/adapters/restApiAdapter'

export const getContractDetail = async (contractId) => {
  try {
    return await RestApiAdapter.get(`api/v1/contracts/${contractId}`)
  } catch (error) {
    throw error
  }
}
