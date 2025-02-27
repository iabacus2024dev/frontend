<script setup>
import {ref} from "vue";

const form = ref(false);
const email = ref(null);
const loading = ref(false);
const password = ref(null);
const visible = ref(false);

const onSubmit = () => {
  console.log("submit")
  if (!this.form) {
    return;
  }

  this.loading = true;
  setTimeout(() => {
    this.loading = false
  }, 2000);
}
const required = (v) => {
  return !!v || '입력값이 비었습니다';
}
</script>

<template>
  <v-sheet class="d-flex align-center justify-center" height="70vh">
    <v-card class="px-6 py-8" elevation="0" width="380">
      <div class="d-flex justify-center mb-5">
        <v-img
          max-width="200"
          src="https://ezportal.bizmeka.com/companyImage/T31366/T31366_100_69bd36e2ee32422087c5d4203224b81a.png"
        />
      </div>
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >

        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          label="이메일"
          class="mb-2"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          hide-details="auto"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          clearable
          clearable-icon="mdi-close"
          hide-details="auto"
        ></v-text-field>

        <br>

        <v-btn
          :loading="loading"
          color="#EB6129"
          size="large"
          type="submit"
          variant="elevated"
          rounded="lg"
          block
        >
          로그인
        </v-btn>
      </v-form>
      <v-row justify="center" class="mt-2 text-body-2">
        <v-col cols="auto">
          <a href="/register" class="text-decoration-none text-grey-darken-1">회원가입</a>
        </v-col>
        <v-col cols="auto" class="px-2">|</v-col>
        <v-col cols="auto">
          <a href="/password-reset" class="text-decoration-none text-grey-darken-1">비밀번호 찾기</a>
        </v-col>
      </v-row>
    </v-card>
  </v-sheet>
</template>

<style scoped>

</style>
