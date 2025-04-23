<template xmlns="http://www.w3.org/1999/html">
  <v-card border="thin" class="mt-4 pa-4" variant="outlined">
    <v-card-title class="d-flex align-center">
      <v-icon color="#eb6129" class="mr-2">mdi-shield-account</v-icon>
      <span class="text-h5 font-weight-bold">내 권한 목록</span>
    </v-card-title>
    <v-divider class="my-3"></v-divider>

    <div v-if="loading" class="d-flex justify-center align-center pa-4">
      <v-progress-circular indeterminate color="#eb6129"></v-progress-circular>
    </div>

    <div v-else-if="authorities.length === 0" class="text-center pa-4">
      <v-icon size="64" color="grey lighten-1">mdi-shield-off-outline</v-icon>
      <div class="text-subtitle-1 mt-2 text-grey">권한이 없습니다.</div>
    </div>

    <v-card-text v-else>
      <!-- 권한 카테고리별 그룹화 -->
      <v-expansion-panels variant="accordion" class="mb-4">
        <v-expansion-panel
          v-for="(group, category) in groupedAuthorities"
          :key="category"
          :title="getCategoryTitle(category)"
          :text="getCategoryDescription(category)"
        >
          <template v-slot:title>
            <div class="d-flex align-center">
              <v-icon :color="getCategoryColor(category)" class="mr-2">{{
                getCategoryIcon(category)
              }}</v-icon>
              <span class="font-weight-bold">{{ getCategoryTitle(category) }}</span>
              <v-chip
                class="ml-2"
                size="x-small"
                color="#eb6129"
                variant="outlined"
                border="thin"
                >{{ group.length }}</v-chip
              >
            </div>
          </template>

          <v-expansion-panel-text>
            <v-list density="compact" class="bg-transparent">
              <v-list-item
                v-for="authority in group"
                :key="authority.name"
                :subtitle="getAuthorityDescription(authority)"
                class="rounded-lg mb-1 hover-bg"
              >
                <template v-slot:prepend>
                  <v-avatar size="small" :color="getActionColor(authority)" variant="tonal">
                    <v-icon size="small">{{ getActionIcon(authority) }}</v-icon>
                  </v-avatar>
                </template>

                <template v-slot:title>
                  <div class="font-weight-medium">{{ authority.name }}</div>
                </template>

                <template v-slot:append>
                  <v-chip size="x-small" :color="getScopeColor(authority)" variant="outlined">
                    {{ getScopeText(authority) }}
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- 권한 요약 정보 -->
      <div class="d-flex justify-end">
        <span class="text-caption text-grey">마지막 업데이트: {{ formatDate(new Date()) }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getMyAuthorities } from '@/apis/roleService'

const authorities = ref([])
const loading = ref(true)

const fetchGetAuthorities = async () => {
  try {
    loading.value = true
    const response = await getMyAuthorities()
    authorities.value = response || []
  } catch (error) {
    console.error('권한 목록을 불러오는 중 오류가 발생했습니다:', error)
  } finally {
    loading.value = false
  }
}

// 권한을 카테고리별로 그룹화
const groupedAuthorities = computed(() => {
  const groups = {}

  authorities.value.forEach((authority) => {
    // 권한 이름에서 카테고리 추출 (예: "프로젝트 조회" -> "프로젝트")
    const category = authority.name.split(' ')[0]

    if (!groups[category]) {
      groups[category] = []
    }

    groups[category].push(authority)
  })

  return groups
})

// 카테고리 관련 함수들
const getCategoryTitle = (category) => {
  const titles = {
    프로젝트: '프로젝트 관리',
    구성원: '구성원 관리',
    협력사: '협력사 관리',
    매출: '매출 관리',
    권한: '권한 관리',
    휴가: '휴가 관리',
  }

  return titles[category] || category
}

const getCategoryDescription = (category) => {
  const descriptions = {
    프로젝트: '프로젝트 생성, 조회, 수정, 삭제 권한',
    구성원: '구성원 정보 관리 권한',
    협력사: '협력사 정보 관리 권한',
    매출: '매출 정보 관리 권한',
    권한: '사용자 권한 관리 권한',
    휴가: '휴가 신청 및 관리 권한',
  }

  return descriptions[category] || ''
}

const getCategoryIcon = (category) => {
  const icons = {
    프로젝트: 'mdi-briefcase-outline',
    구성원: 'mdi-account-group-outline',
    협력사: 'mdi-handshake-outline',
    매출: 'mdi-chart-line',
    권한: 'mdi-shield-outline',
    휴가: 'mdi-calendar-check-outline',
  }

  return icons[category] || 'mdi-shield-outline'
}

const getCategoryColor = (category) => {
  const colors = {
    프로젝트: 'indigo',
    구성원: 'teal',
    협력사: 'deep-purple',
    매출: 'green',
    권한: 'blue',
    휴가: 'amber-darken-2',
  }

  return colors[category] || 'primary'
}

// 권한 액션 관련 함수들
const getActionIcon = (authority) => {
  return authority.name.includes('조회') ? 'mdi-eye-outline' : 'mdi-pencil-outline'
}

const getActionColor = (authority) => {
  return authority.name.includes('조회') ? 'info' : 'success'
}

// 권한 범위 관련 함수들
const getScopeText = (authority) => {
  // 실제로는 authority 객체에서 범위 정보를 추출해야 함
  // 현재는 임의로 설정
  if (authority.name.includes('전체')) return '전체'
  if (authority.name.includes('프로젝트')) return '프로젝트'
  if (authority.name.includes('구성원')) return '팀'
  if (authority.name.includes('협력사')) return '팀'
  return '개인'
}

const getScopeColor = (authority) => {
  const scope = getScopeText(authority)
  const colors = {
    전체: 'purple',
    프로젝트: 'indigo',
    팀: 'blue',
    개인: 'teal',
  }

  return colors[scope] || 'grey'
}

const getAuthorityDescription = (authority) => {
  // 실제로는 authority 객체에서 설명 정보를 추출해야 함
  // 현재는 임의로 설정
  if (authority.name.includes('조회')) {
    return `${authority.name.split(' ')[0]} 정보를 조회할 수 있는 권한입니다.`
  } else {
    return `${authority.name.split(' ')[0]} 정보를 생성, 수정, 삭제할 수 있는 권한입니다.`
  }
}

const formatDate = (date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(() => {
  fetchGetAuthorities()
})
</script>

<style scoped>
.hover-bg:hover {
  background-color: rgba(25, 118, 210, 0.05);
}

.v-expansion-panel-text__wrapper {
  padding: 0 !important;
}
</style>
