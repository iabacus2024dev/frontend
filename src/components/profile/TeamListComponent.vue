<template>
  <v-card border="md" class="mt-4 pa-4" variant="outlined">
    <v-card-title class="font-weight-bold text-h5 text-left">내 휴가</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col v-for="team in teams" :key="team.name" cols="12" md="6" lg="4">
          <v-card class="mb-3" outlined> </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const teams = ref([])
</script>

<style scoped></style>
