import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyALqKsLYnP3ZSDJoYNc_X1RRQcMHp2X-Tk",
    authDomain: "mobiili-fb.firebaseapp.com",
    projectId: "mobiili-fb",
    storageBucket: "mobiili-fb.appspot.com",
    messagingSenderId: "138005841197",
    appId: "1:138005841197:web:fd29d1f463e6e6cbfe3fa4"  
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };