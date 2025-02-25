<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card class="rounded-dialog" rounded="xl">
      <!-- Title과 X 버튼을 같은 라인에 배치, X는 오른쪽 끝에 -->
      <v-card-title class="d-flex align-center">
        <span>{{ title }}</span>
        <v-spacer></v-spacer>
        <!-- 왼쪽에 공간을 채워서 X 버튼을 오른쪽 끝으로 밀어냄 -->
        <v-btn icon="mdi-close" @click="cancel" variant="none"> </v-btn>
      </v-card-title>

      <v-sheet class="bordered-text mx-4 my-3 pa-4" min-height="150">
        <v-card-text class="text-left">
          {{ text }}
        </v-card-text>
      </v-sheet>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="outlined" @click="confirm"> 확인 </v-btn>
        <v-btn color="red-darken-1" variant="outlined" @click="cancel"> 취소 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  title: String,
  text: String,
})

const emit = defineEmits(['confirm', 'cancel'])
const dialog = ref(false)

// 모달 열기 함수 (부모에서 ref로 접근 가능)
const open = () => {
  dialog.value = true
}

// 이벤트 핸들러
const confirm = () => {
  emit('confirm')
  dialog.value = false
}

const cancel = () => {
  emit('cancel')
  dialog.value = false
}

defineExpose({ open }) // 부모에서 open() 호출 가능하도록 설정
</script>

<style scoped>
/* Vuetify의 rounded-xl을 활용해 대체 */
.rounded-dialog {
  padding: 20px;
}

/* Vuetify 스타일 적용 */
.bordered-text {
  border: 2px solid #888; /* 테두리 유지 */
  border-radius: 12px; /* 둥근 모서리 */
}
</style>
