<template>
  <v-dialog v-model="isDialogOpen" :width="'auto'" :height="'auto'">
    <v-card>
      <v-card-title>{{ props.model.title }}</v-card-title>
      <v-divider />
      <v-card-text>
        <component
          v-if="props.model.component"
          :is="props.model.component"
          v-bind="props.model.props"
          ref="dialogContent"
        />
        <div v-else>{{ props.model.contents }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="확인" @click="closeDialog" class="confirm-btn"></v-btn>
        <v-btn text="취소" @click="cancelDialog" class="cancel-btn"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {defineEmits, defineProps, ref, watch} from 'vue'

const isDialogOpen = ref(false) // 다이얼로그 열림 여부
const dialogContent = ref(null);

const props = defineProps({ model: Object })
const emits = defineEmits(['close-dialog', 'cancel-dialog'])

// props 변경 감지하여 반영
watch(
  () => props.model,
  (newVal) => {
    isDialogOpen.value = !!newVal // 값이 존재하면 열림
  },
  { immediate: true },
)

const closeDialog = () => {
  console.log('closeDialog >>>', props.model.id)
  const selectedMembers = dialogContent.value.getSelectedMembers?.();
  props.model.props.onConfirm(selectedMembers);
  emits('close-dialog', props.model.id);
}

const cancelDialog = () => {
  console.log('cancelDialog >>>', props.model.id)
  emits('cancel-dialog', props.model.id) // dialog의 id를 부모로 전달
}
</script>

<style scoped>
.confirm-btn {
  background-color: lightgray;
  color: white;
}

.cancel-btn {
  background-color: #eb6129;
  color: white;
}
</style>
