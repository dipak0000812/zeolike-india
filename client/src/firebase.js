// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './firebase/firebaseConfig'; // Corrected import path

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication service
export const auth = getAuth(app); 