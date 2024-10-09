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
    <button @click="exportCSV">Export as a .csv file</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import json from '../Json/Json.json'
import Papa from 'papaparse'

const sponsors = ref(json)

const exportCSV = () => {
  const csvData = sponsors.value.map((sponsor) => ({
    Name: sponsor.name,
    Website: sponsor.website
  }))

  const csv = Papa.unparse(csvData)

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'sponsors.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped></style>
