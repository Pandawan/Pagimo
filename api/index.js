const fire = require('./fire');

fire.createUser('trWDqax5rDc61PcVQjT5BMyT0tA3', 'Miguel Tenant', 'miguel-tenant').then((data) => {
	fire.deposit('miguel-tenant', 10).then((aa) => {
		console.log(aa);
	}).catch((err) => {
		console.log(err);
	});
}).catch((err) => {
	console.log(err);
});
