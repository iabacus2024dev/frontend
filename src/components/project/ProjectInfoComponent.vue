<template>
<VCard
  variant="outlined"
  class="pt-3 px-3"
>
  <VCardItem>
    <VCardTitle>프로젝트 정보</VCardTitle>
  </VCardItem>
  <VCardText>
    <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        v-model="projectName"
        label="프로젝트명"
        variant="outlined"
        density="compact"/>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        v-model="projectName"
        label="프로젝트명"
        variant="outlined"
        density="compact"/>
    </VCol>
  </VRow>
  </VCardText>
</VCard>
</template>

<script setup>
</script>

<style scoped>


</style>
