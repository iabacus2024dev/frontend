<template>
  <v-card class="mx-auto pa-8 pt-7 auth-card" max-width="448" elevation="0">
    <v-card-item class="justify-center">
      <h2 class="text-h4 font-weight-bold text-2xl text-uppercase">로그인</h2>
    </v-card-item>

    <v-card-text>
      <h4 class="text-h5 mt-5 mb-1">ABACUS! 👋🏻</h4>
      <p class="mb-0">Please sign-in to your account and start the adventure</p>
    </v-card-text>

    <v-card-text>
      <v-form>
        <!-- 이메일 -->
        <v-text-field
          v-model="form.email"
          type="email"
          label="이메일"
          variant="underlined"
          density="compact"
        />

        <!-- 이메일 -->
        <v-text-field
          v-model="form.password"
          type="password"
          label="비밀번호"
          variant="underlined"
          density="compact"
        />

        <!-- 로그인 버튼 -->
        <v-btn block class="mt-4" type="submit" @click="login">로그인</v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn color="primary" @click="goTo('/auths/register')">회원 등록</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router/index.js'

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const login = () => {
  console.log('login', form.value)
  goTo('/')
}

const goTo = (path) => {
  router.push({ path })
}
</script>

<style scoped></style>
