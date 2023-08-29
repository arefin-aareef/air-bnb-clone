import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDg9DD01Am215NTTISTvnmEkO1M-AVrvfY",
  authDomain: "air-bnb-1a69a.firebaseapp.com",
  projectId: "air-bnb-1a69a",
  storageBucket: "air-bnb-1a69a.appspot.com",
  messagingSenderId: "101066096971",
  appId: "1:101066096971:web:8962e657023288af6c28ce"
};

export const app = initializeApp(firebaseConfig);