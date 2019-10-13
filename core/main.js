import * as firebase from "firebase/app";

import "./swift";
import "./simple-d3";

import {
    config
} from "./config";

hljs.initHighlightingOnLoad();

var firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: "swifty-gogo.firebaseapp.com",
    databaseURL: "https://swifty-gogo.firebaseio.com",
    projectId: "swifty-gogo",
    storageBucket: "",
    messagingSenderId: config.senderId,
    appId: config.appId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);