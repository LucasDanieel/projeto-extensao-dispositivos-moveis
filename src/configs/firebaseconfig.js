import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth }  from "firebase/auth";
import { getReactNativePersistence } from '@firebase/auth/react-native';
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVAXpzE3I3W40TWsjnxpRa5xHsuDf62rM",
  authDomain: "projeto-igreja-8362d.firebaseapp.com",
  projectId: "projeto-igreja-8362d",
  storageBucket: "projeto-igreja-8362d.appspot.com",
  messagingSenderId: "256976557542",
  appId: "1:256976557542:web:7bfd479cfa9fe106fbb227",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const hd = getStorage(app);
