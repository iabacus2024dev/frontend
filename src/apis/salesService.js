import RestApiAdapter from '@/adapters/restApiAdapter.js'
import {download} from "@/apis/common/downloadService.js";

export const getAggregate = async (year) => {
  return await RestApiAdapter.get(`/api/v1/sales?year=${year}`)
}

export const downloadAggregate = async (params) => {
  await download('/api/v1/sales/excel/download', params, '매출 정보')
}
