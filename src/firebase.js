import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAL2t8wMFxzEco3Z1JIu73aSzroJBeBw0M",
  authDomain: "superdad-app.firebaseapp.com",
  projectId: "superdad-app",
  storageBucket: "superdad-app.firebasestorage.app",
  messagingSenderId: "1022619437742",
  appId: "1:1022619437742:web:63191dabcfc1d650d4bb3f",
  measurementId: "G-V6WWJ3F6NG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);