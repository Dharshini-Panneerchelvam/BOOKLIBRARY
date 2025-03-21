// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBvbRqknpWnP46sivE27IHMoH2FX5dFJCk",
    authDomain: "booklibrary-28036.firebaseapp.com",
    projectId: "booklibrary-28036",
    storageBucket: "booklibrary-28036.firebasestorage.app",
    messagingSenderId: "432558270763",
    appId: "1:432558270763:web:7a7a50ed59de4839b67d6e"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
