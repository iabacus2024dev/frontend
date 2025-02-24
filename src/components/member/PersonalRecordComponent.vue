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
              item-text="label"
              item-value="value"
            />
          </VRow>
        </VCol>
        <VCol cols="9" class="mt-3">
          <VRow>
            <VSelect
              v-model="rank"
              label="직급"
              variant="outlined"
              density="compact"
              :items="rankOptions"
              item-text="label"
              item-value="value"
            />
          </VRow>
        </VCol>
        <VCol cols="9" class="mt-3">
          <VRow>
            <VSelect
              v-model="grade"
              label="등급"
              variant="outlined"
              density="compact"
              :items="gradeOptions"
              item-text="label"
              item-value="value"
            />
          </VRow>
        </VCol>
        <VCol cols="9" class="mt-3">
          <VRow>
            <VSelect
              v-model="team"
              label="소속팀"
              variant="outlined"
              density="compact"
              :items="teamOptions"
              item-text="label"
              item-value="value"
            />
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel } from 'vue'

const type = defineModel('type')
const rank = defineModel('rank')
const grade = defineModel('grade')
const team = defineModel('team')

const typeOptions = ['전체', '정규직', '반프리', '프리랜서', '외주']
const rankOptions = ['전체', '사장', '이사', '책임', '선임', '사원']
const gradeOptions = ['전체', '초급', '중급', '고급', '특급']
const teamOptions = ['가입정보팀', '영업정보팀', '고객정보팀', 'CRM팀', '빌링시스템']
</script>

<style scoped>
.small-card {
  max-width: 600px;
  margin: auto;
}
</style>
