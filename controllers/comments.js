const Recipe = require('../models/recipe');

module.exports = {
    create
}

function create (req, res){
    // //checking contents of form
    // console.log(req.body);
    // //checking for recipe id
    // console.log(req.params.id, 'req.params.id')

    //using model to take contents of form (req.body) and put in db
    Recipe.findById(req.params.id, function(err, recipeDoc){
        if(err){
            console.log(err)
            return res.send('error from creating comments, check terminal')
        }
            console.log(recipeDoc);

            recipeDoc.comments.push(req.body);
            recipeDoc.save(function(err){
                console.log(err, 'error from save')
                res.redirect(`/recipes/${req.params.id}`);
            });
    }); 
}