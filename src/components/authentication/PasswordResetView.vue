<template>
  <div class="container mt-5 d-flex flex-column justify-content-center align-items-center">
    <h1 class="text-center mb-4">Reset password</h1>
    <form class="w-100" style="max-width: 400px" @submit.prevent="sendEmailtoResetPassword">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          name="username"
          @blur="validateUsername(true)"
          v-model="formData.username"
        />
        <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
      </div>
      <button type="submit" class="btn btn-primary w-100">Send Email</button>
    </form>
  </div>
</template>

<script setup>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  username: ''
})

const errors = ref({
  username: null
})

const validateUsername = (blur) => {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
  if (formData.value.username.length < 3) {
    if (blur) {
      errors.value.username = 'username must be more than 3 characters.'
    }
  } else if (!gmailRegex.test(formData.value.username)) {
    if (blur) {
      errors.value.username = 'Gmail format is invalid'
    }
  } else {
    errors.value.username = null
  }
}

// https://firebase.google.com/docs/auth/web/manage-users?hl=zh-cn
const sendEmailtoResetPassword = () => {
  const auth = getAuth()
  validateUsername(true)
  if (!errors.value.username) {
    sendPasswordResetEmail(auth, formData.value.username)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log('Password reset email sent!')
        alert('Password reset email sent!')
        router.push('/authentication/login')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(errorCode, errorMessage)
        // ..
      })
  }
}
</script>

<style scoped></style>
