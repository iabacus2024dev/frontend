<template>
  <v-row>
    <v-col cols="2">
      <v-btn
        elevation="0"
        block
        prepend-icon="mdi-plus"
        size="large"
        rounded="lg"
        min-width="230"
        border="thin"
      >
        커스텀 역할 추가하기
      </v-btn>

      <v-sheet rounded="lg" min-width="230" class="mt-3" elevation="0" border="thin">
        <v-list rounded="lg" nav selectable>
          <v-list-subheader class="mt-3">기본 역할</v-list-subheader>
          <v-list-item
            color="#eb6129"
            link
            v-for="role in roles.filter((r) => r.isDefault === true)"
            :key="role.id"
            :title="role.name"
          >
          </v-list-item>

          <v-list-subheader class="mt-5">커스텀 역할</v-list-subheader>
          <v-list-item
            color="#eb6129"
            link
            v-for="role in roles.filter((r) => r.isDefault === false)"
            :key="role.id"
            :title="role.name"
          >
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col>
      <v-sheet min-height="70vh" rounded="lg">
        <!--  -->
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { getRoles } from '@/apis/roleService.js'
import { ref } from 'vue'

const roles = ref([])

const fetchGetRoles = async () => {
  roles.value = await getRoles()
  console.log(roles.value)
}
fetchGetRoles()
</script>

<style scoped></style>
