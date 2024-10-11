<template>
  <div class="container">
    <h1>Our Workshop Locations</h1>
    <div>
      <GoogleMap
        ref="mapRef"
        api-key="AIzaSyBJl9e3iuNT08eFjSx5CHrFc9KQgznnr2c"
        style="width: 100%; height: 700px"
        :center="center"
        :zoom="10"
      >
        <Marker
          v-for="(location, index) in locations"
          :key="index"
          :options="{ position: location.position }"
          @click="showInforWindow(location)"
        />

        <InfoWindow
          v-if="branchInforSelected"
          :options="{
            position: {
              lat: branchInforSelected.position.lat,
              lng: branchInforSelected.position.lng
            }
          }"
        >
          <div>
            <h3>{{ branchInforSelected.workPlaceName }}</h3>
            <p>Address: {{ branchInforSelected.address }}</p>
            <p>Contact: {{ branchInforSelected.contact }}</p>
          </div>
        </InfoWindow>
      </GoogleMap>
    </div>
    <hr />
    <h3>How to find us</h3>
    <form @submit.prevent="navgation">
      <div class="form-group mt-4">
        <label for="startPoint">Start Position</label>
        <input
          type="text"
          id="startPoint"
          class="form-group mt-2"
          v-model="startPoint"
          placeholder="Enter your current position"
          ref="autocompleteInput"
          required
        />
      </div>
      <div class="form-group mt-4">
        <label for="endPoint">End Position</label>
        <select v-model="branchInforSelectedId" class="form-control mt-2" required>
          <option v-for="location in locations" :key="location.id" :value="location.id">
            {{ location.workPlaceName }}
          </option>
        </select>
      </div>
      <div class="form-group mt-4">
        <label for="transportationType" class="form-label">Transportation</label>
        <select v-model="transportationType" class="form-control mt-2" required>
          <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary brn-block mt-4">Navigation</button>
    </form>
    <hr />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/FirbaseConfig.js'

const center = ref({ lat: -37.914021, lng: 145.134734 })
const locations = ref([])
const branchInforSelected = ref(null)
const startPoint = ref('')
const transportationType = ref('')
const branchInforSelectedId = ref('')
const mapRef = ref(null)
const routeDetails = ref(null)
const types = ['DRIVING', 'TRANSIT', 'WALKING', 'BICYCLING']

const autocomplete = ref(null)

let directionsRenderer = null

async function loadWorkshopData() {
  try {
    const querySnapshot = await getDocs(collection(db, 'WorkPlace'))
    const locationPromises = []

    querySnapshot.forEach((doc) => {
      const workshopData = doc.data()
      const branch = {
        id: doc.id,
        workPlaceName: workshopData.workPlaceName,
        address: workshopData.address,
        contact: workshopData.contact
      }
      locationPromises.push(
        getCoordinatesFromAddress(branch.address).then((position) => {
          return { ...branch, position }
        })
      )
    })

    const positions = await Promise.all(locationPromises)
    locations.value = positions.filter((position) => position !== null)
  } catch (error) {
    console.error('Error fetching documents:', error)
  }
}

async function getCoordinatesFromAddress(address) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBJl9e3iuNT08eFjSx5CHrFc9KQgznnr2c`
  )
  const data = await response.json()

  if (data.status === 'OK') {
    const location = data.results[0].geometry.location
    return { lat: location.lat, lng: location.lng }
  } else {
    console.error('Geocoding failed:', data.status)
    return null
  }
}

const showInforWindow = (location) => {
  branchInforSelected.value = location
  center.value = location.position
}

const navgation = () => {
  const selectedBranch = locations.value.find(
    (location) => location.id === branchInforSelectedId.value
  )
  if (!startPoint.value || !selectedBranch || !transportationType.value) {
    alert('Lack of information, cannot start navigation')
    return
  }

  const directionsService = new google.maps.DirectionsService()

  if (!directionsRenderer) {
    directionsRenderer = new google.maps.DirectionsRenderer()
    directionsRenderer.setMap(mapRef.value.map)
  } else {
    directionsRenderer.set('directions', null)
  }

  const travel = {
    origin: startPoint.value,
    destination: selectedBranch.address,
    travelMode: google.maps.TravelMode[transportationType.value]
  }

  directionsService.route(travel, (result, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(result)
      routeDetails.value = result.routes[0].legs[0]
    } else {
      alert('Error message: ' + status)
    }
  })
}

onMounted(async () => {
  await loadWorkshopData()

  autocomplete.value = await new google.maps.places.Autocomplete(
    document.getElementById('startPoint'),
    { componentRestrictions: { country: 'au' } }
  )
  autocomplete.value.addListener('place_changed', () => {
    const place = autocomplete.value.getPlace()
    if (place.geometry) {
      startPoint.value = place.formatted_address
      center.value = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
    }
  })
})

loadWorkshopData()
</script>

<style scoped></style>
