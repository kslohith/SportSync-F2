// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfktb6HP47pKDv1YtIekCdWHU_4ok5Ung",
  authDomain: "mas-backend.firebaseapp.com",
  databaseURL: "https://mas-backend-default-rtdb.firebaseio.com",
  projectId: "mas-backend",
  storageBucket: "mas-backend.appspot.com",
  messagingSenderId: "324847873930",
  appId: "1:324847873930:web:5fe66b86807a0a712e6273",
  measurementId: "G-FM9VHCQ97T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;

