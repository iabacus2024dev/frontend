<template>
  <VCard variant="outlined" class="mb-3 pt-2 px-2 small-card">
    <VCardItem>
      <VCardTitle>비고</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow no-gutters="0">
        <VCol cols="12" class="mt-3">
          <VRow>
            <VTextarea v-model="comment" label="메모" variant="outlined" dense rows="5" />
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineModel } from 'vue'
const comment = defineModel('comment')
</script>
<style scoped>
.small-card {
  max-width: 600px;
  margin: auto;
}
</style>
