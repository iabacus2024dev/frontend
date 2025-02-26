<script setup>
import { RouterView } from 'vue-router'
import DialogComponent from './components/common/DialogComponent.vue'
import { useDialog } from './composables/useDialog'

const { dialogs, closeDialog, cancelDialog } = useDialog()

console.log('dialogs >>>', dialogs)

const handleDialogCloseBtn = (dialogId) => {
  console.log('handleDialogCloseBtn >>>', dialogId)
  closeDialog(dialogId)
}

const handleDialogCanCelBtn = (dialogId) => {
  console.log('handleDialogCanCelBtn >>>', dialogId)
  cancelDialog(dialogId)
}
</script>

<template>
  <component :is="$route.meta.layout || 'div'">
    <RouterView />
  </component>

  <DialogComponent
    v-for="dialog in dialogs"
    :key="dialog.id"
    :model="dialog"
    @close-dialog="handleDialogCloseBtn"
    @cancel-dialog="handleDialogCanCelBtn"
  />
</template>

<style scoped></style>
