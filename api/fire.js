const firebase = require('firebase-admin');

const serviceAccount = require('');

const app = firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: 'https://pagimo-hack.firebaseio.com'
});
