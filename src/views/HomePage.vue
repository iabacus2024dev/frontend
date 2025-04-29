<template>
    <!-- 매출 현황 요약 -->
    <v-row>
      <v-col cols="12" md="3">
        <v-card variant="outlined" border="thin" class="pt-2 px-2">
          <v-card-title class="text-h6 d-flex justify-space-between">
            총 매출
            <v-icon :color="summary.salesGrowth >= 0 ? 'success' : 'error'">
              {{ summary.salesGrowth >= 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
            </v-icon>
          </v-card-title>
          <v-card-text class="text-h4 text-primary">
            {{ formatPrice(summary.totalSales) }}
          </v-card-text>
          <v-card-subtitle>전년 대비 {{ summary.salesGrowth }}%</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card variant="outlined" border="thin" class="pt-2 px-2">
          <v-card-title class="text-h6 d-flex justify-space-between">
            영업이익
            <v-icon :color="summary.profitMargin >= 20 ? 'success' : 'warning'">
              {{ summary.profitMargin >= 20 ? 'mdi-chart-line' : 'mdi-chart-bell-curve' }}
            </v-icon>
          </v-card-title>
          <v-card-text class="text-h4 text-success">
            {{ formatPrice(summary.operatingProfit) }}
          </v-card-text>
          <v-card-subtitle>영업이익률 {{ summary.profitMargin }}%</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card variant="outlined" border="thin" class="pt-2 px-2">
          <v-card-title class="text-h6 d-flex justify-space-between">
            목표 달성률
            <v-icon :color="getAchievementClass(summary.achievementRate)">
              {{ summary.achievementRate >= 100 ? 'mdi-check-circle' : 'mdi-progress-clock' }}
            </v-icon>
          </v-card-title>
          <v-card-text class="text-h4" :class="getAchievementClass(summary.achievementRate)">
            {{ summary.achievementRate }}%
          </v-card-text>
          <v-card-subtitle>목표: {{ formatPrice(summary.targetSales) }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card variant="outlined" border="thin" class="pt-2 px-2">
          <v-card-title class="text-h6 d-flex justify-space-between">
            인건비 효율성
            <v-icon :color="getEfficiencyClass(summary.costEfficiency)">
              {{ summary.costEfficiency >= 300 ? 'mdi-star' : 'mdi-star-outline' }}
            </v-icon>
          </v-card-title>
          <v-card-text class="text-h4" :class="getEfficiencyClass(summary.costEfficiency)">
            {{ summary.costEfficiency }}%
          </v-card-text>
          <v-card-subtitle>매출/인건비 비율</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- 부서별 매출 현황 -->
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card variant="outlined" border="thin" class="pt-2 px-2">
          <v-card-title>부서별 매출 현황</v-card-title>
          <v-card-text>
            <v-chart class="chart" :option="departmentChartOption" autoresize />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 월별 매출 추이 -->
      <v-col cols="12" md="6">
        <v-card variant="outlined" border="thin" class="pt-2 px-2">
          <v-card-title>월별 매출 추이</v-card-title>
          <v-card-text>
            <v-chart class="chart" :option="monthlyChartOption" autoresize />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 사업 유형별 매출 -->
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card variant="outlined" border="thin" class="pt-2 px-2">
          <v-card-title>사업 유형별 매출</v-card-title>
          <v-card-text>
            <v-chart class="chart" :option="businessTypeChartOption" autoresize />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card variant="outlined" border="thin" class="pt-2 px-2">
          <v-card-title>부서별 영업이익률</v-card-title>
          <v-card-text>
            <v-chart class="chart" :option="profitMarginChartOption" autoresize />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  VisualMapComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { formatPrice } from '@/utils/MoneyUtils.js'
import { getAggregate } from '@/apis/salesService.js'
import { useTheme } from 'vuetify'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  VisualMapComponent
])

// 데이터 상태
const salesData = ref([])
const lastYearSalesData = ref([])  // 전년도 데이터 추가
const summary = ref({
  totalSales: 0,
  operatingProfit: 0,
  profitMargin: 0,
  salesGrowth: 0,
  achievementRate: 0,
  targetSales: 0,
  costEfficiency: 0
})

const theme = useTheme()

// 차트 텍스트 색상 계산
const getTextColor = computed(() => {
  return theme.global.current.value.dark ? '#FFFFFF' : '#333333'
})

// 부서별 매출 데이터
const departmentSales = computed(() => {
  return salesData.value.map(dept => ({
    department: dept.부서이름,
    sales: dept.매출합계,
    target: dept.매출목표,
    profit: dept.영업이익,
    achievementRate: dept.달성률
  }))
})

// 부서별 차트 옵션
const departmentChartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: params => {
      const data = params[0].data
      return `${params[0].name}<br/>
              매출: ${formatPrice(data.sales)}<br/>
              목표: ${formatPrice(data.target)}<br/>
              달성률: ${data.achievementRate}%`
    }
  },
  legend: {
    data: ['매출', '목표'],
    textStyle: {
      color: getTextColor.value
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: departmentSales.value.map(item => item.department),
    axisLabel: {
      interval: 0,
      rotate: 30,
      color: getTextColor.value
    },
    axisLine: {
      lineStyle: {
        color: getTextColor.value
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: value => formatPrice(value),
      color: getTextColor.value
    },
    axisLine: {
      lineStyle: {
        color: getTextColor.value
      }
    },
    splitLine: {
      lineStyle: {
        color: theme.global.current.value.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }
    }
  },
  series: [
    {
      name: '매출',
      type: 'bar',
      data: departmentSales.value.map(item => ({
        value: item.sales,
        sales: item.sales,
        target: item.target,
        achievementRate: item.achievementRate
      })),
      itemStyle: {
        color: '#4CAF50'
      },
      animationDelay: idx => idx * 100
    },
    {
      name: '목표',
      type: 'bar',
      data: departmentSales.value.map(item => item.target),
      itemStyle: {
        color: '#FFC107'
      },
      animationDelay: idx => idx * 100 + 100
    }
  ],
  animationEasing: 'elasticOut',
  animationDelayUpdate: idx => idx * 5
}))

