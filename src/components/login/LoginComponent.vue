<template>
  <v-card class="mx-auto pa-8 pt-7" max-width="448" elevation="0" rounded="lg">
    <div class="d-flex justify-center">
      <img
        class="me-sm-8 logo-image"
        style="cursor: pointer; height: 30px; object-fit: contain"
        src="@/assets/ABACUS_CI_1.png"
        alt="회사 로고"
      />
    </div>

    <v-card-text class="mt-3">
      <h4 class="text-h5 mt-5 mb-1">로그인 👋🏻</h4>
    </v-card-text>
    <v-alert class="ml-4 mr-4" dense outlined>
      <p class="text-subtitle-2">애버커스에 등록된 구성원만 회원 등록이 가능합니다.</p>
    </v-alert>

    <v-card-text>
      <v-form v-model="isFormValid" @submit.prevent>
        <v-text-field
          v-model="form.username"
          type="email"
          placeholder="회사 이메일"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          density="comfortable"
          :rules="[rules.required, rules.email]"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          placeholder="비밀번호"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          density="comfortable"
          :rules="[rules.required, rules.match]"
          @click:append-inner="visible = !visible"
        />

        <v-btn
          color="#EB6129"
          size="large"
          type="submit"
          rounded="lg"
          block
          @click="handleLogin"
          :disabled="!isFormValid"
        >
          로그인
        </v-btn>
      </v-form>
    </v-card-text>

    <v-row justify="center" class="text-body-2">
      <v-col cols="auto">
        <RouterLink to="/auths/register" class="text-decoration-none text-grey-darken-1">
          회원가입
        </RouterLink>
      </v-col>
      <v-col cols="auto" class="px-2">|</v-col>
      <v-col cols="auto">
        <RouterLink to="/auths/find-password" class="text-decoration-none text-grey-darken-1">
          비밀번호 찾기
        </RouterLink>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { fetchLogin } from '@/apis/authService.js'

const isFormValid = ref(false)
const visible = ref(false)

const form = ref({
  username: '',
  password: '',
})

const rules = ref({
  required: (value) => !!value || '필수 입력 항목입니다.',
  email: (value) => /.+@.+\..+/.test(value) || '이메일 형식이 아닙니다.',
})

const router = useRouter()
const goTo = (path) => {
  router.push({ path })
}

const toast = useToast()
const handleLogin = async () => {
  await fetchLogin(form.value)
  toast.success('로그인에 성공하셨습니다.')
  goTo('/')
}
</script>

<style scoped></style>
