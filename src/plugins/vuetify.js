import { createVuetify } from 'vuetify'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VTreeview } from 'vuetify/labs/VTreeview'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  components: {
    VTreeview,
  }
})
