import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBewKaPrFdM-ut5U7Zalt3CYCI-hdO6JJc',
  authDomain: 'resucito-cantos-json.firebaseapp.com',
  projectId: 'resucito-cantos-json',
  storageBucket: 'resucito-cantos-json.firebasestorage.app',
  messagingSenderId: '249567995179',
  appId: '1:249567995179:web:a509c4b9b4afa6f434116e',
  measurementId: 'G-G8FMRVNZ84'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()

export const db = getFirestore(app)
