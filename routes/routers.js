const express = require('express');
const artistController = require('../controllers/ArtistController');
const router = express.Router();
const loginController = require('../controllers/loginController')


router.get('/people/:id', artistController.getPeople);

router.post('/people/deleteByName/:name', artistController.postDeletePeople)

router.post('/peoples/add', artistController.postAddPeople)

router.post('/home', loginController.getUser);

module.exports = router;
