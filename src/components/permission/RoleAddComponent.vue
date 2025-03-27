<script setup>
import {ref, watch} from 'vue'

const colors = ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange']
const editingItem = ref(null)
const items = ref([])
const nonce = ref(1)
const model = ref([])
const search = ref(null)
const emit = defineEmits(['roleAdded', 'roleRemoved']);

watch(model, (val, prev) => {
  if (val.length === prev.length) return

  model.value = val.map(v => {
    if (typeof v === 'string') {
      v = {
        title: v,
        color: colors[nonce.value - 1],
      }

      items.value.push(v)
      emit('roleAdded', v);
      nonce.value++
    }
    return v
  });
});

function removeSelection(title) {
  const index = model.value.findIndex(item => item.title === title);

  if (index === -1) {
    return;
  }
  const removedItem = model.value[index];
  model.value.splice(index, 1);
  emit('roleRemoved', { title: removedItem.title });
}

function edit (item) {
  if (!editingItem.value) {
    editingItem.value = item
  } else {
    editingItem.value = null
  }
}

function filter (value, queryText, item) {
  const toLowerCaseString = val =>
    String(val != null ? val : '').toLowerCase()

  const query = toLowerCaseString(queryText)

  const availableOptions = items.value.filter(x => !model.value.includes(x))
  const hasAnyMatch = availableOptions.some(
    x => toLowerCaseString(x.title).includes(query)
  )
  if (item.raw.header) return !hasAnyMatch

  const text = toLowerCaseString(item.raw.title)

  return text.includes(query)
}
</script>

<template>
  <v-combobox
    v-model="model"
    v-model:search="search"
    :custom-filter="filter"
    :items="items"
    label="역할 추가하기"
    variant="solo"
    class="mt-4"
    hide-selected
    multiple
  >
    <template v-slot:selection="{ item }">
      <v-chip
        v-if="item === Object(item)"
        :color="`${item.raw.color}-lighten-3`"
        :text="item.title"
        size="small"
        variant="flat"
        closable
        label
        @click:close="removeSelection(item.title)"
      ></v-chip>
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item v-if="item.raw.header && search">
        <span class="mr-3">Create</span>
        <v-chip
          :color="`${colors[nonce - 1]}-lighten-3`"
          size="small"
          variant="flat"
          label
        >
          {{ search }}
        </v-chip>
      </v-list-item>
      <v-list-subheader v-else-if="item.raw.header" :title="item.title"></v-list-subheader>
      <v-list-item v-else @click="props.onClick">
        <v-text-field
          v-if="editingItem === item.raw"
          v-model="editingItem.title"
          bg-color="transparent"
          class="mr-3"
          density="compact"
          variant="plain"
          autofocus
          hide-details
          @click.stop
          @keydown.stop
          @keyup.enter="edit(item.raw)"
        ></v-text-field>
        <v-chip
          v-else
          :color="`${item.raw.color}-lighten-3`"
          :text="item.raw.title"
          variant="flat"
          label
        ></v-chip>
        <template v-slot:append>
          <v-btn
            :color="editingItem !== item.raw ? 'primary' : 'success'"
            :icon="editingItem !== item.raw ? 'mdi-pencil' : 'mdi-check'"
            size="small"
            variant="text"
            @click.stop.prevent="edit(item.raw)"
          ></v-btn>
        </template>
      </v-list-item>
    </template>
  </v-combobox>
</template>

<style scoped>

</style>
