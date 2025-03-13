<template>
  <v-card class="pt-2 px-2" border="thin" variant="outlined">
    <v-card-item>
      <v-card-title>계약 정보</v-card-title>
    </v-card-item>
    <v-card-text>
      <v-row class="gap-4">
        <v-col cols="12" md="6">
          <v-select
            v-model="commissionRate"
            :items="commissionRateItems"
            label="수수료율 (%)"
            variant="outlined"
            density="compact"
          />
        </v-col>

        <v-col v-if="isCustomRate" cols="12" md="6">
          <v-text-field
            v-model="customCommissionRate"
            label="직접 입력 (수수료율 %)"
            variant="outlined"
            density="compact"
            @blur="updateCommissionRate"
            @keyup.enter="updateCommissionRate"
          />
        </v-col>

        <v-col cols="12" md="12">
          <v-select
            v-model="grade"
            :items="evaluationGradeItems"
            label="평가등급"
            variant="outlined"
            density="compact"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

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
