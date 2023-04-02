// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuNWeVGjC2Lxt-FGGu0QFGcuLQTP_jNXE",
  authDomain: "boatbouncer-9f086.firebaseapp.com",
  projectId: "boatbouncer-9f086",
  storageBucket: "boatbouncer-9f086.appspot.com",
  messagingSenderId: "980002184001",
  appId: "1:980002184001:web:69afb51a5156b945311fc0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
