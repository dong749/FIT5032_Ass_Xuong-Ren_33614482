// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { initializeApp } from 'firebase/app'
import { createApp } from 'vue'
import App from './App.vue'
import router from '..'

const firebaseConfig = {
  apiKey: 'AIzaSyBBZ-4encZKCgCOwpg7nwtHRIhAtjNYdd8',
  authDomain: 'mentalhealthy-a5f2f.firebaseapp.com',
  projectId: 'mentalhealthy-a5f2f',
  storageBucket: 'mentalhealthy-a5f2f.appspot.com',
  messagingSenderId: '625158198390',
  appId: '1:625158198390:web:57e82a5f0a474edb5d7b57',
  measurementId: 'G-S618F7FE8D'
}

initializeApp(firebaseConfig)
const app = createApp(App)

app.use(router)

app.mount('#app')
