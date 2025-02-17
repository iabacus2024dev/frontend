<template>
    <v-app>
      <v-container>
        <v-tooltip text="툴팁 내용 입니다.">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">툴팁 버튼</v-btn>
          </template>
        </v-tooltip>
      </v-container>
    </v-app>
  </template>

<style scoped>
.v-btn {
  margin-left: 10px;
  background-color: #EB6129; /* todo: 공통적으로 쓰는 색 같은 것은 상수화 */
  color: white;
}
</style>