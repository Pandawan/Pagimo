const admin = require('firebase-admin');
const serviceAccount = require('../creds.json');
const slug = require('slug');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://pagimo-hack.firebaseio.com'
});

const db = admin.firestore();

module.exports.createPost = (content, owner, title) => new Promise((resolve, reject) => {
	const user = db.collection('users').doc(owner);
	user.get().then((doc) => {
		const post = doc.data().posts;
		db.collection('posts').add({
			content,
			owner,
			title,
			created: Date.now()
		}).then((docRef) => {
			db.collection('users').doc(owner).update({
				posts: [...post, docRef.id]
			}).then(resolve)
				.catch(reject);
		}).catch(reject);
	});
});

module.exports.getPosts = (owner, amount) => new Promise((resolve, reject) => {
	const user = db.collection('users').doc(owner);
	user.get().then((doc) => {
		const { posts } = doc.data();
		if (posts) {
			resolve([]);
		}
		else {
			db.collection('posts').doc(posts[0]).get().then((postData) => {
			// eslint-disable-next-line
			let arr = [];
				arr.push(postData.data());
				resolve(arr);
			})
				.catch(reject);
		}
	});
});

const authRef = db.collection('auth');
const usersRef = db.collection('users');
const postsRef = db.collection('posts');
const sellsRef = db.collection('sells');
const buysRef = db.collection('buys');

module.exports.deposit = (investorId, tokens) => new Promise((resolve, reject) => {
	const user = usersRef.doc(investorId);
	user.get().then((doc) => {
		if (doc.exists) {
			const currTokens = doc.data().tokens;
			const newTokens = parseInt(tokens, 10) + parseInt(currTokens, 10);
			user.set({
				tokens: parseInt(newTokens, 10)
			}, { merge: true }).then(resolve)
				.catch((err) => {
					reject(err);
				});
		}
		else {
			resolve(null);
		}
	}).catch((error) => {
		reject(error);
	});
});

module.exports.withdraw = (investorId, tokens) => new Promise((resolve, reject) => {
	const user = usersRef.doc(investorId);
	user.get().then((doc) => {
		if (doc.exists) {
			const currTokens = doc.data().tokens;
			const newTokens = parseInt(currTokens, 10) - parseInt(tokens, 10);
			user.set({
				tokens: parseInt(newTokens, 10)
			}, { merge: true }).then(resolve)
				.catch((err) => {
					reject(err);
				});
		}
		else {
			resolve(null);
		}
	}).catch((error) => {
		reject(error);
	});
});
/**
 * Submit a new sell request
 * @param {string} investorId UserID Of the investor
 * @param {string} channelId UserID of the channel being invested in
 * @param {number} minPrice Minimum price for sell (of total shares)
 * @param {number} shareCount Amount of shares being sold
 */
// eslint-disable-next-line max-len
module.exports.postSell = (investorId, channelId, minPrice, shareCount) => new Promise((resolve, reject) => {
	const user = sellsRef.doc(channelId);
	user.get().then((doc) => {
		if (doc.exists) {
			const newSellRequest = {
				seller: investorId,
				minPrice,
				shareCount
			};
			const {
				requests
			} = doc.data();
			user.set({
				requests: [...requests, newSellRequest]
			});
		}
		else {
			const newSellRequest = {
				seller: investorId,
				minPrice,
				shareCount
			};
			const requests = [];
			requests.push(newSellRequest);
			user.set({
				requests
			});
		}
	}).catch((error) => {
		reject(error);
	});
});

/**
 * Submit a new buy request
 * @param {string} investorId UserID Of the investor
 * @param {string} channelId UserID of the channel being invested in
 * @param {number} minPrice Minimum price for sell (of total shares)
 * @param {number} shareCount Amount of shares being bought
 */
// eslint-disable-next-line max-len
module.exports.postBuy = (investorId, channelId, minPrice, shareCount) => new Promise((resolve, reject) => {
	const user = buysRef.doc(channelId);
	user.get().then((doc) => {
		if (doc.exists) {
			const newBuyRequest = {
				seller: investorId,
				minPrice,
				shareCount
			};
			const {
				requests
			} = doc.data();
			user.set({
				requests: [...requests, newBuyRequest]
			});
		}
		else {
			const newBuyRequest = {
				seller: investorId,
				minPrice,
				shareCount
			};
			const requests = [];
			requests.push(newBuyRequest);
			user.set({
				requests
			});
		}
	}).catch((error) => {
		reject(error);
	});
});

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
	usersRef.doc(userId).get().then((doc) => {
		if (!doc.exists) {
			// Add the user to /users/
			usersRef.doc(userId).set({
				uid,
				name,
				posts: [],
				investments: [],
				created: Date.now(),
				tokens: 0
			}).then(() => {
				// Add the user to /auth/
				authRef.doc(uid).set({
					user: userId
				}).then(resolve).catch(reject);
			}).catch(reject);
		}
	}).catch(err => reject);
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
