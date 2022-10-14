import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAndrxGwR_mT7a6DcsQdrvzF3nlF0isSV0",
  authDomain: "video-f17bc.firebaseapp.com",
  projectId: "video-f17bc",
  storageBucket: "video-f17bc.appspot.com",
  messagingSenderId: "761041826292",
  appId: "1:761041826292:web:d760e4bfa36b62d6dc49a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
