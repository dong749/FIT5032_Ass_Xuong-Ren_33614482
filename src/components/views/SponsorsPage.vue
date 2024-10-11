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
    <div>
      <button @click="exportCSV">Export as a .csv file</button>
    </div>
    <br />
    <div>
      <button @click="exportPDF">Export as a .pdf file</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import json from '../Json/Json.json'
import Papa from 'papaparse'
import { jsPDF } from 'jspdf'

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

const exportPDF = () => {
  const file = new jsPDF()

  file.text('Sponsors List', 10, 10)

  let startY = 20
  file.text('Name', 10, startY)
  file.text('Website', 100, startY)

  sponsors.value.forEach((sponsor, index) => {
    const rowY = startY + (index + 1) * 10
    file.text(sponsor.name, 10, rowY)
    file.text(sponsor.website, 100, rowY)
  })

  file.save('sponsors_list.pdf')
}
</script>

<style scoped></style>
