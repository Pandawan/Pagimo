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

	$('#depositForm').submit(() => {
		const amt = $('#depositIn').val();
		const investorId = firebase.auth().name; // PSEUDOCODE
		// send amt to firebase to be added to investor.tokens
	});

	$('#withdrawForm').submit(() => {
		const amt = $('#withdrawIn').val();
		// send amt to firebase to be subtracted from investor.tokens
	});

	$('#buyForm').submit(()=> {
		const channel = $("#buyInChan").val();
		const amt = $("#buyInNum").val();
		// send amt to firebase to be added to investor.portfolio
	});

	$('#sellForm').submit(()=> {
		const channel = $("#sellInChan").val();
		const amt = $("#sellInNum").val();
		// send amt to firebase to be removed from investor.portfolio

	$('#sign-in-btn').click(() => {
		signInButton();
	});

	$('#sign-out-btn').click(() => {
		signOut();
	});

	$('#search-btn').click(() => {
		window.location.href = `/user/${$('#search-input').val()}`;
	});

	$('#new-post-button-right-now').click(() => {
		window.location.href = '/posts/new-post';
	});

	$('#profile-btn').click(() => {
		const user = firebase.auth().currentUser;
		if (user) {
			window.location.href = `/userid/${user.uid}`;
		}
	});

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			if (window.location.pathname === '/posts/new-post') {
				if (!$('#not-signed-in').hasClass('hidden')) {
					$('#not-signed-in').addClass('hidden');
				}
				$('#new-post-form').removeClass('hidden');
			}

			if (!$('#sign-in-btn').hasClass('hidden')) {
				$('#sign-in-btn').addClass('hidden');
			}
			// Show the User signed in
			$('#sign-in-user').removeClass('hidden');

			$('#sign-in-user').text(user.name);

			console.log(`Signed in with user ${JSON.stringify(user.displayName)}`);
			if (window.location.pathname === '/posts/new-post') {
				document.getElementById('id').value = user.uid;
			}
			else {
				$.post('/api/create_user/', {
					uid: user.uid,
					name: user.displayName
				}, (data) => {
					$('#modal').removeClass('hidden');
					$('#modal-title').text('HEY');
					$('#modal-content').text(data);
				});
			}
		}
		else {
			console.log('Signed out');
			if (window.location.pathname === '/posts/new-post') {
				if (!$('#new-post-form').hasClass('hidden')) {
					$('#new-post-form').addClass('hidden');
				}
				$('#not-signed-in').removeClass('hidden');
			}
			// Hide the user signed in
			if (!$('#sign-in-user').hasClass('hidden')) {
				$('#sign-in-user').addClass('hidden');
			}
			// Show the Sign In Button
			$('#sign-in-btn').removeClass('hidden');
		}
	});
});
