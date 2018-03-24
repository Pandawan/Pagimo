const admin = require('firebase-admin');
const serviceAccount = require('../creds.json');

const db = admin.firestore();
const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://pagimo-hack.firebaseio.com'
});

const docRef = db.collection('posts').doc('test');
const set = docRef.set({
	content: 'hello',
	created: Date.now(),
	owner: 'ya boi',
	title: 'Testing testing 123'
});
