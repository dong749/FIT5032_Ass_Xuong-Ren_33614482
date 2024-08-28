<!-- https://getbootstrap.com/docs/5.0/examples/headers/# -->
<template>
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <a
        href="/"
        class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
      >
        <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
          <use xlink:href="#bootstrap" />
        </svg>
      </a>

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
      </ul>

      <div class="col-md-3 text-end">
        <!-- <button type="button" class="btn btn-outline-primary me-3">Login</button>
        <button type="button" class="btn btn-outline-primary">Sign-up</button> -->
        <router-link to="/authentication/login" class="btn btn-outline-primary me-3"
          >Login</router-link
        >
        <router-link to="/authentication/registor" class="btn btn-outline-primary"
          >Registor</router-link
        >
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
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

var isLogin = false

// https://firebase.google.com/docs/reference/js/auth.user
onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // ...
    isLogin = true
  } else {
    console.log('user has been logged out')
  }
})

const finishSignOut = () => {
  if (isLogin) {
    signOut(getAuth())
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
}
</script>

<style scoped></style>
