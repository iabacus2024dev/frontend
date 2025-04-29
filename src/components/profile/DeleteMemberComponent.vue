<template>
  <v-card border="thin" class="mt-4 pa-4" variant="outlined">
    <v-card-title class="d-flex align-center">
      <v-icon color="error" class="mr-2">mdi-account-remove</v-icon>
      <span class="text-h5 font-weight-bold">회원 탈퇴</span>
    </v-card-title>
    <v-divider class="my-3"></v-divider>

    <v-card-text>
      <v-alert type="warning" variant="tonal" class="mb-4" density="compact">
        <div class="text-subtitle-2 font-weight-bold mb-1">탈퇴 전 주의사항을 확인해주세요</div>
        <ul class="text-body-4">
          <li>회원 탈퇴 시 계정 정보 및 개인 데이터가 삭제됩니다.</li>
          <li>삭제된 정보는 복구할 수 없습니다.</li>
          <li>프로젝트 및 업무 데이터는 유지됩니다.</li>
        </ul>
      </v-alert>

      <v-expand-transition>
        <div v-if="showConfirmation">
          <v-text-field
            v-model="confirmText"
            label="'탈퇴확인'을 입력하세요"
            variant="outlined"
            density="comfortable"
            class="mb-3"
            :rules="[rules.match]"
          ></v-text-field>

          <div class="d-flex">
            <v-btn color="#eb6129" variant="text" class="mr-2" @click="cancelDelete"> 취소 </v-btn>
            <v-btn
              color="#eb6129"
              :disabled="confirmText !== '탈퇴확인'"
              :loading="loading"
              @click="confirmDelete"
            >
              탈퇴 진행
            </v-btn>
          </div>
        </div>
      </v-expand-transition>

      <v-btn
        v-if="!showConfirmation"
        block
        color="#eb6129"
        variant="outlined"
        class="mt-3"
        prepend-icon="mdi-alert"
        @click="handleDeleteMember"
      >
        회원 탈퇴 진행
      </v-btn>
    </v-card-text>

    <!-- 최종 확인 다이얼로그 -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">최종 확인</v-card-title>
        <v-card-text>
          <p class="mb-2">정말로 회원 탈퇴를 진행하시겠습니까?</p>
          <p class="text-caption">이 작업은 되돌릴 수 없으며, 모든 개인 정보가 삭제됩니다.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="dialog = false">취소</v-btn>
          <v-btn color="error" variant="text" :loading="loading" @click="deleteMember"
            >탈퇴하기</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()
const loading = ref(false)
const showConfirmation = ref(false)
const confirmText = ref('')
const dialog = ref(false)

const rules = {
  match: (v) => v === '탈퇴확인' || "정확히 '탈퇴확인'을 입력해주세요",
}

const handleDeleteMember = () => {
  showConfirmation.value = true
}

const cancelDelete = () => {
  showConfirmation.value = false
  confirmText.value = ''
}

const confirmDelete = () => {
  if (confirmText.value === '탈퇴확인') {
    dialog.value = true
  }
}

const deleteMember = async () => {
  try {
    loading.value = true
    // 실제 API 호출 (현재는 주석 처리)
    // await deleteMemberAccount()

    // 성공 시 처리
    toast.success('회원 탈퇴가 완료되었습니다.')
    setTimeout(() => {
      // 로그아웃 처리 및 로그인 페이지로 이동
      router.push('/login')
    }, 1500)
  } catch (error) {
    console.error('회원 탈퇴 중 오류가 발생했습니다:', error)
    toast.error('회원 탈퇴에 실패했습니다. 다시 시도해주세요.')
    dialog.value = false
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.v-alert ul {
  margin-bottom: 0;
}
</style>
