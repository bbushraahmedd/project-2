const router = require('express').Router();
const passport = require('passport');
const recipeController = require('../controllers/recipes')
const isLoggedIn = require('../config/auth');
const recipe = require('../models/recipe');

router.get('/', recipeController.homePage);
router.get('/new', isLoggedIn, recipeController.new);
router.get('/all', recipeController.index)
router.post('/', recipeController.create);
router.get('/:id', recipeController.show);




module.exports = router;