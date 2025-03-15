<template>
  <v-card border="md" class="mt-4 pa-4" variant="outlined">
    <v-card-title class="font-weight-bold text-h5 text-left">내 권한 목록</v-card-title>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="authority in authorities" :key="authority.name">
        <template #prepend>
          <v-avatar size="x-small">
            <v-icon color="green" icon="mdi-circle-outline" />
          </v-avatar>
        </template>

        <template #title>
          <div class="mt-0 pt-0">
            <div class="text-truncate">{{ authority.name }}</div>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAthorities } from '@/apis/roleService'

const authorities = ref([])

const fetchGetAuthorities = async () => {
  authorities.value = await getAthorities()
}
onMounted(() => {
  fetchGetAuthorities()
})
</script>

<style scoped></style>
