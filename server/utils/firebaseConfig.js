const { initializeApp, applicationDefault } = require("firebase-admin/app");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

// let admin = require("firebase-admin");
// let serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// For Firebase Admin SDK only
const firebaseConfig = {
  storageBucket: "plaza-54500.appspot.com",
  credential: applicationDefault()
};

// For Firebase SDK only
// const firebaseConfig = {
//   apiKey: "AIzaSyCh0PX8aUmrYhsNDiPy1WtgSwLx762D7iQ",
//   authDomain: "plaza-54500.firebaseapp.com",
//   projectId: "plaza-54500",
//   storageBucket: "plaza-54500.appspot.com",
//   messagingSenderId: "636820117840",
//   appId: "1:636820117840:web:bc906861147e966cf27455",
//   measurementId: "G-J3ZY8SWJBD",
// };

// Initialize Firebase
const initializeFirebase = () => {
  const app = initializeApp(firebaseConfig);

  return app;
};

module.exports = initializeFirebase;
