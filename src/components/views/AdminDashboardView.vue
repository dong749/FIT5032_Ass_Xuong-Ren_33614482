<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <div class="stats">
      <div class="stat">
        <h2>Total Users</h2>
        <p>{{ totalUsers }}</p>
      </div>
      <div class="stat">
        <h2>User count with type</h2>
        <ul>
          <li v-for="(count, type) in userTypeCounts" :key="type">{{ type }}: {{ count }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/FirbaseConfig.js'
import { collection, getDocs } from 'firebase/firestore'

const totalUsers = ref(0)
const totalPatientUser = ref(0)
const totalVolunteerUser = ref(0)
const userTypeCounts = ref({})

const getUserDataFromFireStore = async () => {
  try {
    const userCollection = collection(db, 'users')
    const userDocs = await getDocs(userCollection)
    totalUsers.value = userDocs.size
    userDocs.forEach((doc) => {
      const userData = doc.data()
      if (userData.isPatient) {
        totalPatientUser.value++
      }
      if (userData.isVolunteer) {
        totalVolunteerUser.value++
      }

      let userType
      if (userData.isPatient) {
        userType = 'Patient'
      } else if (userData.isVolunteer) {
        userType = 'Volunteer'
      } else {
        userType = 'Other'
      }

      if (userTypeCounts.value[userType]) {
        userTypeCounts.value[userType]++
      } else {
        userTypeCounts.value[userType] = 1
      }
    })
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

onMounted(getUserDataFromFireStore)
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  text-align: center;
}
.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.stat {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
}
</style>
