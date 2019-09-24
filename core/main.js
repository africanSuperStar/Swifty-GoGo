import * as firebase from "firebase/app";

import {
    config
} from "./config";

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

var disqus_config = function () {
    // we are using document.location.* here because Jekyll code does not work well in JS code.
    this.page.url = document.location.href;
    this.page.identifier = document.location.pathname;
};

// You should be able to get the following lines of code from your Disqus admin.
// https://disqus.com/admin/universalcode
(function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = '//swifty-gogo.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();

export { disqus_config };