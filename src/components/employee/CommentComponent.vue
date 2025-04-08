<template>
  <VCard variant="outlined" border="thin" class="mt-3 pt-2 px-2">
    <VCardItem>
      <VCardTitle>비고</VCardTitle>
    </VCardItem>
    <VCardText>
      <VTextarea v-model="comment" label="메모" variant="outlined" dense rows="8" />
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
