<template>
  <div class="container mt-5 d-flex flex-column justify-content-center align-items-center">
    <h1 class="text-center mb-4">Login</h1>
    <form class="w-100" style="max-width: 400px">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
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
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
