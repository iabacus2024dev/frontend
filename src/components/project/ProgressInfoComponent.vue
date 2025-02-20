<template>
<VCard
  variant="outlined"
  class="pt-3 px-3"
>
  <VCardItem>
    <VCardTitle>진행 정보</VCardTitle>
  </VCardItem>
  <VCardText>
    <VRow>
    <VCol
      cols="12"
      md="12"
    >
      <VSelect
        v-model="progressStatus"
        :items="progressStatusItems"
        label="진행상태"
        variant="outlined"
        density="compact"/>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VDateInput
        label="투입시작일자"
        variant="outlined"
        density="compact">
      </VDateInput>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VDateInput
        label="투입종료일자"
        variant="outlined"
        density="compact">
      </VDateInput>
    </VCol>
  </VRow>
  </VCardText>
</VCard>
</template>

<script setup>
const progressStatusItems = ['예약', "진행중", "완료"];
</script>

<style scoped>
</style>
