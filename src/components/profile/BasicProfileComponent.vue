<template>
  <v-card border="md" class="mt-4 pa-4" variant="outlined">
    <v-card-title class="text-h5 font-weight-bold">{{ user.name }} </v-card-title>
    <v-divider></v-divider>
    <v-card-item>
      <v-text-field
        label="팀"
        v-model="user.teamName"
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
import { getMyEmployeeDetail } from '@/apis/employeeService.js'

const user = ref({})

const getProfile = async () => {
  user.value = await getMyEmployeeDetail()
}
getProfile()
</script>

<style scoped></style>
