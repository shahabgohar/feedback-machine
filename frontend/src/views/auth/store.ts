import { defineStore } from 'pinia'
import { ikonicApi } from '@/api'
export const useAuthStore = defineStore('auth', {
  state: () => {
    return { userToken: '' }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async login(form: LoginForm) {
      try {
        const response: LoginResponse = await ikonicApi({
          url: '/api/auth/login',
          data: form,
          method: 'POST'
        })
        console.log('response ', response)
        if (response.data?.access_token) {
          localStorage.setItem('accessToken', response.data.access_token)
          this.userToken = response.data.access_token
        }
      } catch (error) {
        console.log('errror ', error)
      }
    },
    async signup(form: any) {
      try {
        const response = ikonicApi({
          url: 'api/auth/signup',
          method: 'post',
          data: form
        })
        console.log('signup form submitted ', response)
      } catch {}
    },
    async logout() {
      try {
        await ikonicApi({
          url: 'api/auth/logout',
          method: 'post'
        })
        localStorage.clear()
        this.userToken = ''
      } catch (error) {}
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
