import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcsAiPlkMhwDlTd7wPn6cwzt8Ke7bhcq8",
  authDomain: "react-auth-fd909.firebaseapp.com",
  projectId: "react-auth-fd909",
  storageBucket: "react-auth-fd909.appspot.com",
  messagingSenderId: "726479389155",
  appId: "1:726479389155:web:98c65e90a1f37929efe0d6",
  measurementId: "G-MWJ60P743X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();