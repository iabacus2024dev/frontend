import { useDialogStore } from '@/stores/dialogStore'
import { computed } from 'vue'

export function useDialog() {
  const dialogStore = useDialogStore()

  const openDialog = (dialogInfo) => {
    console.log('openDialog >>>', dialogStore.dialogs.length)
    return dialogStore.addDialog(dialogInfo)
  }

  const closeDialog = (dialogId) => {
    dialogStore.removeDialog(dialogId)
  }

  const cancelDialog = (dialogId) => {
    dialogStore.cancelDialog(dialogId)
  }

  const dialogs = computed(() => dialogStore.dialogs)

  return {
    dialogs,
    openDialog,
    closeDialog,
    cancelDialog,
  }
}
