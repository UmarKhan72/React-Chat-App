import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
  apiKey: "AIzaSyBawQ4pD3IfdVfBS_IjlviSAoyQySMFYd4",
  authDomain: "react-chat-app-e4f0b.firebaseapp.com",
  projectId: "react-chat-app-e4f0b",
  storageBucket: "react-chat-app-e4f0b.appspot.com",
  messagingSenderId: "299544689197",
  appId: "1:299544689197:web:955016b25fff8a62a3d6a4",
  measurementId: "G-T3BWRNTCZX"
};

firebase.initializeApp(firebaseConfig);

export default firebase;