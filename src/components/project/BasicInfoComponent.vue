<template>
  <VCard variant="outlined" border="thin" class="pt-2 px-2 card-responsive">
    <VCardItem>
      <VCardTitle>기본 정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow class="v-row--no-gutters">
        <VCol cols="12" md="6" class="pr-4 pb-3">
          <VTextField v-model="name" label="프로젝트명" variant="outlined" density="compact" />
        </VCol>
        <VCol cols="12" md="6" class="pr-4 pb-3">
          <VTextField v-model="code" label="프로젝트코드" variant="outlined" density="compact" />
        </VCol>
        <VCol cols="12" md="6" class="pr-4 pb-3">
          <VSelect
            v-model="type"
            :items="projectTypeItems"
            label="사업유형"
            variant="outlined"
            density="compact"
          />
        </VCol>
        <VCol cols="12" md="6" class="pr-4 pb-3">
          <VSelect
            v-model="status"
            :items="progressStatusItems"
            label="진행상태"
            variant="outlined"
            density="compact"
          />
        </VCol>
        <VCol cols="12" md="6" class="pr-4 pb-3">
          <VTextField
            v-model="contractDate"
            label="계약일"
            type="date"
            variant="outlined"
            density="compact"
          >
          </VTextField>
        </VCol>
        <VCol cols="12" md="6" class="pr-4 pb-3">
          <VSelect
            v-model="department"
            :items="contractTeamItems"
            label="프로젝트 계약 팀"
            variant="outlined"
            density="compact"
            item-title="name"
            item-value="id"
            return-object
          />
        </VCol>
        <VCol cols="12" md="6" class="pr-4 pb-3">
          <VTextField
            v-model="startDate"
            label="계약시작일자"
            type="date"
            variant="outlined"
            density="compact"
          >
          </VTextField>
        </VCol>
        <VCol cols="12" md="6" class="pr-4 pb-3">
          <VTextField
            v-model="endDate"
            label="계약종료일자"
            type="date"
            variant="outlined"
            density="compact"
          >
          </VTextField>
        </VCol>
        <VCol cols="12" md="6" class="pr-4">
          <VTextField v-model="pmName" label="PM" variant="outlined" density="compact" />
        </VCol>
        <VCol cols="12" md="6" class="pr-4">
          <VTextField v-model="pmPhone" label="PM 연락처" variant="outlined" density="compact" />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel, ref, watch } from 'vue'
import { getTeamList } from '@/apis/teamService.js' // 추후 팀 목록은 받아와서 추가해야함



// 추후 팀 목록은 받아와서 추가해야함
const projectTypeItems = ['SI', 'SM']
const contractTeamItems = ref([
  {
    id: Number,
    name: String,
  },
])

const status = defineModel('status')
const code = defineModel('code')
const type = defineModel('type')
const name = defineModel('name')
const department = defineModel('department')
const pmName = defineModel('pmName')
const pmPhone = defineModel('pmPhone')
const contractDate = defineModel('contractDate')
const startDate = defineModel('startDate')
const endDate = defineModel('endDate')

const progressStatusItems = ['예약', '진행중', '완료']

const statusMap = {
  IN_PROGRESS: '진행중',
  RESERVED: '예약',
  COMPLETED: '완료',
}

/* 상태 영한 변환 (ex: IN_PROGRESS -> 진행중) */
watch(
  () => status.value,
  (newVal) => {
    if (newVal) {
      status.value = statusMap[newVal] || newVal // 한글로 변환
    }
  },
)

const fetchGetTeams = async () => {
  contractTeamItems.value = await getTeamList()
}
fetchGetTeams()
</script>

<style scoped>
/* 기본적으로 카드의 높이는 auto로 설정하여 내용에 맞게 자동 조절 */
.card-responsive {
  height: 95%;
}
</style>
