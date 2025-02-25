<template>
  <v-dialog v-model="isDialogOpen" max-width="500">
    <v-card title="제목 들어갈 자리">
      <v-card-text> 해당 ~을 삭제하시겠습니까? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="확인" @click="closeDialog" class="confirm-btn"></v-btn>
        <v-btn text="취소" @click="isDialogOpen = false" class="cancel-btn"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue'

const isDialogOpen = ref(false) // 다이얼로그 열림 여부

const props = defineProps({ model: Object })
const emits = defineEmits(['close-dialog'])

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
  emits('close-dialog', props.model.id) // dialog의 id를 부모로 전달
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
