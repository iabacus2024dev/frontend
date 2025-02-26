import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const dialogs = ref([])

  const addDialog = (dialogInfo) => {
    const dialogId = Date.now()

    console.log('addDialog >>>', dialogInfo)
    dialogs.value.push({
      id: dialogId,
      title: dialogInfo.title,
      contents: dialogInfo.contents,
      fnCallback: dialogInfo.fnCallback,
    })
    return dialogId
  }

  const removeDialog = (dialogId) => {
    const index = dialogs.value.findIndex((dialog) => dialog.id === dialogId)
    console.log('removeDialog >>>', dialogId)

    if (index !== -1) {
      const dialog = dialogs.value[index]
      dialogs.value.splice(index, 1) // 다이얼로그 닫기 (배열 요소 제거)
      dialog.fnCallback && dialog.fnCallback() // 콜백 함수가 존재하면 실행
    }
  }

  const cancelDialog = (dialogId) => {
    dialogs.value = dialogs.value.filter((dialog) => dialog.id !== dialogId)
  }

  return {
    dialogs,
    addDialog,
    removeDialog,
    cancelDialog,
  }
})