// 월별 차트 옵션
const monthlyChartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    formatter: params => {
      let result = `${params[0].name}<br/>`
      params.forEach(param => {
        if (param.seriesName === '올해') {
          result += `${param.seriesName}: ${formatPrice(param.data)}<br/>`
        } else {
          result += `${param.seriesName}: ${formatPrice(param.data)}<br/>`
        }
      })
      return result
    }
  },
  legend: {
    data: ['올해', '전년'],
    bottom: '0',
    textStyle: {
      color: getTextColor.value
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    axisLabel: {
      color: getTextColor.value
    },
    axisLine: {
      lineStyle: {
        color: getTextColor.value
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: value => formatPrice(value),
      color: getTextColor.value
    },
    axisLine: {
      lineStyle: {
        color: getTextColor.value
      }
    },
    splitLine: {
      lineStyle: {
        color: theme.global.current.value.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }
    }
  },
  series: [
    {
      name: '올해',
      type: 'line',
      smooth: true,
      data: salesData.value.length > 0 ? [
        salesData.value[0].sales_01,
        salesData.value[0].sales_02,
        salesData.value[0].sales_03,
        salesData.value[0].sales_04,
        salesData.value[0].sales_05,
        salesData.value[0].sales_06,
        salesData.value[0].sales_07,
        salesData.value[0].sales_08,
        salesData.value[0].sales_09,
        salesData.value[0].sales_10,
        salesData.value[0].sales_11,
        salesData.value[0].sales_12
      ] : [],
      itemStyle: {
        color: '#4CAF50'
      },
      lineStyle: {
        width: 3
      },
      symbolSize: 8
    },
    {
      name: '전년',
      type: 'line',
      smooth: true,
      data: lastYearSalesData.value.length > 0 ? [
        lastYearSalesData.value[0].sales_01,
        lastYearSalesData.value[0].sales_02,
        lastYearSalesData.value[0].sales_03,
        lastYearSalesData.value[0].sales_04,
        lastYearSalesData.value[0].sales_05,
        lastYearSalesData.value[0].sales_06,
        lastYearSalesData.value[0].sales_07,
        lastYearSalesData.value[0].sales_08,
        lastYearSalesData.value[0].sales_09,
        lastYearSalesData.value[0].sales_10,
        lastYearSalesData.value[0].sales_11,
        lastYearSalesData.value[0].sales_12
      ] : [],
      itemStyle: {
        color: '#9E9E9E'
      },
      lineStyle: {
        width: 2,
        type: 'dashed'
      },
      symbolSize: 6
    }
  ]
}))

// 사업 유형 차트 옵션
const businessTypeChartOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: params => {
      return `${params.name}: ${formatPrice(params.value)} (${params.percent}%)`
    }
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    textStyle: {
      color: getTextColor.value
    }
  },
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#fff',
      borderWidth: 2
    },
    label: {
      show: false,
      position: 'center'
    },
    emphasis: {
      label: {
        show: true,
        fontSize: '20',
        fontWeight: 'bold'
      }
    },
    labelLine: {
      show: false
    },
    data: businessTypes.value.map(item => ({
      value: item.sales,
      name: item.type
    })),
    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: idx => idx * 200
  }]
}))

