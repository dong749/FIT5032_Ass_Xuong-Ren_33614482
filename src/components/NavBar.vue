<!-- https://getbootstrap.com/docs/5.0/examples/headers/# -->
<template>
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home Page</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/views/about-us" class="nav-link" active-class="active"
            >About Us</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/views/sponsors" class="nav-link" active-class="active"
            >Sponsors</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/views/Learning" class="nav-link" active-class="active"
            >Learning Form</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/views/Help" class="nav-link" active-class="active"
            >Need Help?</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/views/join" class="nav-link" active-class="active">Join Us</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/views/RatingFeedBackView" class="nav-link" active-class="active"
            >Rating</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/views/InteractiveChartsForRating" class="nav-link" active-class="active"
            >Rating Statistics</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/views/AdminDashboardView" class="nav-link" active-class="active"
            >Admin Data</router-link
          >
        </li>
      </ul>

      <div class="col-md-3 text-end">
        <template v-if="!isLogin">
          <router-link to="/authentication/login" class="btn btn-outline-primary me-3"
            >Login</router-link
          >
          <router-link to="/authentication/registor" class="btn btn-outline-primary"
            >Register</router-link
          >
        </template>

        <template v-else>
          <span class="me-3">{{ userEmail }}</span>
          <button @click="finishSignOut" class="btn btn-outline-danger">Logout</button>
        </template>
      </div>
    </header>
  </div>
  <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home Page</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/views/about-us" class="nav-link" active-class="active"
            >About Us</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/views/sponsors" class="nav-link" active-class="active"
            >Sponsors</router-link
          >
        </li>
      </div>
    </div>
  </nav> -->
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const isLogin = ref(false)
const userEmail = ref('')

onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    isLogin.value = true
    userEmail.value = user.email
  } else {
    isLogin.value = false
    userEmail.value = ''
  }
})

const finishSignOut = () => {
  const auth = getAuth()
  if (isLogin.value) {
    signOut(auth)
      .then(() => {
        console.log('User signed out')
      })
      .catch((error) => {
        console.log('Error signing out:', error.message)
      })
  }
}
</script>

<style scoped></style>
