import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDgZ8EB3VcucovwkZqBGQPG1q8bwRgB6Jw",
//   authDomain: "todo-firebase-app-d60f3.firebaseapp.com",
//   projectId: "todo-firebase-app-d60f3",
//   storageBucket: "todo-firebase-app-d60f3.appspot.com",
//   messagingSenderId: "856317405956",
//   appId: "1:856317405956:web:6c237d56767032d8fefe51",
//   measurementId: "G-Y2XGF18GEK"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA8YezukkMJzP1rMcTFaPN0DiMgUjTSvG0",
  authDomain: "sticky-wall-92a0c.firebaseapp.com",
  projectId: "sticky-wall-92a0c",
  storageBucket: "sticky-wall-92a0c.appspot.com",
  messagingSenderId: "595657336623",
  appId: "1:595657336623:web:b0ff7562b467169893a3da",
  measurementId: "G-NKXF8Z5R44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app)
export {app,auth,firestore}