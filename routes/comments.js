const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/recipes/:id/comments', commentsController.create);
router.delete('/comments/:id', commentsController.delete);

module.exports = router;