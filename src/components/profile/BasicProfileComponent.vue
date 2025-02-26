<template>
  <v-card border="thin" class="mt-4 pa-4" variant="outlined">
    <v-card-title class="text-h5 font-weight-bold">{{ user.name }} </v-card-title>
    <v-divider></v-divider>
    <v-card-item>
      <v-text-field
        label="팀"
        v-model="user.team"
        density="compact"
        variant="underlined"
        prepend-icon="mdi-account-group"
        class="mt-3"
        dense
        readonly
      ></v-text-field>
      <v-text-field
        label="이메일"
        v-model="user.email"
        density="compact"
        variant="underlined"
        prepend-icon="mdi-email-outline"
        dense
        readonly
      ></v-text-field>
      <v-text-field
        label="핸드폰 번호"
        v-model="user.phone"
        density="compact"
        variant="underlined"
        prepend-icon="mdi-phone"
        dense
        readonly
      ></v-text-field>
      <v-date-input
        label="생년월일"
        v-model="user.birthDate"
        density="compact"
        variant="underlined"
        prepend-icon="mdi-calendar"
        dense
        readonly
      ></v-date-input>
      <v-date-input
        label="입사일"
        v-model="user.joinDate"
        density="compact"
        variant="underlined"
        dense
        readonly
      ></v-date-input>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  name: '박상철',
  team: '고객정보팀',
  email: 'tkdcjf38@iabacus.co.kr',
  role: '모든 구성원',
  status: 'Active',
  phone: '010-1234-5678',
  birthDate: '1998-01-01',
  joinDate: '2021-01-01',
})
</script>

<style scoped></style>
