// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Optional: Analytics (not needed for phone auth)
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBHml7RzEUEiwVadAHGUhk1fTqMaIkPqdU",
  authDomain: "zeolike-india.firebaseapp.com",
  projectId: "zeolike-india",
  storageBucket: "zeolike-india.firebasestorage.app",
  messagingSenderId: "469534742159",
  appId: "1:469534742159:web:1456d9953924f4226f82fa",
  measurementId: "G-KKVYBK0PNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
const auth = getAuth(app);

// Optional Analytics
const analytics = getAnalytics(app);

export { auth };
