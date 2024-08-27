<template>
  <div class="container">
    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link px-2 text-body-secondary"
            active-class="active"
            aria-current="page"
            >Home Page</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/views/about-us"
            class="nav-link px-2 text-body-secondary"
            active-class="active"
            >About Us</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/views/sponsors"
            class="nav-link px-2 text-body-secondary"
            active-class="active"
            >Sponsors</router-link
          >
        </li>
      </ul>
      <p class="text-center text-body-secondary">&copy; 2024 Company, Inc</p>
    </footer>
  </div>
</template>

<script setup></script>

<style scoped></style>
