<template>
<VCard
  variant="outlined"
  class="pt-3 px-3"
>
  <VCardItem>
    <VCardTitle>계약 정보</VCardTitle>
  </VCardItem>
  <VCardText>
    <VRow>
    <VCol
      cols="12"
      md="12"
    >
      <VTextField
        v-model="contractCode"
        label="계약코드"
        variant="outlined"
        density="compact"/>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VDateInput
        label="계약시작일자"
        variant="outlined"
        density="compact">
      </VDateInput>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VDateInput
        label="계약종료일자"
        variant="outlined"
        density="compact">
      </VDateInput>
    </VCol>
  </VRow>
  </VCardText>
</VCard>
</template>

<script setup>

</script>

<style scoped>
</style>
