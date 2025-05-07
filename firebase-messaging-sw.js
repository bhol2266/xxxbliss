// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
import { getMessaging } from "firebase/messaging";
import { initializeApp } from "firebase/app";


// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCVEgwafQ32QhL_3Ryy32HPWa9z0VwDvyE",
    authDomain: "chutlunds-bb715.firebaseapp.com",
    projectId: "chutlunds-bb715",
    storageBucket: "chutlunds-bb715.appspot.com",
    messagingSenderId: "222815612544",
    appId: "1:222815612544:web:0b6e300f86ac2e8f0c8065",
    measurementId: "G-QKBDVB9GVP",
    databaseURL: "https://chutlunds-bb715-default-rtdb.asia-southeast1.firebasedatabase.app",
};

initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = getMessaging(app);

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});