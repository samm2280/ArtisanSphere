// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/firestore'; // or 'firebase/database' if using Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyAOD71J0RWnNiPM9ly9GxqeUdzKfLfgYTA",
    authDomain: "artisans-774fd.firebaseapp.com",
    projectId: "artisans-774fd",
    storageBucket: "artisans-774fd.appspot.com",
    messagingSenderId: "93179578940",
    appId: "1:93179578940:web:b8cbf8431c9cd6ba241139",
    measurementId: "G-T6LZ472YEY" // For Firebase Analytics
};

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const firestore = firebase.firestore(); // or firebase.database() for Realtime Database

export { analytics, firestore };
