import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgZ8EB3VcucovwkZqBGQPG1q8bwRgB6Jw",
  authDomain: "todo-firebase-app-d60f3.firebaseapp.com",
  projectId: "todo-firebase-app-d60f3",
  storageBucket: "todo-firebase-app-d60f3.appspot.com",
  messagingSenderId: "856317405956",
  appId: "1:856317405956:web:6c237d56767032d8fefe51",
  measurementId: "G-Y2XGF18GEK"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app)
export {app,auth,firestore}