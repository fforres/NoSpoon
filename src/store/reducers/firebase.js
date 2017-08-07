// import Firebase from 'firebase/app';
// import 'firebase/database';
import { setNewBalls } from './balls'

// const config = {
//   apiKey: 'AIzaSyCu4xtJdLrlTorfr9KNSQKC_pV59kXx4h0',
//   authDomain: 'holyjs-79f08.firebaseapp.com',
//   databaseURL: 'https://holyjs-79f08.firebaseio.com',
//   projectId: 'holyjs-79f08',
//   storageBucket: 'holyjs-79f08.appspot.com',
//   messagingSenderId: '636196253853',
// };
// Firebase.initializeApp(config);

import Firebase from '../../routes/DefendTheStick/socket/Firebase';

export default function reducer(state = {}) {
  return state;
}

export const connectPlayers = () => {
  console.log('asda');
  return {};
};

export const connectBalls = () => dispatch => {
  Firebase.database().ref('/users').on('value', (snapshot) => {
    const users = snapshot.val();
    dispatch(setNewBalls(users));
  })
}
