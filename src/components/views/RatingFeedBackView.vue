<template>
  <div class="container mt-5 d-flex flex-column justify-content-center align-items-center">
    <h1>Rating</h1>
    <p>Sum: {{ sum }}</p>
    <p>Count: {{ count }}</p>
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
          min="1"
          max="10"
          v-model="rating.score"
        />
      </div>
      <div class="mb-3">
        <label for="reason" class="form-label">Reason</label>
        <textarea
          class="form-control"
          id="reason"
          name="reason"
          v-model="rating.reason"
          rows="4"
        ></textarea>
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

const submitRating = async () => {
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
