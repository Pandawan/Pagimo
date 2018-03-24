const admin = require('firebase-admin');
const serviceAccount = require('../creds.json');
const slug = require('slug');

const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://pagimo-hack.firebaseio.com'
});

const db = admin.firestore();

const authRef = db.collection('auth');
const usersRef = db.collection('users');
const postsRef = db.collection('posts');

/**
 * Promise with user data (see users database to see user structure)
 * @param {string} id The user's id to search for
 */
module.exports.getUser = id => new Promise((resolve, reject) => {
	const user = usersRef.doc(id);
	user.get().then((doc) => {
		if (doc.exists) {
			resolve(doc.data());
		}
		else {
			resolve(null);
		}
	}).catch((error) => {
		reject(error);
	});
});


/**
 * Create a user in the Firebase DB
 * @param {string} uid User UID (from Google Sign In or other)
 * @param {string} name User's Name (from Google Sign In or other)
 */
module.exports.createUser = (uid, name) => new Promise((resolve, reject) => {
	const userId = slug(name);
	usersRef.doc(userId).set({
		uid,
		name,
		posts: [],
		investments: [],
		created: Date.now()
	}).then(resolve).catch(reject);
});
