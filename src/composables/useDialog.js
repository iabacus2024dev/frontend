import { useDialogStore } from '@/stores/dialogStore'
import { computed } from 'vue'

export function useDialog() {
  const dialogStore = useDialogStore()

  const openDialog = () => {
    console.log('openDialog >>>')
    return dialogStore.addDialog()
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
