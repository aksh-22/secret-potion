import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB74zKK3JQened58BwdUmFfRsnv1K6tZvA',
  authDomain: 'secret-potion-63a30.firebaseapp.com',
  databaseURL: 'https://secret-potion-63a30-default-rtdb.firebaseio.com',
  projectId: 'secret-potion-63a30',
  storageBucket: 'secret-potion-63a30.appspot.com',
  messagingSenderId: '165402104909',
  appId: '1:165402104909:web:7790d518b35bde8d1cf804',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.database();
