import Firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCu4xtJdLrlTorfr9KNSQKC_pV59kXx4h0',
  authDomain: 'holyjs-79f08.firebaseapp.com',
  databaseURL: 'https://holyjs-79f08.firebaseio.com',
  projectId: 'holyjs-79f08',
  storageBucket: 'holyjs-79f08.appspot.com',
  messagingSenderId: '636196253853',
};

Firebase.initializeApp(config);

export default Firebase;
