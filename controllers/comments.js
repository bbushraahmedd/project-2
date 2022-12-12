const Recipe = require('../models/recipe');

module.exports = {
    create,
    delete: deleteComment
}

function create (req, res){

    //using model to take contents of form (req.body) and put in db
    Recipe.findById(req.params.id, function(err, recipeDoc){
        if(err){
            console.log(err)
            return res.send('error from creating comments, check terminal')
        }
            console.log(recipeDoc);
            //adding user to comment
            req.body.user = req.user._id;
            req.body.userName = req.user.name;

            recipeDoc.comments.push(req.body);
            recipeDoc.save(function(err){
                console.log(err, 'error from save')
                res.redirect(`/recipes/${req.params.id}`);
            });
    }); 
}

function deleteComment(req, res){

    Recipe.findOne({'recipes._id': req.params.id, 'recipes.user': req.user.id}, function(err, recipeDoc){
        if(!recipeDoc) return res.redirect('/recipes');

        recipeDoc.comments.remove(req.params.id);

        recipeDoc.save(function(err){
            if(err) return res.send('error, check terminal to fix');
            res.redirect(`/recipes/${recipeDoc._id}`)
        })
    })
}