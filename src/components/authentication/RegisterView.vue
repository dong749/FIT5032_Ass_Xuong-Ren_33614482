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
      <div class="row mb-3">
        <div class="col-md-6 col-sm-6">
          <input
            type="checkbox"
            class="form-check-input"
            id="isPatient"
            v-model="formData.isPatient"
            @change="toggleVolunteer('patient')"
          />
          <label class="form-check-label" for="isPatient">Patient</label>
        </div>
        <div class="col-md-6 col-sm-6">
          <input
            type="checkbox"
            class="form-check-input"
            id="isVolunteer"
            v-model="formData.isVolunteer"
            @change="toggleVolunteer('volunteer')"
          />
          <label class="form-check-label" for="isVolunteer">Volunteer</label>
        </div>
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
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/FirbaseConfig'

const router = useRouter()

const formData = ref({
  username: '',
  password: '',
  isPatient: false,
  isVolunteer: false,
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
// https://chatgpt.com/share/ee2808de-4395-4ae5-8a48-3118db885a9b
const finishRegister = async () => {
  validateUsername(true)
  validatePassword(true)
  validateConfirmPassword(true)

  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        formData.value.username,
        formData.value.password
      )

      console.log('Register successfully')
      console.log(userCredential)

      const docRef = await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        username: formData.value.username,
        isPatient: formData.value.isPatient,
        isVolunteer: formData.value.isVolunteer,
        registeredAt: new Date()
      })
      console.log('Document written with ID: ', docRef.id)
      router.push('/')
    } catch (error) {
      console.error('Error during registration: ', error.message)
      alert(error.message)
    }
  }
}

// https://chatgpt.com/share/12abb89a-afcd-49e7-88cb-fec9623cf516
const toggleVolunteer = (role) => {
  if (role === 'patient') {
    if (formData.value.isPatient) {
      formData.value.isVolunteer = false
    }
  } else if (role === 'volunteer') {
    if (formData.value.isVolunteer) {
      formData.value.isPatient = false
    }
  }
}
</script>

<style scoped></style>
