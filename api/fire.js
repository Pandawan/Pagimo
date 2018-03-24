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
 * @param {string} username (optional) Username for /user/username
 */
module.exports.createUser = (uid, name, username) => new Promise((resolve, reject) => {
	// Either use the username or get a slug from the name
	const userId = username || slug(name).toLowerCase();
	// Add the user to /users/
	usersRef.doc(userId).set({
		uid,
		name,
		posts: [],
		investments: [],
		created: Date.now()
	}).then(() => {
		// Add the user to /auth/
		authRef.doc(uid).set({
			user: userId
		}).then(resolve).catch(reject);
	}).catch(reject);
});

/**
 * Get the user's id/username from the UID
 * @param {string} uid User UID (Google Sign In or other)
 */
module.exports.getUserId = uid => new Promise((resolve, reject) => {
	authRef.doc(uid).get('user').then((obj) => {
		if (obj.exists) {
			resolve(obj.data().user);
		}
		else {
			resolve(null);
		}
	}).catch((error) => {
		reject(error);
	});
});
