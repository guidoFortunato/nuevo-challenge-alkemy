import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAKSZLjkLyBVwCs9cRd86mTm-sUld_S9Y4",
    authDomain: "challenge-alkemy.firebaseapp.com",
    projectId: "challenge-alkemy",
    storageBucket: "challenge-alkemy.appspot.com",
    messagingSenderId: "254585904675",
    appId: "1:254585904675:web:f67d03bed337fe0d70db96"
  };
  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  const db = app.firestore()
  const auth = app.auth()

  export { db, auth }
