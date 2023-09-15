import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA30i8n0tUtu30mhIIZoCj7PMsMxFaA6-g",
  authDomain: "mobileposts-e8891.firebaseapp.com",
  projectId: "mobileposts-e8891",
  storageBucket: "mobileposts-e8891.appspot.com",
  messagingSenderId: "1034583650861",
  appId: "1:1034583650861:web:089cc598df4597d54c7ea4",
  measurementId: "G-1X1RLM5CLP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
