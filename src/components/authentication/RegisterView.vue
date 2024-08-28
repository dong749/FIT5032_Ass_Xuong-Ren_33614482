<template>
  <div class="container mt-5 d-flex flex-column justify-content-center align-items-center">
    <h1 class="text-center mb-4">Registor</h1>
    <form class="w-100" style="max-width: 400px" @submit.prevent="finishRegister">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          name="username"
          @blur="validateUsername(true)"
          @input="validateUsername(false)"
          v-model="formData.username"
        />
        <div v-if="errors.username" class="text-danger">
          {{ errors.username }}
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          name="password"
          @blur="validatePassword(true)"
          @input="validatePassword(false)"
          v-model="formData.password"
        />
        <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm password</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          name="confirmPassword"
          @blur="validateConfirmPassword(true)"
          @input="validateConfirmPassword(false)"
          v-model="formData.confirmPassword"
        />
        <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
      </div>
      <!-- <button type="submit" class="btn btn-primary w-100">Registor</button> -->
      <!-- <router-link type="submit" class="btn btn-lg btn-primary w-100" to="/authentication/login"
        >Registor</router-link
      > -->
      <button type="submit" class="btn btn-primary w-100">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null
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

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  if (password.length < minLength) {
    if (blur) {
      errors.value.password = 'Password must be 8 characters'
    }
  } else if (!hasUpperCase) {
    if (blur) {
      errors.value.password = 'Password must be include uppercase letters'
    }
  } else if (!hasLowerCase) {
    if (blur) {
      errors.value.password = 'Password must be include lowercase letters'
    }
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  const password = formData.value.password
  const confirmPassword = formData.value.confirmPassword
  if (confirmPassword.length == 0) {
    if (blur) {
      errors.value.confirmPassword = 'Confirmed password can not be empty'
    }
  } else if (password != confirmPassword) {
    if (blur) {
      errors.value.confirmPassword = 'Confirmed password do not match with password'
    }
  } else {
    errors.value.confirmPassword = null
  }
}

// https://firebase.google.com/docs/auth/web/password-auth
const finishRegister = () => {
  console.log(formData.value)
  validateUsername(true)
  validatePassword(true)
  validateConfirmPassword(true)
  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword) {
    createUserWithEmailAndPassword(getAuth(), formData.value.username, formData.value.password)
      .then((userCredential) => {
        console.log('Register successfully')
        console.log(userCredential)
        router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        alert(errorMessage)
      })
  }
}
</script>

<style scoped></style>
