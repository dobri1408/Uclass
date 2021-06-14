var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/firestore");
const app = firebase.initializeApp({
    apiKey: "AIzaSyBxpKNSHOVkHE6hxtqtKGQKHYFMJtrRUIY",
    authDomain: "azur-development.firebaseapp.com",
    projectId: "azur-development",
    storageBucket: "azur-development.appspot.com",
    messagingSenderId: "224468610336",
    appId: "1:224468610336:web:bd7ae4ef1a4d78b39cfb45"
  });
  // Initialize Firebase
export const auth = app.auth();
export const db=app.firestore();
export const storage = app.storage();
export default app;