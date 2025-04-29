import { createVuetify } from 'vuetify'
import { VTreeview } from 'vuetify/labs/VTreeview'
import { VDateInput } from 'vuetify/labs/VDateInput'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VFileUpload } from 'vuetify/labs/components'

import { ko } from 'vuetify/locale'

// 프로젝트 대표색 정의
const PRIMARY_COLOR = '#eb6129'
const PRIMARY_DARKEN = '#d55624'
const PRIMARY_LIGHTEN = '#ff7140'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: PRIMARY_COLOR,
          'primary-darken': PRIMARY_DARKEN,
          'primary-lighten': PRIMARY_LIGHTEN,
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#FFFFFF',
          surface: '#FFFFFF',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: PRIMARY_LIGHTEN, // 다크모드에서는 더 밝은 버전 사용
          'primary-darken': PRIMARY_COLOR,
          'primary-lighten': '#ff8b66',
          secondary: '#B0BEC5',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#121212',
          surface: '#212121',
        }
      }
    }
  },
  components: {
    VTreeview,
    VDateInput,
    VFileUpload,
  },
  locale: {
    locale: 'ko',
    fallback: 'en',
    messages: { ko },
  },
})
