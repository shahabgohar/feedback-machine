import { required, helpers, minLength, email } from '@vuelidate/validators'
import { computed } from 'vue'

export const rules = computed(() => {
  return {
    content: {
      required: helpers.withMessage('Comment content is required.', required)
    }
  }
})
