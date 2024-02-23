interface LoginForm {
  email: string
  password: string
}

interface LoginResponse {
  data: {
    access_token: string
  }
}
