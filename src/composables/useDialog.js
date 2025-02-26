import { useDialogStore } from '@/stores/dialogStore'
import { computed } from 'vue'

export function useDialog() {
  const dialogStore = useDialogStore()

  const openDialog = (dialogInfo) => {
    console.log('openDialog >>>', dialogInfo)
    return dialogStore.addDialog(dialogInfo)
  }

  const closeDialog = (dialogId) => {
    return dialogStore.removeDialog(dialogId)
  }

  const dialogs = computed(() => dialogStore.dialogs)

  return {
    dialogs,
    openDialog,
    closeDialog,
  }
}
