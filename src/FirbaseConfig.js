import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBBZ-4encZKCgCOwpg7nwtHRIhAtjNYdd8',
  authDomain: 'mentalhealthy-a5f2f.firebaseapp.com',
  projectId: 'mentalhealthy-a5f2f',
  storageBucket: 'mentalhealthy-a5f2f.appspot.com',
  messagingSenderId: '625158198390',
  appId: '1:625158198390:web:57e82a5f0a474edb5d7b57',
  measurementId: 'G-S618F7FE8D'
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export { db }
