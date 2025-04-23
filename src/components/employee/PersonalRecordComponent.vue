<template>
  <VCard variant="outlined" border="thin" class="mt-3 pt-2 px-2" min-width="400">
    <VCardItem>
      <VCardTitle>인사정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VSelect
        v-model="type"
        variant="outlined"
        density="compact"
        :items="typeOptions"
        item-title="label"
        item-value="value"
        :rules="getRules('type')"
      >
        <template v-slot:label> 직원유형 <span class="required-field">*</span> </template>
      </VSelect>
      <VSelect
        v-model="rank"
        variant="outlined"
        density="compact"
        :items="rankOptions"
        item-title="label"
        item-value="value"
        :rules="getRules('rank')"
      >
        <template v-slot:label> 직급 <span class="required-field">*</span> </template>
      </VSelect>
      <VSelect
        v-model="grade"
        variant="outlined"
        density="compact"
        :items="gradeOptions"
        :rules="getRules('grade')"
      >
        <template v-slot:label> 등급 <span class="required-field">*</span> </template>
      </VSelect>
      <VSelect
        v-model="department"
        variant="outlined"
        density="compact"
        :items="teamOptions"
        item-title="name"
        item-value="id"
        return-object
        :rules="[requiredRule]"
      >
        <template v-slot:label> 소속팀 <span class="required-field">*</span> </template>
      </VSelect>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel, defineProps, onMounted, ref } from 'vue'
import { getDepartments } from '@/apis/teamService.js'

const type = defineModel('type')
const rank = defineModel('rank')
const grade = defineModel('grade')
const department = defineModel('department')

const props = defineProps({
  rules: {
    type: Object,
    default: () => ({}),
  },
})

// 필수 입력 규칙: 값이 없으면 에러 메시지 출력
const requiredRule = (value) => !!value || '필수 입력 항목입니다.'

// 필드별 규칙 가져오기
const getRules = (field) => {
  return props.rules && props.rules[field] ? props.rules[field] : [requiredRule]
}

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

onMounted(async () => {
  await fetchGetDepartments()
})
</script>

<style scoped>
.small-card {
  max-width: 600px;
  margin: auto;
}

.required-field {
  color: red;
}
</style>
