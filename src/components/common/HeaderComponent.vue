<template>
  <v-app-bar class="px-md-4" elevation="1">
    <template #prepend>
      <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />
    </template>

    <v-img
      class="me-sm-8"
      max-width="120"
      style="cursor: pointer"
      @click="goTo('/')"
      src="http://www.iabacus.co.kr/data/designImages/BANNER_1665234808abacus_logo.png"
    />

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :active="i === activeIndex"
        @click="goTo(item.path)"
        class="me-2 text-none"
        slim
        v-bind="i === activeIndex && { color: '#db693b' }"
        :text="item.text"
      />
    </template>

    <v-spacer />

    <template #append>
      <v-btn class="ms-1" icon>
        <v-avatar icon="mdi-account-circle" />
        <v-menu activator="parent" origin="top">
          <v-list>
            <v-list-item link title="마이페이지" @click="goTo('/profiles')" />
            <v-list-item link title="로그아웃" @click="logout" />
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-if="$vuetify.display.smAndDown"
    v-model="drawer"
    location="top"
    temporary
    width="355"
  >
    <v-list class="py-0" slim v-for="(item, i) in items" :key="i">
      <v-list-item
        link
        :title="item.text"
        :active="i === activeIndex"
        @click="goTo(item.path)"
        class="me-2 text-none"
        slim
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const drawer = shallowRef(false)
defineProps(['activeIndex'])

const items = [
  {
    text: '프로젝트 관리',
    path: '/projects',
  },
  {
    text: '구성원 관리',
    path: '/members',
  },
  {
    text: '협력사 관리',
    path: '/partners',
  },
  {
    text: '매출 관리',
    path: '/sales',
  },
  {
    text: '권한 관리',
    path: '/permissions',
  },
]

const goTo = (path) => {
  router.push(path)
}

const logout = () => {
  console.log('logout')
}
</script>
