const fire = require('./fire');

fire.postBuy('miguel-tenant', 'rohan-pandey', 1, 5).then((a) => {
	console.log(`whatever ${a}`);
}).catch((err) => {
	console.log(err);
});
