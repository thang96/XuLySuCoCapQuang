import {initializeApp} from 'firebase/app';
import {
  getDatabase,
  ref as firebaseDatabaseRef,
  set as firebaseSet,
  get,
  child,
  onValue,
} from 'firebase/database';
//red = reference to a "collection"
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyD3fQPdUMgmXn9oyrqCLcxAI6ueXtrFcEE',
  authDomain: 'optical-cables-management.firebaseapp.com',
  projectId: 'optical-cables-management',
  storageBucket: 'optical-cables-management.appspot.com',
  messagingSenderId: '704533782472',
  appId: '1:704533782472:web:7112e43373a059b11ceafd',
  measurementId: 'G-JTW7L3L5W6',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firebaseDatabase = getDatabase();
export {
  auth,
  firebaseDatabase,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  firebaseSet,
  firebaseDatabaseRef,
  sendEmailVerification,
  get,
  child,
  onValue, //reload when db online change
  signInWithEmailAndPassword,
};
