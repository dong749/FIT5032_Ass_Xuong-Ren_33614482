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

<script>
import { onMounted, ref } from 'vue'
import { onSnapshot, collection, addDoc } from 'firebase/firestore'
import { db } from '@/FirbaseConfig'
import axios from 'axios'

export default {
  data() {
    return {
      count: 0,
      sum: 0,
      rating: {
        patient: false,
        volunteer: false,
        score: 1,
        reason: ''
      },
      errors: {
        score: null,
        reason: null
      }
    }
  },
  methods: {
    validateScore(blur) {
      if (this.rating.score < 1) {
        if (blur) {
          this.value.score = 'The min of score should be 1'
        }
      } else if (this.rating.score > 10) {
        if (blur) {
          this.errors.score = 'The max of score should be 10'
        }
      } else {
        this.errors.score = null
      }
    },

    validateReason(blur) {
      if (this.rating.reason.length === 0) {
        if (blur) {
          this.errors.reason = 'Reason can not be empty'
        }
      } else {
        this.errors.reason = null
      }
    },

    toggleVolunteer(role) {
      if (role === 'patient') {
        if (this.rating.patient) {
          this.rating.volunteer = false
        }
      } else if (role === 'volunteer') {
        if (this.rating.volunteer) {
          this.rating.patient = false
        }
      }
    },

    async caculateRating() {
      try {
        const response = await axios.get('https://caculaterating-q6svw5qz6q-uc.a.run.app')
        console.log(response.data)
        this.count = response.data.count
        this.sum = response.data.sum
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message)
      }
    },

    async submitRating() {
      this.validateScore(true)
      this.validateReason(true)
      if (this.errors.reason || this.errors.score) {
        alert('Input invalid')
        return
      }
      try {
        await axios.post('https://submitrating-q6svw5qz6q-uc.a.run.app', {
          patient: this.rating.patient,
          reason: this.rating.reason,
          score: this.rating.score,
          volunteer: this.rating.volunteer
        })
        this.sum += this.rating.score
        this.count += 1

        this.rating.patient = false
        this.rating.volunteer = false
        this.rating.score = 0
        this.rating.reason = 0

        await this.caculateRating()
      } catch (error) {
        console.error('Error', error.message)
      }
    }
  },
  mounted() {
    this.caculateRating()
  }
}
</script>

<style scoped></style>
