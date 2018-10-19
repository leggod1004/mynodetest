const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const controller = require('./user.controller.js');

router.get('/users', controller.index);

router.get('/users/:id', controller.show);

router.delete('/users/:id', controller.destroy);

router.post('/users', controller.create);

module.exports = router;