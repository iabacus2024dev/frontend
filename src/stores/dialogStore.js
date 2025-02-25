import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const dialogs = ref([])

  const addDialog = () => {
    const dialogId = Date.now()
    console.log('addDialog >>>', dialogId)
    dialogs.value.push({
      id: dialogId,
    })
    return dialogId
  }

  const removeDialog = (dialogId) => {
    const index = dialogs.value.findIndex((dialog) => dialog.id === dialogId)
    console.log('removeDialog >>>', dialogId)
    if (index !== -1) {
      console.log('해당 다이얼로그를 닫습니다.')
      dialogs.value.splice(index, 1)
    }
    return true
  }

  return {
    dialogs,
    addDialog,
    removeDialog,
  }
})
