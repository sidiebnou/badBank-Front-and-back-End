import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAno0odA9iXW5BkAXTanF4gNjcPwLHPey4",
  authDomain: "bad-benk.firebaseapp.com",
  projectId: "bad-benk",
  storageBucket: "bad-benk.appspot.com",
  messagingSenderId: "408530980201",
  appId: "1:408530980201:web:2120be3081810a446841f8",
  measurementId: "G-4J45FSZKPP",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const githubAuthProvider = new GithubAuthProvider();
