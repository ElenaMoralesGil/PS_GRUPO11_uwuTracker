// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyA0fOXi_EkLYgoVWl-wRw3LgGwgfLkixSg",
    authDomain: "ps-uwutracker.firebaseapp.com",
    projectId: "ps-uwutracker",
    storageBucket: "ps-uwutracker.appspot.com",
    messagingSenderId: "30268734424",
    appId: "1:30268734424:web:cf2c28ea2d44e4e38b90ad",
    measurementId: "G-YY3Y9EL1JX"
  }
  
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);