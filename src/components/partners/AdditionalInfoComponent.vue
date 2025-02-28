<template>
  <v-card class="pt-2 px-2">
    <v-card-item>
      <v-card-title>기타 정보</v-card-title>
    </v-card-item>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea
            v-model="comment"
            label="메모"
            variant="outlined"
            density="compact"
            style="height: 400px; width: 100%"
            dense
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineModel } from 'vue'

const comment = defineModel('comment')
</script>

<style scoped></style>
