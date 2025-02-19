<template>
  <v-tooltip :text="text">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"><slot></slot></v-btn>
    </template>
  </v-tooltip>
</template>


<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.v-btn {
  margin-left: 10px;
  background-color: #EB6129;
  color: white;
}
</style>

