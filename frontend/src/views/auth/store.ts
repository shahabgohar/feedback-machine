import { defineStore } from 'pinia'
import { ikonicApi } from '@/api'
import { useGlobalStore } from '@/stores/global'
export const useAuthStore = defineStore('auth', {
  state: () => {
    return { userToken: '' }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async login(form: LoginForm) {
      const globalStore = useGlobalStore()
      try {
        globalStore.requestProcessingFlg = true
        const response: LoginResponse = await ikonicApi({
          url: '/api/auth/login',
          data: form,
          method: 'POST'
        })
        if (response.data?.access_token) {
          localStorage.setItem('accessToken', response.data.access_token)
          this.userToken = response.data.access_token
        }
      } catch (error) {
        console.log('errror ', error)
      } finally {
        globalStore.requestProcessingFlg = false
      }
    },
    async signup(form: any) {
      const globalStore = useGlobalStore()
      try {
        globalStore.requestProcessingFlg = true
        const response = ikonicApi({
          url: 'api/auth/signup',
          method: 'post',
          data: form
        })
      } catch (error) {
        console.log('error ', error)
        throw error
      } finally {
        globalStore.requestProcessingFlg = false
      }
    },
    async logout() {
      const globalStore = useGlobalStore()
      try {
        globalStore.requestProcessingFlg = true
        await ikonicApi({
          url: 'api/auth/logout',
          method: 'post'
        })
        localStorage.clear()
        this.userToken = ''
      } catch (error) {
        console.log('error', error)
      } finally {
        globalStore.requestProcessingFlg = false
      }
    }
  },
  getters: {
    getAccessToken: (state) => {
      return state.userToken
    },
    isLoggedIn: (state) => {
      return Boolean(state.userToken)
    }
  }
})
