<template>
<VCard
  variant="outlined"
  class="pt-2 px-2"
>
  <VCardItem>
    <VCardTitle>프로젝트 정보</VCardTitle>
  </VCardItem>
  <VCardText>
    <VRow no-gutters="0">
      <VCol
        cols="12"
        md="6"
        class="pr-2"
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
         class="pl-2"
      >
        <VTextField
          v-model="projectCode"
          label="프로젝트코드"
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
