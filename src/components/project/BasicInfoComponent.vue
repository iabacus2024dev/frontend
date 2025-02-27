<template>
  <VCard variant="outlined" class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>기본 정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow class="v-row--no-gutters">
        <VCol cols="12" md="6" class="pr-4">
          <VTextField
            v-model="basicInfoData.projectCode"
            label="프로젝트코드"
            variant="outlined"
            density="compact"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VSelect
            v-model="basicInfoData.projectType"
            :items="projectTypeItems"
            label="사업유형"
            variant="outlined"
            density="compact"
          />
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="basicInfoData.projectName"
            label="프로젝트명"
            variant="outlined"
            density="compact"
          />
        </VCol>
        <VCol cols="12" md="4" class="pr-2">
          <VSelect
            v-model="basicInfoData.contractTeam"
            :items="contractTeamItems"
            label="계약팀"
            variant="outlined"
            density="compact"
          />
        </VCol>
        <VCol cols="12" md="4" class="pr-2">
          <VTextField
            v-model="basicInfoData.mainRep"
            label="PM"
            variant="outlined"
            density="compact"
          />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField
            v-model="basicInfoData.mainRepPhone"
            label="전화번호"
            variant="outlined"
            density="compact"
          />
        </VCol>
        <VCol cols="12" md="4" class="pr-2">
          <VTextField
            v-model="basicInfoData.contractDate"
            label="계약일"
            type="date"
            variant="outlined"
            density="compact"
          >
          </VTextField>
        </VCol>
        <VCol cols="12" md="4" class="pr-2">
          <VTextField
            v-model="basicInfoData.contractStartDate"
            label="계약시작일자"
            type="date"
            variant="outlined"
            density="compact"
          >
          </VTextField>
        </VCol>
        <VCol cols="12" md="4" class="pr-2">
          <VTextField
            v-model="basicInfoData.contractEndDate"
            label="계약종료일자"
            type="date"
            variant="outlined"
            density="compact"
          >
          </VTextField>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel } from 'vue'

// 추후 팀 목록은 받아와서 추가해야함
const projectTypeItems = ['SI', 'SM']
const contractTeamItems = ['융합데이터분석팀', 'CRM팀']

const basicInfoData = defineModel()
</script>

<style scoped></style>
