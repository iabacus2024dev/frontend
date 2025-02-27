<template>
  <VCard variant="outlined" class="mt-3 pt-2 px-2 small-card">
    <VCardItem>
      <VCardTitle>인사정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow no-gutters="0">
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
              item-title="label"
              item-value="value"
            />
          </VRow>
        </VCol>
        <VCol cols="9" class="mt-10">
          <VRow>
            <VSelect
              v-model="team"
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
import { defineModel, ref, onMounted } from 'vue'
import { getTypeList, getRankList, getGradeList } from '@/apis/classificationService'
import { getTeamList } from '@/apis/teamService'

const type = defineModel('type')
const rank = defineModel('rank')
const grade = defineModel('grade')
const team = defineModel('team')

const typeOptions = ref([])
const rankOptions = ref([])
const gradeOptions = ref([])
const teamOptions = ref([])

onMounted(async () => {
  try {
    const fetchedTypeOptions = await getTypeList()
    typeOptions.value = fetchedTypeOptions.map((item) => ({ label: item, value: item }))

    const fetchedRankOptions = await getRankList()
    rankOptions.value = fetchedRankOptions.map((item) => ({ label: item, value: item }))

    const fetchedGradeOptions = await getGradeList()
    gradeOptions.value = fetchedGradeOptions.map((item) => ({ label: item, value: item }))

    const fetchedTeamOptions = await getTeamList()
    teamOptions.value = fetchedTeamOptions.map((item) => ({ label: item, value: item }))
  } catch (error) {
    console.error('옵션 목록 가져오기 실패:', error)
  }
})
</script>

<style scoped>
.small-card {
  max-width: 600px;
  margin: auto;
}
</style>
