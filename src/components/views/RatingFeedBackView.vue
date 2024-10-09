<template>
  <div class="container mt-5 d-flex flex-column justify-content-center align-items-center">
    <h1>Rating</h1>
    <p>Sum: {{ sum }}</p>
    <p>Count: {{ count }}</p>
    <p v-if="count > 0">Average: {{ sum / count }}</p>
    <br />
    <form class="w-100" style="max-width: 600px" @submit.prevent="submitRating">
      <div class="row mb-3">
        <div class="col-md-6 col-sm-6">
          <input
            type="checkbox"
            class="form-check-input"
            id="isPatient"
            v-model="rating.patient"
            @change="toggleVolunteer('patient')"
          />
          <label class="form-check-label" for="isPatient">Patient</label>
        </div>
        <div class="col-md-6 col-sm-6">
          <input
            type="checkbox"
            class="form-check-input"
            id="isVolunteer"
            v-model="rating.volunteer"
            @change="toggleVolunteer('volunteer')"
          />
          <label class="form-check-label" for="isVolunteer">Volunteer</label>
        </div>
      </div>
      <div class="mb-3">
        <label for="score" class="form-label">Score</label>
        <input
          type="number"
          class="form-control"
          id="score"
          name="score"
          @blur="validateScore(true)"
          @input="validateScore(false)"
          v-model="rating.score"
        />
        <div v-if="errors.score" class="text-danger">{{ errors.score }}</div>
      </div>
      <div class="mb-3">
        <label for="reason" class="form-label">Reason</label>
        <textarea
          class="form-control"
          id="reason"
          name="reason"
          @blur="validateReason(true)"
          @input="validateReason(false)"
          v-model="rating.reason"
          rows="4"
        ></textarea>
        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
      </div>
      <button type="submit" class="btn btn-primary w-100">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/FirbaseConfig.js'

// Firestore 初始化
const ratingsCollection = collection(db, 'rating') // 替换为你的集合名称

const rating = ref({
  patient: false,
  volunteer: false,
  score: 1,
  reason: ''
})

const errors = ref({
  score: null,
  reason: null
})

// 统计评分总和和计数
const ratingsList = ref([]) // 用于存储评分数据

// 计算总和和计数
const sum = computed(() => ratingsList.value.reduce((acc, curr) => acc + curr.score, 0))
const count = computed(() => ratingsList.value.length)

// 获取评分数据
const fetchRatings = async () => {
  try {
    const snapshot = await getDocs(ratingsCollection)
    ratingsList.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) // 根据实际数据结构调整
  } catch (error) {
    console.error('Getting rating data error:', error)
  }
}

onMounted(() => {
  fetchRatings() // 在组件挂载时获取数据
})

const validateScore = (blur) => {
  if (rating.value.score < 1) {
    if (blur) {
      errors.value.score = 'The min of score should be 1'
    }
  } else if (rating.value.score > 10) {
    if (blur) {
      errors.value.score = 'The max of score should be 10'
    }
  } else {
    errors.value.score = null
  }
}

const validateReason = (blur) => {
  if (rating.value.reason.length === 0) {
    if (blur) {
      errors.value.reason = 'Reason can not be empty'
    }
  } else {
    errors.value.reason = null
  }
}

const submitRating = async () => {
  validateReason(true)
  validateScore(true)
  if (!errors.value.score && !errors.value.reason) {
    try {
      const response = await fetch(
        'https://us-central1-mentalhealthy-a5f2f.cloudfunctions.net/submitRating',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(rating.value)
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert(data.message)
        // 将新评分添加到评分列表
        ratingsList.value.push({ score: rating.value.score }) // 如果有更多数据，可以在这里添加更多字段

        // 清空表单
        rating.value = {
          patient: false,
          volunteer: false,
          score: 1,
          reason: ''
        }
      } else {
        console.error('Error:', data.error)
        alert('Rating error')
      }
    } catch (e) {
      console.error('Rating error:', e)
      alert('Rating error')
    }
  } else {
    alert('Input invalid')
  }
}

const toggleVolunteer = (role) => {
  if (role === 'patient') {
    if (rating.value.patient) {
      rating.value.volunteer = false
    }
  } else if (role === 'volunteer') {
    if (rating.value.volunteer) {
      rating.value.patient = false
    }
  }
}
</script>

<style scoped></style>
