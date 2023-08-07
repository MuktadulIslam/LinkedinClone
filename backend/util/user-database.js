const db = require('./firebase');
module.exports = db.collection("user");

// const admin = require('firebase-admin');
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://console.firebase.google.com/u/0/project/linkedin-a8744/firestore/data/~2Fuser~2Fbsse1215@iit.du.ac.bd' // Update with your Firebase project URL
// });