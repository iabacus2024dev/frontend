<template>
    <VRow>
      <VCol cols="12" md="12">
        <VCard variant="outlined" class="pt-2 px-2">
          <VCardItem>
              <VCardTitle>프로젝트 정보</VCardTitle>
            </VCardItem>
          <VCardText>
              <VRow no-gutters="0">
                <VCol cols="12"  class="pr-2">
                  <VTextField
                    v-model="projectcode"
                    label="프로젝트코드"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
                <VCol cols="12"  class="pr-2">
                  <VTextField
                    v-model="projectname"
                    label="프로젝트명"
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