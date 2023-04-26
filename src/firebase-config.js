/**
 * To find your Firebase config object:
 * 
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyAEwDI9h28aKKvKoHFOPSgPS2DCnozvYTI",
    authDomain: "connectbus-7d8d9.firebaseapp.com",
    databaseURL: "https://connectbus-7d8d9-default-rtdb.firebaseio.com",
    projectId: "connectbus-7d8d9",
    storageBucket: "connectbus-7d8d9.appspot.com",
    messagingSenderId: "128399003759",
    appId: "1:128399003759:web:82eeea6e5988be22c73d9a",
    measurementId: "G-SKW79929K5"
};

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
  }
