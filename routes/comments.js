const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/recipes/:id/comments', commentsController.create);

module.exports = router;