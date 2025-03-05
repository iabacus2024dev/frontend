<template>
    <VRow>
      <VCol cols="12" md="12">
        <VCard variant="outlined" class="pt-2 px-2">
          <VCardItem>
              <VCardTitle>인원 정보</VCardTitle>
            </VCardItem>
          <VCardText>
              <VRow no-gutters="0">
                <VCol cols="6"  class="pr-4">
                  <VTextField
                    v-model="projectcode"
                    label="계약시작일자"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
                <VCol cols="6"  class="pl-4 pr-2">
                  <VTextField
                    v-model="projectname"
                    label="계약종료일자"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
                <VCol cols="6"  class="pr-4">
                  <VTextField
                    v-model="projectcode"
                    label="이름(계약)"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
                <VCol cols="6"  class="pl-4 pr-2">
                  <VTextField
                    v-model="projectname"
                    label="이름(실투입)"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
                <VCol cols="6"  class="pr-4">
                  <VTextField
                    v-model="projectcode"
                    label="ID"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
                <VCol cols="6"  class="pl-4 pr-2">
                  <VSelect
                    v-model="projectname"
                    label="직원구분"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
                <VCol cols="6"  class="pr-4">
                  <VTextField
                    v-model="projectcode"
                    label="단가"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
                <VCol cols="6"  class="pl-4 pr-2">
                  <VTextField
                    v-model="projectname"
                    label="비용"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
                <VCol cols="6"  class="pr-4">
                  <VTextField
                    v-model="projectcode"
                    label="제경비"
                    type="string"
                    variant="outlined"
                    density="compact"
                  />
                </VCol>
                <VCol cols="6"  class="pl-4 pr-2">
                  <VTextField
                    v-model="projectname"
                    label="판관비"
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
import { VCheckbox, VCheckboxBtn, VRadioGroup, VSelect } from 'vuetify/lib/components/index.mjs';


</script>