/* eslint no-undef: 0 */

$(document).ready(() => {
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

	function signInButton() {
		firebase.auth().signInWithPopup(provider).then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const token = result.credential.accessToken;
			// Hide modal
			if (!$('#modal').hasClass('hidden')) {
				$('#modal').addClass('hidden');
			}
			// Hide the Sign In Button
			if (!$('#sign-in-btn').hasClass('hidden')) {
				$('#sign-in-btn').addClass('hidden');
			}
			// Show the User signed in
			$('#sign-in-user').removeClass('hidden');
		}).catch((error) => {
			$('#modal').removeClass('hidden');
			$('#modal-title').text(`Error ${error.code}`);
			$('#modal-content').text(error.message);
		});
	}

	function signOut() {
		firebase.auth().signOut().then(() => {
			if (!$('#modal').hasClass('hidden')) {
				$('#modal').addClass('hidden');
			}
			// Sign-out successful.
		}).catch((error) => {
			$('#modal').removeClass('hidden');
			$('#modal-title').text(`Error ${error.code}`);
			$('#modal-content').text(error.message);
		});
	}

	$('#sign-in-btn').click(() => {
		signInButton();
	});

	$('#sign-out-btn').click(() => {
		signOut();
	});

	$('#profile-btn').click(() => {
		const user = firebase.auth().currentUser;
		if (user) {
			window.location.href = `/userid/${user.uid}`;
		}
	});

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			if (!$('#sign-in-btn').hasClass('hidden')) {
				$('#sign-in-btn').addClass('hidden');
			}
			// Show the User signed in
			$('#sign-in-user').removeClass('hidden');

			$('#sign-in-user').text(user.name);

			console.log(`Signed in with user ${JSON.stringify(user.displayName)}`);

			$.post('/api/create_user/', { uid: user.uid, name: user.displayName }, (data) => {
				console.log(`Posted update ${JSON.stringify(data)}`);
			});
		}
		else {
			console.log('Signed out');
			// Hide the user signed in
			if (!$('#sign-in-user').hasClass('hidden')) {
				$('#sign-in-user').addClass('hidden');
			}
			// Show the Sign In Button
			$('#sign-in-btn').removeClass('hidden');
		}
	});
});
