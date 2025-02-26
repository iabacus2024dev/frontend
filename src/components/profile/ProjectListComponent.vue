<template>
  <v-card border="thin" class="mt-4 pa-4" variant="outlined" max-width="1200">
    <v-card-title class="font-weight-bold text-h5 text-left">내 프로젝트 목록</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col v-for="project in projects" :key="project.name" cols="12" md="6" lg="4">
          <v-card class="mb-3" outlined>
            <v-card-title class="text-sm-body-1">{{ project.name }}</v-card-title>
            <v-card-text>
              <v-chip color="primary">{{ project.type }}</v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  { name: '(주)엘지유플러스_통신 MNO/MVNO', type: 'SI' },
  { name: 'Falcon Logo Design', type: 'SM' },
  { name: 'Dashboard Design', type: 'SI' },
  { name: 'Foodista Mobile App', type: 'SM' },
  { name: 'Dojo Email App', type: 'SM' },
  { name: 'Blockchain Website', type: 'SI' },
])
</script>

<style scoped></style>
