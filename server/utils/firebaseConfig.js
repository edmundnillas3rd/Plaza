const { initializeApp, applicationDefault } = require("firebase-admin/app");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

// For Firebase Admin SDK only
const firebaseConfig = {
  storageBucket: "plaza-54500.appspot.com",
  credential: applicationDefault()
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase
const initializeFirebase = () => {
  return app;
};

module.exports = initializeFirebase;
