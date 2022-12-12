//importing model to use CRUD on database
const recipe = require('../models/recipe');
const Recipe = require('../models/recipe');

module.exports = {
    index,
    new: newRecipe,
    create,
    show,
    homePage,
    delete: deleteRecipe
}

// loads my homepage
function homePage (req, res){
    res.render('index');
}

//loads all recipes page
function index (req, res){
        //telling model to get allll recipes from Recipe db
    Recipe.find({}, function(err, recipeDocs) {
        console.log(recipeDocs);

        res.render('recipes/index',{recipes: recipeDocs} );
    });
    console.log('index func working');
}


// step 1.
//opens to a new page where i can create a recipe in form 
// makes a GET request to server to /recipes/new
// responds with ejs and renders it as html thru render and loads to browser
function newRecipe(req, res){
    console.log('new func working!')
    res.render('recipes/new');
}


// step 2. submitting form
// when submitting, it makes a POST request to /recipes
// when submitting from browser, you send it to server and is saved in req.body
// to put in database -- take contents of req.body -- pass it to create func and ask 'can i put into db?'
// after db responds it goes thru if/func: passing in either error or recipeDoc (mongoDB creates unique id and tells us its from the DB)
// recipeDoc is a parameter, its the thing (document) i created in the DB
function create(req, res){
    console.log(req.body, 'this is contents of form');


    //server moving contents of form (req.body) to database
    Recipe.create(req.body, function(err, recipeDoc){
        if(err){
            console.log(err);
            return res.send('error created, check your terminal')
        }
        console.log('=====================recipeDoc from database====================');
        console.log(recipeDoc);
        console.log('===============end of recipeDoc================');

        res.redirect('/')
    }); //end of callback func in Movie.create

} //end of controller func

function show(req, res){
    Recipe.findById(req.params.id, function(err, recipeDoc){
        console.log(recipeDoc)
        res.render('recipes/show', {title: 'Recipe Detail', recipe: recipeDoc});
    });
}

function deleteRecipe(req, res){

    Recipe.findOne({'recipes._id': req.params.id, 'recipes.user': req.user.id}, function(err, recipeDoc){
        if(!recipeDoc) return res.redirect('/recipes');

        recipeDoc.recipes.remove(req.params.id);

        recipeDoc.save(function(err){
            if(err) return res.send('error, check terminal to fix');
            res.redirect(`/recipes/${recipeDoc._id}`)
        })
    })
}