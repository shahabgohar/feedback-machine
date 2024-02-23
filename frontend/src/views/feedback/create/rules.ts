import { required, helpers, minLength, email } from '@vuelidate/validators'
import { computed } from 'vue'

export const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage('Name is required.', required)
    },
    description: {
      required: helpers.withMessage('Description is required.', required)
    },
    category: {
      required: helpers.withMessage('Category is required.', required)
    }
  }
})
