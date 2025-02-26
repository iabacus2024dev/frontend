<template>
  <VCard class="pt-2 px-2">
    <VCardItem>
      <VCardTitle>기타 정보</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow>
        <VCol cols="12" md="12">
          <VTextarea
            v-model="comment"
            label="메모"
            variant="outlined"
            density="compact"
            style="height: 400px; width: 100%"
            dense
            :disabled="isReadOnly"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineProps, defineModel } from 'vue'

const props = defineProps({
  isReadOnly: Boolean,
})

const comment = defineModel('comment')
</script>

<style scoped></style>
