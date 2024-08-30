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
import { onMounted, ref } from 'vue'
import { onSnapshot, collection, addDoc } from 'firebase/firestore'
import { db } from '@/FirbaseConfig'

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

const sum = ref(0)
const count = ref(0)
const ratingList = ref([])

onMounted(() => {
  const q = collection(db, 'rating')
  onSnapshot(q, (querySnapshot) => {
    let tempRatings = []
    let totalScore = 0
    querySnapshot.forEach((doc) => {
      const rating = {
        id: doc.id,
        patient: doc.data().patient,
        volunteer: doc.data().volunteer,
        score: doc.data().score,
        reason: doc.data().reason
      }
      tempRatings.push(rating)
      totalScore += doc.data().score
    })
    ratingList.value = tempRatings
    sum.value = totalScore
    count.value = tempRatings.length
  })
})

// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=zh-cn
// https://chatgpt.com/share/cb4da5aa-e52f-409f-a554-233cd57adbaf
const submitRating = async () => {
  validateReason(true)
  validateScore(true)
  if (!errors.value.score && !errors.value.reason) {
    try {
      await addDoc(collection(db, 'rating'), {
        patient: rating.value.patient,
        volunteer: rating.value.volunteer,
        score: rating.value.score,
        reason: rating.value.reason
      })

      rating.value = {
        patient: false,
        volunteer: false,
        score: 1,
        reason: ''
      }
    } catch (e) {
      console.error('Error adding document: ', e)
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
