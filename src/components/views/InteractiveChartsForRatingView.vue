<template>
  <div>
    <h2>Score Statistics</h2>
    <canvas id="scoreChart" width="300" height="100"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/FirbaseConfig'
import Chart from 'chart.js/auto'

const scores = ref([])

const getRatingScores = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'rating'))
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      scores.value.push(data.score)
    })
    renderChart()
  } catch (error) {
    console.error('Error Message:', error)
  }
}

const renderChart = () => {
  const ctx = document.getElementById('scoreChart').getContext('2d')
  const scoreDistribution = {}
  scores.value.forEach((score) => {
    scoreDistribution[score] = (scoreDistribution[score] || 0) + 1
  })

  const labels = Object.keys(scoreDistribution)
  const data = Object.values(scoreDistribution)

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Score counts',
          data: data,
          borderWidth: 0.5
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

onMounted(getRatingScores)
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>
