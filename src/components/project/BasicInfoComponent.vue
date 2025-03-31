<template>
  <VCard variant="outlined" border="thin" class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>기본 정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow class="v-row--no-gutters">
        <VCol cols="12" md="6" class="pr-4">
          <VTextField v-model="code" label="프로젝트코드" variant="outlined" density="compact" />
        </VCol>
        <VCol cols="12" md="6">
          <VSelect
            v-model="type"
            :items="projectTypeItems"
            label="사업유형"
            variant="outlined"
            density="compact"
          />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="name" label="프로젝트명" variant="outlined" density="compact" />
        </VCol>
        <VCol cols="12" md="4" class="pr-2">
          <VSelect
            v-model="ownerTeamId"
            :items="contractTeamItems"
            :model-value="ownerTeamName"
            item-title="name"
            item-value="id"
            label="계약팀"
            variant="outlined"
            density="compact"
          />
        </VCol>
        <VCol cols="12" md="4" class="pr-2">
          <VTextField v-model="pmName" label="PM" variant="outlined" density="compact" />
        </VCol>
        <VCol cols="12" md="4">
          <VTextField v-model="pmPhone" label="전화번호" variant="outlined" density="compact" />
        </VCol>
        <VCol cols="12" md="4" class="pr-2">
          <VTextField
            v-model="contractDate"
            label="계약일"
            type="date"
            variant="outlined"
            density="compact"
          >
          </VTextField>
        </VCol>
        <VCol cols="12" md="4" class="pr-2">
          <VTextField
            v-model="startDate"
            label="계약시작일자"
            type="date"
            variant="outlined"
            density="compact"
          >
          </VTextField>
        </VCol>
        <VCol cols="12" md="4" class="pr-2">
          <VTextField
            v-model="endDate"
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
import { defineModel, ref } from 'vue'
import { getTeamList } from '@/apis/teamService.js' // 추후 팀 목록은 받아와서 추가해야함

// 추후 팀 목록은 받아와서 추가해야함
const projectTypeItems = ['SI', 'SM']
const contractTeamItems = ref([
  {
    id: Number,
    name: String,
  },
])

const code = defineModel('code')
const type = defineModel('type')
const name = defineModel('name')
const ownerTeamId = defineModel('ownerTeamId')
const ownerTeamName = defineModel('ownerTeamName')
const pmName = defineModel('pmName')
const pmPhone = defineModel('pmPhone')
const contractDate = defineModel('contractDate')
const startDate = defineModel('startDate')
const endDate = defineModel('endDate')

const fetchGetTeams = async () => {
  contractTeamItems.value = await getTeamList()
}
fetchGetTeams()
</script>

<style scoped></style>
