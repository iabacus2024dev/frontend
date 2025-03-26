<script setup>
import {ref, shallowRef, watch} from 'vue'

const icons = [
  'mdi-beer',
  'mdi-glass-mug',
  'mdi-liquor',
  'mdi-glass-mug-variant',
]
const breweries = ref([])
const tree = ref([])
const types = ref([])
const items = ref([{
  id: 1,
  title: '(주)애버커스',
  children: [
    {
      id: 2,
      title: '통신사업본부',
      children: [
        {
          id: 201,
          title: '유동필',
        },
        {
          id: 202,
          title: '홍효상',
        },
        {
          id: 203,
          title: 'Nekosaur',
        },
        {
          id: 204,
          title: 'Jacek',
        },
        {
          id: 205,
          title: 'Andrew',
        },
      ],
    },
    {
      id: 3,
      title: 'Administrators',
      children: [
        {
          id: 301,
          title: 'Blaine',
        },
        {
          id: 302,
          title: 'Yuchao',
        },
      ],
    },
    {
      id: 4,
      title: 'Contributors',
      children: [
        {
          id: 401,
          title: 'Phlow',
        },
        {
          id: 402,
          title: 'Brandon',
        },
        {
          id: 403,
          title: 'Sean',
        },
      ],
    },
  ],
}]);

watch(breweries, val => {
  types.value = val.reduce((acc, cur) => {
    const type = cur.brewery_type
    if (!acc.includes(type)) acc.push(type)
    return acc
  }, []).sort()

  const children = types.value.map(type => ({
    id: type,
    name: getName(type),
    children: getChildren(type),
  }))
  const rootObj = items.value[0]
  rootObj.children = children
  items.value = [rootObj]
}, {deep: true})

function getChildren (type) {
  const _breweries = []
  for (const brewery of breweries.value) {
    if (brewery.brewery_type !== type) continue
    _breweries.push({
      ...brewery,
      name: getName(brewery.name),
    })
  }
  return _breweries.sort((a, b) => {
    return a.name > b.name ? 1 : -1
  })
}

function getIcon () {
  return icons[Math.floor(Math.random() * icons.length)]
}

function getName (name) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
}

function onClickClose (selection) {
  tree.value = tree.value.filter(item => item.id !== selection.id)
}

const search = shallowRef(null)
const caseSensitive = shallowRef(false)

function filter (value, search, item) {
  return caseSensitive.value ? value.indexOf(search) > -1 : value.toLowerCase().indexOf(search.toLowerCase()) > -1
}

const getSelectedMembers = () => {
  return [...tree.value]
};

defineExpose({
  getSelectedMembers,
})
</script>

<template>
  <v-container class="mx-auto" min-width="800px">
    <v-card width="100%">
      <v-row dense>
        <v-col cols="12" sm="6" width="100%">
          <v-card class="mx-auto" width="100%">
            <v-sheet class="pa-4" color="surface-variant">
              <v-text-field
                v-model="search"
                clear-icon="mdi-close-circle-outline"
                label="구성원 검색"
                variant="solo"
                clearable
                flat
                hide-details
              ></v-text-field>

              <v-checkbox-btn
                v-model="caseSensitive"
                label="대소문자 무시"
              ></v-checkbox-btn>
            </v-sheet>
            <v-treeview
              v-model:selected="tree"
              :items="items"
              :custom-filter="filter"
              :search="search"
              item-value="id"
              class="flex-1-0"
              false-icon="mdi-account-outline"
              indeterminate-icon="mdi-account-outline"
              select-strategy="classic"
              true-icon="mdi-account"
              return-object
              selectable
            >
            </v-treeview>
          </v-card>
        </v-col>

        <v-divider :vertical="true" class="my-md-3"></v-divider>

        <v-col cols="12" sm="6" width="100%">
          <v-card-text width="100%">
            <div
              v-if="tree.length === 0"
              class="text-h6 font-weight-light text-grey pa-4"
            >
            </div>

            <div class="d-flex flex-wrap ga-1">
              <v-scroll-x-transition group hide-on-leave>
                <v-chip
                  v-for="selection in tree"
                  :key="selection.id"
                  :prepend-icon="getIcon()"
                  :text="selection.title"
                  color="grey"
                  size="small"
                  border
                  closable
                  label
                  @click:close="onClickClose(selection)"
                ></v-chip>
              </v-scroll-x-transition>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>
