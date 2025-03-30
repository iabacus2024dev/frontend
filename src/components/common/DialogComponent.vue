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
        <v-btn
          v-if="props.model.component"
          text="등록"
          @click="handleConfirm"
          class="confirm-btn"
        ></v-btn>
        <v-btn v-else text="확인" @click="closeDialog" class="confirm-btn"></v-btn>
        <v-btn text="취소" @click="cancelDialog" class="cancel-btn"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch, toRaw } from 'vue'

const isDialogOpen = ref(false) // 다이얼로그 열림 여부
const dialogContent = ref(null)

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

const selectMembers = () => {
  if (
    props.model.component?.__name === 'RoleSettingDialog' &&
    dialogContent.value?.getSelectedMembers
  ) {
    const selectedMembers = dialogContent.value.getSelectedMembers()
    if (selectedMembers) {
      props.model.props.onConfirm(selectedMembers)
    }
  }
}

const handleConfirm = () => {
  console.log('handleConfirm 실행, 다이얼로그 컴포넌트 데이터 가져오기')

  // 다이얼로그 내부 컴포넌트가 getFormData()를 제공하는 경우, 데이터를 가져와 콜백 실행
  if (dialogContent.value?.getFormData) {
    const formData = dialogContent.value.getFormData()

    // 반응형 객체에서 원본 데이터를 추출하여 콜백으로 전달
    const rawData = toRaw(formData)
    console.log('등록 버튼 클릭, 콜백 실행 데이터:', rawData)

    closeDialog(rawData)
  }
}

const closeDialog = (data) => {
  console.log('closeDialog >>>', props.model.id)
  selectMembers()
  emits('close-dialog', { dialogId: props.model.id, data })
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
