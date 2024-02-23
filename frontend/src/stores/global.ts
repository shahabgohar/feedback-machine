import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ikonicApi } from '@/api'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      feedbackCategories: []
    }
  },
  actions: {
    async fetchMaster() {
      try {
        const response: any = await ikonicApi({
          url: '/api/master',
          method: 'get'
        })
        if (response?.data?.feedback_categories) {
          this.feedbackCategories = response.data.feedback_categories
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
