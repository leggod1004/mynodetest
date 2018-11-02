const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!\n');
});

app.use('/users', require('./api/user'));

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
	
	require('./models').sequelize.sync({force: true})
		.then(() => {
			console.log('Databases sync');
		});
});
