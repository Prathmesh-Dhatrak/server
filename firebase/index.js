var admin = require("firebase-admin");

var serviceAccount = require("../config/twometersquareauth-development-firebase-adminsdk-1hnsp-b2284e14fd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"https://twometersquareauth-development-default-rtdb.firebaseio.com",

});

module.exports = admin;
