const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const controller = require('./user.controller.js');

router.get('/', controller.index);

router.get('/:id', controller.show);

router.delete('/:id', controller.destroy);

router.post('/', controller.create);

module.exports = router;