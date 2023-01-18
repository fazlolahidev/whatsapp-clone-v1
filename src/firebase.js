import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkmq4SjQNNeVDe1lsUyx9SIU8ACmFDA1Y",
  authDomain: "whatsapp-clone-46d72.firebaseapp.com",
  projectId: "whatsapp-clone-46d72",
  storageBucket: "whatsapp-clone-46d72.appspot.com",
  messagingSenderId: "1084686126298",
  appId: "1:1084686126298:web:2113bb77c11f86ce8f29e3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

