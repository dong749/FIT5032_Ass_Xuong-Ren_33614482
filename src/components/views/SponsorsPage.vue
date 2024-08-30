<template>
  <div class="text-center">
    <h1>Sponsors</h1>
    <ul>
      <li v-for="sponsor in sponsors" :key="sponsor.id">
        <a :href="sponsor.website" target="_blank">
          <p>{{ sponsor.name }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import json from '../Json/Json.json'

const sponsors = ref(json)
</script>

<style></style>
