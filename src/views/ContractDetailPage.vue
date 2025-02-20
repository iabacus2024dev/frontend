<template>
  <v-container class="mt-8">
    <h1 class="text-h4 font-weight-bold">계약 상세</h1>
  </v-container>

<!-- 상세 정보 폼 -->
<v-container>
  <v-container class="form-div">
    <h3>프로젝트 정보</h3>
    <v-form>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="projectName"
            :counter="50"
            label="프로젝트명"
            variant="outlined"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="projectCode"
            :counter="10"
            label="프로젝트코드"
            variant="outlined"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</v-container>

</template>

<script setup></script>

<style scoped>
.form-div {
  width: 100%;
}
</style>
