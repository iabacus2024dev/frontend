<template>
  <VCard variant="outlined" border="thin" class="pa-6" min-width="800">
    <VCardItem>
      <VCardTitle>기본 정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow>
        <VCol>
          <VTextField v-model="name" variant="outlined" density="compact" :rules="[requiredRule]">
            <template v-slot:label>
              프로젝트명 <span class="required-field">*</span>
            </template>
          </VTextField>
          <VSelect
            v-model="type"
            :items="projectTypeItems"
            variant="outlined"
            density="compact"
            :rules="[requiredRule]"
          >
            <template v-slot:label>
              사업유형 <span class="required-field">*</span>
            </template>
          </VSelect>
          <VTextField
            v-model="contractDate"
            type="date"
            variant="outlined"
            density="compact"
            :rules="[requiredRule]"
          >
            <template v-slot:label>
              계약일 <span class="required-field">*</span>
            </template>
          </VTextField>
          <VTextField
            v-model="startDate"
            label="계약시작일자"
            type="date"
            variant="outlined"
            density="compact"
          />
          <VTextField v-model="pmName" label="PM" variant="outlined" density="compact" />
        </VCol>
        <VCol>
          <VTextField v-model="code" variant="outlined" density="compact" :rules="[requiredRule]">
            <template v-slot:label>
              프로젝트코드 <span class="required-field">*</span>
            </template>
          </VTextField>
          <VSelect
            v-model="status"
            :items="progressStatusItems"
            label="진행상태"
            variant="outlined"
            density="compact"
          />
          <VSelect
            v-model="department"
            :items="contractTeamItems"
            variant="outlined"
            density="compact"
            item-title="name"
            item-value="id"
            return-object
            :rules="[requiredRule]"
          >
            <template v-slot:label>
              프로젝트 계약 팀 <span class="required-field">*</span>
            </template>
          </VSelect>
          <VTextField
            v-model="endDate"
            label="계약종료일자"
            type="date"
            variant="outlined"
            density="compact"
          >
          </VTextField>
          <VTextField
            :model-value="formattedPmPhone"
            @input="handlePhoneInput"
            label="PM 연락처"
            variant="outlined"
            density="compact"
            :rules="[phoneRule]"
          ></VTextField>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel, ref, watch } from 'vue'
import { getTeamList } from '@/apis/teamService.js' // 추후 팀 목록은 받아와서 추가해야함
import {
  formatPhoneNumberInput,
  isValidPhoneNumber,
  standardizePhoneNumber,
} from '@/utils/PhoneUtils.js'

// 추후 팀 목록은 받아와서 추가해야함
const projectTypeItems = ['SI', 'SM']
const contractTeamItems = ref([
  {
    title: String,
    value: Number,
  },
])

const status = defineModel('status')
const code = defineModel('code')
const type = defineModel('type')
const name = defineModel('name')
const department = defineModel('department')
const pmName = defineModel('pmName')
const pmPhone = defineModel('pmPhone')

// Formatted display value for phone
const formattedPmPhone = ref('')

// Format the phone value when it changes
watch(
  pmPhone,
  (newValue) => {
    if (newValue) {
      formattedPmPhone.value = formatPhoneNumberInput(newValue)
    }
  },
  { immediate: true },
)

// Handle phone input changes
const handlePhoneInput = (event) => {
  const inputValue = event.target.value
  const standardized = standardizePhoneNumber(inputValue)
  pmPhone.value = standardized
  formattedPmPhone.value = formatPhoneNumberInput(standardized)
}

// 필수 입력 규칙: 값이 없으면 에러 메시지 출력
const requiredRule = (value) => !!value || '필수 입력 항목입니다.'

// 전화번호 유효성 검사 규칙
const phoneRule = (value) =>
  !value || isValidPhoneNumber(value) || '유효한 전화번호를 입력해주세요.'
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

.required-field {
  color: red;
}
</style>
