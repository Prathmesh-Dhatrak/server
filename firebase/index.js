var admin = require("firebase-admin");

var serviceAccount = require("../config/twometersquare-firebase-adminsdk-o0c29-9ac83e0100.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"https://twometersquare-default-rtdb.europe-west1.firebasedatabase.app",

});

module.exports = admin;
