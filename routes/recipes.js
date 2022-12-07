const router = require('express').Router();
const passport = require('passport');
const recipeController = require('../controllers/recipes')
const isLoggedIn = require('../config/auth')


// show recipe page when clicked
// router.get('/:id', recipeController.show)

// show all recipes
router.get('/', recipeController.index)



module.exports = router;