<template>
  <VCard class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>계약 정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow class="gap-4">
        <VCol cols="12" md="6">
          <VSelect
            v-model="commissionRate"
            :items="commissionRateItems"
            label="수수료율 (%)"
            variant="outlined"
            density="compact"
            :disabled="isReadOnly"
          />
        </VCol>
        <VCol v-if="isCustomRate" cols="12" md="6">
          <VTextField
            v-model="customCommissionRate"
            label="직접 입력 (수수료율 %)"
            variant="outlined"
            density="compact"
            @blur="updateCommissionRate"
            @keyup.enter="updateCommissionRate"
          />
        </VCol>
        <VCol cols="12" md="12">
          <VSelect
            v-model="grade"
            :items="evaluationGradeItems"
            label="평가등급"
            variant="outlined"
            density="compact"
            :disabled="isReadOnly"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { computed, ref, watch, defineProps } from 'vue'

const props = defineProps({
  isReadOnly: Boolean,
})

const evaluationGradeItems = ['A', 'B', 'C', 'D', 'E']
const commissionRateItems = ['5.00', '10.00', '15.00', '20.00', '직접입력']

const grade = defineModel('grade')
const commissionRate = defineModel('commissionRate')

const customCommissionRate = ref('')

const isCustomRate = computed(() => commissionRate.value === '직접입력')

const updateCommissionRate = () => {
  if (isCustomRate.value && customCommissionRate.value) {
    commissionRate.value = customCommissionRate.value
  }
}

watch(commissionRate, (newValue) => {
  if (newValue !== '직접입력') {
    customCommissionRate.value = ''
  }
})
</script>

<style scoped></style>
