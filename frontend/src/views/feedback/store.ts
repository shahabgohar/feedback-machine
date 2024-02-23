import { defineStore } from 'pinia'
import { ikonicApi } from '@/api'
import type { Feedback, FeedbackListResponse, FeedbackResponse, CommentCreateProps } from './types'
import type { Paginate, User } from '@/types'
import { useGlobalStore } from '@/stores/global'
export const useFeedbackStore = defineStore('feedback', {
  state: () => {
    return {
      feedbacks: [] as Array<Feedback>,
      feedbackPagination: {} as Paginate,
      feedback: {} as Feedback,
      users: [] as Array<User>
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async addFeedback(data: Feedback) {
      const globalStore = useGlobalStore()
      try {
        globalStore.requestProcessingFlg = true
        const response: any = await ikonicApi({
          url: '/api/feedbacks',
          method: 'post',
          data: data
        })

        console.log('response ', response)
      } catch (error) {
        console.log('error ', error)
      } finally {
        globalStore.requestProcessingFlg = false
      }
    },
    async getAllFeedbacks() {
      try {
        const response: FeedbackListResponse = await ikonicApi({
          url: '/api/feedbacks',
          method: 'get'
        })
        if (response.data) {
          this.feedbacks = response.data.feedbacks
          // this.feedbackPagination = response.data.paginate
        }
      } catch (error) {
        console.log('error ', error)
      }
    },
    async fetchFeedback(id: string) {
      const globalStore = useGlobalStore()
      try {
        globalStore.requestProcessingFlg = true
        const response: FeedbackResponse = await ikonicApi({
          url: `/api/feedbacks/${id}`,
          method: 'get'
        })

        if (response.data) {
          this.feedback = response.data.feedback
          this.users = response.data.users
        }
      } catch (error) {
        console.log('error', error)
      } finally {
        globalStore.requestProcessingFlg = false
      }
    },
    async addComment(data: CommentCreateProps) {
      const globalStore = useGlobalStore()
      try {
        globalStore.requestProcessingFlg = true
        const response: any = await ikonicApi({
          url: '/api/comments',
          method: 'post',
          data: data
        })
        if (response.data.comment) {
          this.feedback.comments?.unshift(response.data.comment)
        }
      } catch (error) {
        console.log('error', error)
      } finally {
        globalStore.requestProcessingFlg = false
      }
    }
  },
  getters: {
    mentionUserList: (state) => {
      return state.users.map((item) => {
        return {
          id: item.id,
          value: item.name
        }
      })
    }
  }
})
