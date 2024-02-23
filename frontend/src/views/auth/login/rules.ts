import { required, helpers, minLength, email } from '@vuelidate/validators'
import { computed } from 'vue'

export const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Email is required.', required),
      email: helpers.withMessage('Must be a valid email', email)
    },
    password: {
      required: helpers.withMessage('Password is required', required),
      minLength: helpers.withMessage('Password must consist of minimum 8 characters', minLength(8))
    }
  }
})
