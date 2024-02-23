<script lang="ts" setup>
import Button from 'primevue/button'
import { useAuthStore } from '@/views/auth/store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { logout } = authStore
const router = useRouter()
const logoutUser = async () => {
  await logout()
  router.replace({
    path: '/'
  })
}

const goToSignIn = () => {
  router.push({
    path: '/login'
  })
}
const goToSignup = () => {
  router.push({
    path: '/signup'
  })
}
</script>
<template>
  <div class="w-full flex justify-between p-5">
    <div class="text-xl">Feedback Machine</div>
    <template v-if="authStore.isLoggedIn">
      <Button label="Logout" icon="pi pi-sign-out" severity="danger" @click="logoutUser"></Button>
    </template>
    <template v-else>
      <div class="flex gap-3">
        <Button label="Login" icon="pi pi-sign-in" severity="contrast" @click="goToSignIn"></Button>
        <Button label="SignUp" icon="pi pi-lock" @click="goToSignup"></Button>
      </div>
    </template>
  </div>
</template>
