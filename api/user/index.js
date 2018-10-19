const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

let users = [
	{
		id: 1,
		name: 'alice'
	},
	{
		id: 2,
		name: 'bek'
	},
	{
		id: 3,
		name: 'chris'
	}
]

router.get('/', (req,res) => {
	console.log('GET /users/');
	return res.json(users);
});

router.get('/:id', (req,res) => {
	const id = parseInt(req.params.id, 10);
	if(!id) {
		return res.status(400).json({error: 'Incorrect id'});
	}
	console.log('GET /' + id);
	
	let user = users.filter(user => user.id ===id)[0]
	if(!user) {
		return res.status(404).json({error: 'Unknown user'});
	}
	
	return res.json(user);
});

router.delete('/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	if(!id) {
		return res.status(400).json({error: 'Incorrect id'});
	}
	console.log('DELETE /users/' + id);
	
	const userIdx = users.findIndex(user => {
		return user.id === id;
	});
	
	if (userIdx === -1) {
		return res.status(404).json({error: 'Unknown user'});
	}
	
	users.splice(userIdx, 1);
	console.log(users);
	return res.status(204).send();
});

router.post('/', (req, res) => {
	const name = req.body.name || '';
	if (!name.length) {
		return res.status(400).json({error: 'Incorrect name'});
	}
	
	const id = users.reduce((maxId, user) => {
		return user.id > maxId ? user.id : maxId		
	}, 0) + 1;
	
	const newUser = {
		id: id,
		name: name
	};
	
	users.push(newUser);
	
	return res.status(201).json(newUser);
});

module.exports = router;