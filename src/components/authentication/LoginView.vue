<template>
  <div class="container mt-5 d-flex flex-column justify-content-center align-items-center">
    <h1 class="text-center mb-4">Login</h1>
    <form class="w-100" style="max-width: 400px" @submit.prevent="finishLogin">
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
        <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
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
      <button type="submit" class="btn btn-primary w-100">Login</button>
      <br />
      <br />
      <p class="text-center mb-4 text-primary login-btn" @click="loginWithGoogleAccount">
        Login with google account
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-google"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"
          />
        </svg>
      </p>
    </form>
    <br />
    <div>
      <p class="mb-3 text-center">
        Do not have a account? Click
        <router-link class="nav-link d-inline text-primary" to="/authentication/registor"
          >here</router-link
        >
        to sign up
      </p>
      <router-link class="nav-link text-primary text-center" to="/authentication/reset"
        >Password reset</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/FirbaseConfig'

// router
const router = useRouter()

const formData = ref({
  username: '',
  password: ''
})

const errors = ref({
  username: null,
  password: null
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

// https://firebase.google.com/docs/auth/web/password-auth
const finishLogin = () => {
  const auth = getAuth()
  validateUsername(true)
  validatePassword(true)
  if (!errors.value.username && !errors.value.password) {
    signInWithEmailAndPassword(auth, formData.value.username, formData.value.password)
      .then((userCredential) => {
        // Signed in
        console.log(formData.value)
        console.log('Login successfully')
        router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        alert('Invalid username or password')
      })
  }
}

// https://firebase.google.com/docs/auth/web/google-signin
const loginWithGoogleAccount = () => {
  signInWithPopup(getAuth(), new GoogleAuthProvider())
    .then((result) => {
      const user = result.user
      const userDocRef = doc(db, 'users', user.uid)
      return getDoc(userDocRef).then((userDoc) => {
        // New sign in user with google account will need to build a new database
        if (!userDoc.exists()) {
          return setDoc(userDocRef, {
            uid: user.uid,
            username: user.email,
            registeredAt: new Date()
          }).then(() => {
            console.log('User document created')
          })
        } else {
          // if user is not first time log in with google, it will do not need a new database
          console.log('User document already exists')
        }
      })
    })
    .then(() => {
      // Nav to home page
      router.push('/')
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData?.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.error('Error signing in with Google:', errorCode, errorMessage, email, credential)
      alert(`Error: ${errorMessage}`)
    })
}
</script>

<style scoped>
.login-btn {
  cursor: pointer;
  transition: color 0.3s;
}
</style>
