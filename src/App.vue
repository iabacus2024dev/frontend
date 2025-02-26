<script setup>
import { RouterView } from 'vue-router'
import DialogComponent from './components/common/DialogComponent.vue'
import { useDialog } from './composables/useDialog'

const { dialogs, closeDialog } = useDialog()

console.log('dialogs >>>', dialogs)

const handleDialogCancelBtn = (dialogId) => {
  console.log('dialogs >>>', dialogId)
  closeDialog(dialogId)
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
    @close-dialog="handleDialogCancelBtn"
  />
</template>

<style scoped></style>
