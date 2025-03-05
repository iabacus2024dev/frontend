<template>
    <VRow>
      <VCol cols="12" md="12">
        <VCard variant="outlined" class="pt-2 px-2">
          <VCardItem>
              <VCardTitle>계약 정보</VCardTitle>
            </VCardItem>
          <VCardText>
              <VRow no-gutters="0">
                <VCol cols="12"  class="pr-2">
                  <VTextField
                    v-model="contractId"
                    label="계약번호"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
                <VCol cols="12"  class="pr-2">
                  <VTextField
                    v-model="contractType"
                    label="계약유형"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
              </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
</template>
<script>

</script>