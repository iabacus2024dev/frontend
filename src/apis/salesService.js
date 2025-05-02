import RestApiAdapter from '@/adapters/restApiAdapter.js'
import {download} from "@/apis/common/downloadService.js";

export const getAggregate = async (year, departmentType) => {
  const query = new URLSearchParams()
  if (year) query.append('year', year)
  if (departmentType) query.append('departmentType', departmentType)
  return await RestApiAdapter.get(`/api/v1/sales?${query.toString()}`)
}

export const downloadAggregate = async (params) => {
  await download('/api/v1/sales/excel/download', params, '매출 정보')
}