// 부서별 영업이익률 차트 옵션
const profitMarginChartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    formatter: params => {
      const data = params[0].data
      return `${params[0].name}<br/>
              영업이익: ${formatPrice(data.profit)}<br/>
              매출: ${formatPrice(data.sales)}<br/>
              영업이익률: ${data.margin}%`
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: departmentSales.value.map(item => item.department),
    axisLabel: {
      interval: 0,
      rotate: 30,
      color: getTextColor.value
    },
    axisLine: {
      lineStyle: {
        color: getTextColor.value
      }
    }
  },
  yAxis: {
    type: 'value',
    name: '영업이익률 (%)',
    nameTextStyle: {
      color: getTextColor.value
    },
    axisLabel: {
      formatter: value => `${value}%`,
      color: getTextColor.value
    },
    axisLine: {
      lineStyle: {
        color: getTextColor.value
      }
    },
    splitLine: {
      lineStyle: {
        color: theme.global.current.value.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }
    }
  },
  series: [{
    type: 'bar',
    data: departmentSales.value.map(item => ({
      value: item.sales > 0 ? Math.round((item.profit / item.sales) * 100) : 0,
      profit: item.profit,
      sales: item.sales,
      margin: item.sales > 0 ? Math.round((item.profit / item.sales) * 100) : 0
    })),
    itemStyle: {
      color: params => {
        const value = params.data.value
        if (value >= 20) return '#4CAF50'
        if (value >= 10) return '#FFC107'
        return '#F44336'
      }
    },
    label: {
      show: true,
      position: 'top',
      formatter: '{c}%'
    },
    animationDelay: idx => idx * 100
  }],
  animationEasing: 'elasticOut',
  animationDelayUpdate: idx => idx * 5
}))

// 사업 유형별 매출 데이터
const businessTypes = computed(() => {
  const total = salesData.value.reduce((sum, dept) => sum + dept.매출합계, 0)
  return [
    { type: 'SI', sales: salesData.value.reduce((sum, dept) => sum + (dept.si || 0), 0) },
    { type: 'SM', sales: salesData.value.reduce((sum, dept) => sum + (dept.sm || 0), 0) }
  ].map(item => ({
    ...item,
    ratio: total > 0 ? Math.round((item.sales / total) * 100) : 0
  }))
})

// 달성률에 따른 클래스 반환
const getAchievementClass = (rate) => {
  if (rate >= 100) return 'text-success'
  if (rate >= 80) return 'text-warning'
  return 'text-error'
}

// 효율성에 따른 클래스 반환
const getEfficiencyClass = (rate) => {
  if (rate >= 300) return 'text-success'
  if (rate >= 200) return 'text-warning'
  return 'text-error'
}

// 데이터 로드
const loadData = async () => {
  try {
    const currentYear = new Date().getFullYear()
    const lastYear = currentYear - 1
    
    // 현재 연도와 전년도 데이터를 동시에 로드
    const [currentData, lastYearData] = await Promise.all([
      getAggregate(currentYear),
      getAggregate(lastYear)
    ])
    
    salesData.value = currentData
    lastYearSalesData.value = lastYearData
    
    // 요약 데이터 계산
    if (salesData.value.length > 0 && lastYearSalesData.value.length > 0) {
      const total = salesData.value.reduce((sum, dept) => sum + dept.매출합계, 0)
      const lastYearTotal = lastYearSalesData.value.reduce((sum, dept) => sum + dept.매출합계, 0)
      const profit = salesData.value.reduce((sum, dept) => sum + dept.영업이익, 0)
      const target = salesData.value.reduce((sum, dept) => sum + dept.매출목표, 0)
      const cost = salesData.value.reduce((sum, dept) => sum + dept.인건비, 0)
      
      // 전년 대비 성장률 계산
      const growthRate = lastYearTotal > 0 
        ? Math.round(((total - lastYearTotal) / lastYearTotal) * 100) 
        : 0
      
      summary.value = {
        totalSales: total,
        operatingProfit: profit,
        profitMargin: total > 0 ? Math.round((profit / total) * 100) : 0,
        salesGrowth: growthRate,
        achievementRate: target > 0 ? Math.round((total / target) * 100) : 0,
        targetSales: target,
        costEfficiency: cost > 0 ? Math.round((total / cost) * 100) : 0
      }
    }
  } catch (error) {
    console.error('데이터 로드 실패:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.chart {
  height: 300px;
}

.v-img {
  background-color: white;
}
</style>
