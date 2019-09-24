import {
    firebase
} from "firebase/app";

import * as cfg from "./config";

var firebaseConfig = {
    apiKey: cfg.config.apiKey,
    authDomain: "swifty-gogo.firebaseapp.com",
    databaseURL: "https://swifty-gogo.firebaseio.com",
    projectId: "swifty-gogo",
    storageBucket: "",
    messagingSenderId: cfg.config.senderId,
    appId: cfg.config.appId
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();
// messaging.usePublicVapidKey('AAAAouXOrZE:APA91bHL-y_gCgwysxOw5C7FcqZBrSqJ0ZPdaV-8eSnhT_HfXj19wQFPurHdrYKh1nRLDrwEWHwaBSkL75kycXLvrVju90U0Zdlnk_sT3jSzwrDIYYyluxyn_amgFWoZEMuC0avGxJJq');

// Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//         console.log('Notification permission granted.');
//         // TODO(developer): Retrieve an Instance ID token for use with FCM.
//         // ...
//     } else {
//         console.log('Unable to get permission to notify.');
//     }
// });

// // IDs of divs that display Instance ID token UI or request permission UI.
// const tokenDivId = 'token_div';
// const permissionDivId = 'permission_div';

// // Callback fired if Instance ID token is updated.
// messaging.onTokenRefresh(() => {
//     messaging.getToken().then((refreshedToken) => {
//         console.log('Token refreshed.');
//         // Indicate that the new Instance ID token has not yet been sent to the
//         // app server.
//         setTokenSentToServer(false);
//         // Send Instance ID token to app server.
//         sendTokenToServer(refreshedToken);
//         // [START_EXCLUDE]
//         // Display new Instance ID token and clear UI of all previous messages.
//         resetUI();
//         // [END_EXCLUDE]
//     }).catch((err) => {
//         console.log('Unable to retrieve refreshed token ', err);
//         showToken('Unable to retrieve refreshed token ', err);
//     });
// });

// // Handle incoming messages. Called when:
// // - a message is received while the app has focus
// // - the user clicks on an app notification created by a service worker
// //   `messaging.setBackgroundMessageHandler` handler.
// messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);

//     // Update the UI to include the received message.
//     appendMessage(payload);
// });

// function resetUI() {
//     clearMessages();
//     showToken('loading...');
//     // [START get_token]
//     // Get Instance ID token. Initially this makes a network call, once retrieved
//     // subsequent calls to getToken will return from cache.
//     messaging.getToken().then((currentToken) => {
//         if (currentToken) {
//             sendTokenToServer(currentToken);
//             updateUIForPushEnabled(currentToken);
//         } else {
//             // Show permission request.
//             console.log('No Instance ID token available. Request permission to generate one.');
//             // Show permission UI.
//             updateUIForPushPermissionRequired();
//             setTokenSentToServer(false);
//         }
//     }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//         showToken('Error retrieving Instance ID token. ', err);
//         setTokenSentToServer(false);
//     });
// }

// function showToken(currentToken) {
//     // Show token in console and UI.
//     const tokenElement = document.querySelector('#token');
//     tokenElement.textContent = currentToken;
// }
// // Send the Instance ID token your application server, so that it can:
// // - send messages back to this app
// // - subscribe/unsubscribe the token from topics
// function sendTokenToServer(currentToken) {
//     if (!isTokenSentToServer()) {
//         console.log('Sending token to server...');
//         // TODO(developer): Send the current token to your server.
//         setTokenSentToServer(true);
//     } else {
//         console.log('Token already sent to server so won\'t send it again ' +
//             'unless it changes');
//     }
// }

// function isTokenSentToServer() {
//     return window.localStorage.getItem('sentToServer') === '1';
// }

// function setTokenSentToServer(sent) {
//     window.localStorage.setItem('sentToServer', sent ? '1' : '0');
// }

// function showHideDiv(divId, show) {
//     const div = document.querySelector('#' + divId);
//     if (show) {
//         div.style = 'display: visible';
//     } else {
//         div.style = 'display: none';
//     }
// }

// function requestPermission() {
//     console.log('Requesting permission...');
//     // [START request_permission]
//     Notification.requestPermission().then((permission) => {
//         if (permission === 'granted') {
//             console.log('Notification permission granted.');
//             // TODO(developer): Retrieve an Instance ID token for use with FCM.
//             // [START_EXCLUDE]
//             // In many cases once an app has been granted notification permission,
//             // it should update its UI reflecting this.
//             resetUI();
//             // [END_EXCLUDE]
//         } else {
//             console.log('Unable to get permission to notify.');
//         }
//     });
//     // [END request_permission]
// }

// function deleteToken() {
//     // Delete Instance ID token.
//     // [START delete_token]
//     messaging.getToken().then((currentToken) => {
//         messaging.deleteToken(currentToken).then(() => {
//             console.log('Token deleted.');
//             setTokenSentToServer(false);
//             // [START_EXCLUDE]
//             // Once token is deleted update UI.
//             resetUI();
//             // [END_EXCLUDE]
//         }).catch((err) => {
//             console.log('Unable to delete token. ', err);
//         });
//         // [END delete_token]
//     }).catch((err) => {
//         console.log('Error retrieving Instance ID token. ', err);
//         showToken('Error retrieving Instance ID token. ', err);
//     });
// }
// // Add a message to the messages element.
// function appendMessage(payload) {
//     const messagesElement = document.querySelector('#messages');
//     const dataHeaderELement = document.createElement('h5');
//     const dataElement = document.createElement('pre');
//     dataElement.style = 'overflow-x:hidden;';
//     dataHeaderELement.textContent = 'Received message:';
//     dataElement.textContent = JSON.stringify(payload, null, 2);
//     messagesElement.appendChild(dataHeaderELement);
//     messagesElement.appendChild(dataElement);
// }
// // Clear the messages element of all children.
// function clearMessages() {
//     const messagesElement = document.querySelector('#messages');
//     while (messagesElement.hasChildNodes()) {
//         messagesElement.removeChild(messagesElement.lastChild);
//     }
// }

// function updateUIForPushEnabled(currentToken) {
//     showHideDiv(tokenDivId, true);
//     showHideDiv(permissionDivId, false);
//     showToken(currentToken);
// }

// function updateUIForPushPermissionRequired() {
//     showHideDiv(tokenDivId, false);
//     showHideDiv(permissionDivId, true);
// }

// resetUI();