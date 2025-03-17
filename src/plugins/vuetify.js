import { createVuetify } from 'vuetify'
import { VTreeview } from 'vuetify/labs/VTreeview'
import { VDateInput } from 'vuetify/labs/VDateInput'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VFileUpload } from 'vuetify/labs/components'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  components: {
    VTreeview,
    VDateInput,
    VFileUpload,
  },
  locale: {
    locale: 'ko',
  },
})
