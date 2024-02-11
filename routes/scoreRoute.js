const express = require('express');
const scoreController = require('../controllers/scoreController'); 
const {auth} = require('../middleware/authMiddleware'); 
const router = express.Router();


router.post('/new-score', auth, scoreController.addNewScore);

router.get('/', auth, scoreController.getAllUsersScores);

router.get('/:nickname', auth, scoreController.getUserScores);

router.get('/last/:nickname', auth, scoreController.getLatestScore);

router.get('/highest/:nickname', auth, scoreController.getHighestScore);

module.exports = router;