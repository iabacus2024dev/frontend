<script setup>
import {ref, watch} from 'vue'

const open = ref(['DefaultRole'])
const emit = defineEmits(['roleSelected']);
const selectedRole = (role) => {
  emit('roleSelected', role);
}

const props = defineProps({
  customRoles: {
    type: Array,
    required: true,
  },
  selectRoles: {
    type: Object,
    required: false,
    default: null
  },
  defaultRoles: {
    type: Array,
    required: true,
  }
})

const localDefaultRoles = ref([...props.defaultRoles]);

watch(
  () => props.selectRoles,
  (newRole) => {
    if (!newRole) return;

    const roleIndex = localDefaultRoles.value.findIndex(
      ([title]) => title === newRole.title
    );

    if (roleIndex !== -1) {
      localDefaultRoles.value[roleIndex][1] = newRole.count;
    }
  },
  {immediate: true, deep: true}
);

watch(
  () => props.defaultRoles,
  (newDefaultRoles) => {
    localDefaultRoles.value = [...newDefaultRoles];
  },
  {immediate: true, deep: true}
);
</script>

<template>
  <v-card border="thin" class="pa-4" variant="outlined">
    <v-list v-model:opened="open">
      <v-list-group prepend-icon="mdi-account-multiple-outline" value="DefaultRole">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            title="기본 역할"
          ></v-list-item>
        </template>

        <v-list-item
          v-for="([title, count], i) in localDefaultRoles"
          :key="i"
          :value="title"
          @click="selectedRole([title, count])"
        >
          <template v-slot:default>
            {{ title }} ({{ count }})
          </template>
        </v-list-item>
      </v-list-group>

      <v-list-group prepend-icon="mdi-account-multiple-plus-outline" value="CustomRole">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            title="커스텀 역할"
          ></v-list-item>
        </template>

        <v-list-item
          v-for="([title, count], i) in props.customRoles"
          :key="i"
          :value="title"
          @click="selectedRole([title, count])"
        >
          <template v-slot:default>
            {{ title }} ({{ count }})
          </template>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>

</template>

<style scoped>

</style>
