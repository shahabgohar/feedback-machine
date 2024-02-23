<script lang="ts" setup>
import Button from 'primevue/button'
import { useAuthStore } from '@/views/auth/store'
import { useRouter } from 'vue-router'
import { ROUTE } from '@/router/constants'

const authStore = useAuthStore()
const { logout } = authStore
const router = useRouter()
const logoutUser = async () => {
  await logout()
  router.replace({
    name: ROUTE.HOME
  })
}

const goToSignIn = () => {
  router.push({
    name: ROUTE.LOGIN
  })
}
const goToSignup = () => {
  router.push({
    name: ROUTE.SIGNUP
  })
}

const redirectToHomePage = () => {
  console.log('authStore.isLoggedIn ', authStore.isLoggedIn)
  if (authStore.isLoggedIn) {
    router.push({
      name: ROUTE.FEEDBACK.LIST
    })
  } else {
    router.push({
      name: ROUTE.HOME
    })
  }
}
</script>
<template>
  <div class="w-full flex justify-between items-center p-5 bg-white">
    <div class="text-xl cursor-pointer" @click="redirectToHomePage">Feedback Machine</div>
    <template v-if="authStore.isLoggedIn">
      <Button label="Logout" icon="pi pi-sign-out" severity="danger" @click="logoutUser"></Button>
    </template>
    <template v-else>
      <div class="flex gap-3">
        <Button
          label="Login"
          icon="pi pi-sign-in"
          severity="secondary"
          @click="goToSignIn"
        ></Button>
        <Button label="SignUp" icon="pi pi-lock" @click="goToSignup"></Button>
      </div>
    </template>
  </div>
</template>
