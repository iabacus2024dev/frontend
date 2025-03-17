import RestApiAdapter from '@/adapters/restApiAdapter.js'

export const download = async (url, params, filename) => {
  try {
    const response = await RestApiAdapter.get(url, params, {
      responseType: 'blob',
    })

    const blob = new Blob([response], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${filename}.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('엑셀 다운로드 실패:', error)
    throw error
  }
}
