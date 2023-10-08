import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBidzH9O_ZMhHTPI68VS83GwSK5Pl32rPo",
  authDomain: "student-m-s.firebaseapp.com",
  projectId: "student-m-s",
  storageBucket: "student-m-s.appspot.com",
  messagingSenderId: "736257336739",
  appId: "1:736257336739:web:8706f5fd884189ac286616",
  measurementId: "G-GRXR6ZW2QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app)
export {app,auth,firestore}