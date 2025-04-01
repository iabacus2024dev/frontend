<template>
  <VCard variant="outlined" class="mt-3 pt-2 px-2">
    <VCardItem>
      <VCardTitle>인사정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow>
        <VCol cols="9" class="mt-3">
          <VRow>
            <VSelect
              v-model="type"
              label="직원유형"
              variant="outlined"
              density="compact"
              :items="typeOptions"
              item-title="label"
              item-value="value"
            />
          </VRow>
        </VCol>
        <VCol cols="9" class="mt-10">
          <VRow>
            <VSelect
              v-model="rank"
              label="직급"
              variant="outlined"
              density="compact"
              :items="rankOptions"
              item-title="label"
              item-value="value"
            />
          </VRow>
        </VCol>
        <VCol cols="9" class="mt-10">
          <VRow>
            <VSelect
              v-model="grade"
              label="등급"
              variant="outlined"
              density="compact"
              :items="gradeOptions"
            />
          </VRow>
        </VCol>
        <VCol cols="9" class="mt-10">
          <VRow>
            <VSelect
              v-model="department"
              label="소속팀"
              variant="outlined"
              density="compact"
              :items="teamOptions"
              item-title="label"
              item-value="value"
            />
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel, ref } from 'vue'
import { getDepartments } from '@/apis/teamService.js'

const type = defineModel('type')
const rank = defineModel('rank')
const grade = defineModel('grade')
const department = defineModel('department')

const typeOptions = ref(['정직원', '프리랜서', '외주'])
const rankOptions = ref([
  '사원',
  '선임',
  '책임',
  '팀장',
  '수석',
  '이사',
  '기술이사',
  '상무',
  '부사장',
  '사장',
])
const gradeOptions = ref(['초급', '중급', '고급', '특급'])
const teamOptions = ref([])

const fetchGetDepartments = async () => {
  teamOptions.value = await getDepartments()
}
fetchGetDepartments()
</script>

<style scoped>
.small-card {
  max-width: 600px;
  margin: auto;
}
</style>
