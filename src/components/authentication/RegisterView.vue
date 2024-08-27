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
      <div class="mb-3">
        <label class="form-label">Confirm password</label>
        <input type="password" class="form-control" />
      </div>
      <!-- <button type="submit" class="btn btn-primary w-100">Registor</button> -->
      <router-link class="btn btn-lg btn-primary w-100" to="/authentication/login"
        >Registor</router-link
      >
    </form>
  </div>
</template>

<script setup></script>
<style scoped></style>
