/* eslint no-undef: 0 */


// Initialize Firebase
const config = {
	apiKey: 'AIzaSyANI1SOQd0gyHfyDtwGfO8z0GM4R2rynys',
	authDomain: 'pagimo-hack.firebaseapp.com',
	databaseURL: 'https://pagimo-hack.firebaseio.com',
	projectId: 'pagimo-hack',
	storageBucket: 'pagimo-hack.appspot.com',
	messagingSenderId: '917434654455'
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

