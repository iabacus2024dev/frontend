<template>
  <v-card border="md" class="mt-4 pa-4" variant="outlined">
    <v-card-title class="text-h5 font-weight-bold">회원 삭제</v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle class="mt-5">회원을 삭제하면 로그인 정보가 삭제됩니다.</v-card-subtitle>
    <v-card-text>
      <v-btn block color="#EB6129" variant="outlined" @click="handleDeleteMember">회원 삭제</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()

const handleDeleteMember = () => {
  console.log('handleDeleteMember')
}
</script>

<style scoped></style>
