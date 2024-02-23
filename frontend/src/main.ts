import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdEmailOutlined } from 'oh-vue-icons/icons'
import PrimeVue from 'primevue/config'
import Lara from '@/assets/presets/lara'
import dayjs from '@/plugins/dayjs'
import 'primeicons/primeicons.css'
import './index.css'
import { useAuthStore } from './views/auth/store'
import ToastService from 'primevue/toastservice'

addIcons(MdEmailOutlined)
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ToastService)
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
})
app.config.globalProperties.$dayjs = dayjs
app.provide('dayjs', dayjs)
app.component('v-icon', OhVueIcon)
router.isReady().then(() => {
  const authStore = useAuthStore()
  authStore.$state.userToken = localStorage.getItem('accessToken') || ''
  app.mount('#app')
})
