import axios from 'axios'
import router from '@/router'

export const ikonicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000
})

ikonicApi.defaults.withCredentials = true
ikonicApi.defaults.withXSRFToken = true
ikonicApi.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken') || ''}`
    config.headers['Accept'] = 'application/json'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

ikonicApi.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    // Do something with response error
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      localStorage.clear()
      router.push({
        path: '/'
      })
      alert('you have been logged out')
    }
    // if (error?.response?.status === 422) {
    //   store.commit('showAlert', {
    //     text:
    //       i18n.t(error?.response?.data?.errors?.message) || i18n.t(error?.response?.data?.message),
    //     successStatus: true
    //   })
    // }
    return Promise.reject(error.response)
  }
)
