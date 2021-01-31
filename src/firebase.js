import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtJAgGxYy8_PbEJFqwvdjuiE_RAY-ZBW0",
  authDomain: "ecommerce-be594.firebaseapp.com",
  projectId: "ecommerce-be594",
  storageBucket: "ecommerce-be594.appspot.com",
  messagingSenderId: "789642835317",
  appId: "1:789642835317:web:8ec1266348908afa960f3c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
