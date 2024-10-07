<template>
  <h1>Our Workshop Locations</h1>
  <div class="map-container">
    <GoogleMap
      api-key="AIzaSyBJl9e3iuNT08eFjSx5CHrFc9KQgznnr2c"
      style="width: 65%; height: 700px"
      :center="center"
      :zoom="10"
    >
      <Marker
        v-for="(location, index) in locations"
        :key="index"
        :options="{ position: location.position }"
        @click="showInforWindow(location)"
      />

      <!-- 这里显示 InfoWindow -->
      <InfoWindow v-if="branchInforSelected" :position="branchInforSelected.position">
        <div>
          <h3>{{ branchInforSelected.name }}</h3>
          <p>Address: {{ branchInforSelected.address }}</p>
          <p>Contact: {{ branchInforSelected.contact }}</p>
        </div>
      </InfoWindow>
    </GoogleMap>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/FirbaseConfig.js'

const center = ref({ lat: -37.914021, lng: 145.134734 })

// 存储多个位置的经纬度
const locations = ref([])
const branchInforSelected = ref(null)

// 获取多个文档并将地址转换为经纬度
async function loadWorkshopData() {
  try {
    const querySnapshot = await getDocs(collection(db, 'WorkPlace'))
    const locationPromises = []

    // 遍历每个文档
    querySnapshot.forEach((doc) => {
      const workshopData = doc.data()
      const branch = {
        name: workshopData.name,
        address: workshopData.address,
        contact: workshopData.contact
      }
      // 将地址转换为经纬度并保存
      locationPromises.push(
        getCoordinatesFromAddress(branch.address).then((position) => {
          return { ...branch, position } // 返回包括位置的对象
        })
      )
    })

    // 等待所有地址转换完成并过滤无效位置
    const positions = await Promise.all(locationPromises)
    locations.value = positions.filter((position) => position !== null)
  } catch (error) {
    console.error('Error fetching documents:', error)
  }
}

// 调用函数以加载数据
loadWorkshopData()

// 将地址转换为经纬度的函数
async function getCoordinatesFromAddress(address) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyBJl9e3iuNT08eFjSx5CHrFc9KQgznnr2c`
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

// 显示信息窗口
const showInforWindow = (location) => {
  branchInforSelected.value = location // 设置选中的分支
}

console.log(branchInforSelected)
</script>

<style scoped>
.map-container {
  display: flex;
  justify-content: center;
  height: 100vh;
}
</style>
