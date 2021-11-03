// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

  const firebaseConfig = {
    apiKey: "AIzaSyAwQK1gim4R-L5JUeEALQXBlMndLCPk-tY",
    authDomain: "easytruck-bb12f.firebaseapp.com",
    projectId: "easytruck-bb12f",
    storageBucket: "easytruck-bb12f.appspot.com",
    messagingSenderId: "234163938183",
    appId: "1:234163938183:web:3327c4048ac6b5824e2922"
  };

  // Initialize Firebase
  

function data(){
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      return db;
}     

export default {
  data
};