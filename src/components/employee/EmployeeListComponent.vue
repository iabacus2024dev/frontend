<template>
    <VCard variant="outlined">
      <VCardItem>
        <VRow no-gutters>
          <VCol cols="12" md="6" class="pl-0 pa-2">
            <VSelect
              v-model="contractNumber"
              :items="contractNumberItems"
              label="계약 번호"
              variant="outlined"
              density="compact"
              hide-details="auto"
              style="width: 100%;"
            />
          </VCol>
          <VCol cols="auto" class="pt-1 ml-auto">
            <v-btn
              variant="tonal"
              density="compact"
              class="btn-color"
              @click="handleSearchClick"
            >
              검색
            </v-btn>
          </VCol>
        </VRow>
      </VCardItem>
      <VCardText class="pt-0">
        <VRow>
          <VCol cols="12" md="3" class="pr-2">
            <VTextField
              v-model="startDate"
              label="계약 시작 일자"
              type="date"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />
          </VCol>
          <VCol cols="12" md="3" class="pr-2">
            <VTextField
              v-model="endDate"
              label="계약 종료 일자"
              type="date"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />
          </VCol>
          <VCol cols="12" md="2">
            <VTextField
              v-model="contractType"
              label="계약 유형"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />
          </VCol>
          <VCol cols="12" md="2">
            <VTextField
              v-model="totalMM"
              label="투입 M/M"
              variant="outlined"
              density="compact"
              readonly
              hide-details="auto"
            />
          </VCol>
          <VCol cols="12" md="2">
            <VTextField
              v-model="totalMembers"
              label="투입 인원 수"
              variant="outlined"
              density="compact"
              readonly
              hide-details="auto"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  
  // 데이터
  const contractNumber = ref(null);
  const contractNumberItems = ref(['P000123485-1', 'P000123485-2', 'P000123485-3']); // 예시
  const startDate = ref('2024-02-15');
  const endDate = ref('2024-05-15');
  const contractType = ref('최초 계약');
  const totalMM = ref('6.64');
  const totalMembers = ref(3);
  
  
  // 메서드
  const handleSearchClick = () => {
    console.log("검색 버튼 클릭");
  };
  
  
  </script>
  
  <style scoped>
  .btns-container {
    display: flex;
    justify-content: end;
  }
  
  .btn-color {
    background-color: #eb6129;
    color: white;
  }
  </style>
