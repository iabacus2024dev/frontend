<template>
  <v-card border="thin" class="pa-4" variant="outlined">
    <v-card-title class="font-weight-bold text-h5 text-left">내 프로젝트 목록</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div v-if="loading" class="d-flex justify-center align-center pa-4">
        <v-progress-circular indeterminate color="#eb6129"></v-progress-circular>
      </div>
      <div v-else-if="projects.length === 0" class="text-center pa-4">
        <v-icon size="64" color="grey lighten-1">mdi-folder-open-outline</v-icon>
        <div class="text-subtitle-1 mt-2 text-grey">참여 중인 프로젝트가 없습니다.</div>
      </div>
      <v-row v-else>
        <v-col v-for="project in projects" :key="project.id" cols="12" md="6" lg="4">
          <v-card class="project mb-3" variant="outlined" border="thin">
            <v-card-item>
              <template v-slot:prepend>
                <v-avatar color="#eb6129" variant="outlined" border="thin" class="mr-3">
                  <v-icon>{{ getProjectIcon(project.type) }}</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-truncate">{{ project.name }}</v-card-title>
              <v-card-subtitle class="text-truncate">{{ project.code }}</v-card-subtitle>
            </v-card-item>
            <v-divider></v-divider>
            <v-card-text>
              <div class="d-flex align-center mb-2">
                <v-icon size="small" class="mr-1">mdi-office-building</v-icon>
                <span class="text-caption text-truncate">{{
                  project.clientCompany || '정보 없음'
                }}</span>
              </div>
              <div class="d-flex align-center mb-2">
                <v-icon size="small" class="mr-1">mdi-calendar-range</v-icon>
                <span class="text-caption">{{
                  formatDateRange(project.startDate, project.endDate)
                }}</span>
              </div>
              <div class="d-flex align-center">
                <v-icon size="small" class="mr-1">mdi-currency-usd</v-icon>
                <span class="text-caption">{{ formatAmount(project.contractAmount) }}</span>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-chip :color="getStatusColor(project.status)" size="small" class="text-caption">
                {{ project.status }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-chip :color="getTypeColor(project.type)" size="small" class="text-caption">
                {{ project.type }}
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getMyProjects } from '@/apis/projectService.js'
import { formatCurrency, formatWithUnit } from '@/utils/MoneyUtils.js'

const projects = ref([])
const loading = ref(true)

const getProjects = async () => {
  try {
    loading.value = true
    const response = await getMyProjects()
    projects.value = response.content || []
  } catch (error) {
    console.error('프로젝트 목록을 불러오는 중 오류가 발생했습니다:', error)
  } finally {
    loading.value = false
  }
}

const getProjectIcon = (type) => {
  return type === 'SI' ? 'mdi-laptop' : 'mdi-cog-outline'
}

const getStatusColor = (status) => {
  switch (status) {
    case '예약':
      return 'blue'
    case '진행중':
      return 'green'
    case '완료':
      return 'grey'
    default:
      return '#eb6129'
  }
}

const getTypeColor = (type) => {
  return type === 'SI' ? 'indigo' : 'deep-purple'
}

const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return '기간 정보 없음'
  return `${startDate} ~ ${endDate}`
}

// Use the formatWithUnit function from MoneyUtils.js
const formatAmount = (amount) => {
  return formatWithUnit(amount)
}

onMounted(() => {
  getProjects()
})
</script>

<style scoped>
.project:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}
</style>
