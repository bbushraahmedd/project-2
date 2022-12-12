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
            console.log(req.user , '<------- req.user');
            req.body.user = req.user._id;
            req.body.userName = req.user.name;
            console.log(req.body, 'req.body---------------');

            recipeDoc.comments.push(req.body);
            recipeDoc.save(function(err){
                console.log(err, 'error from save')
                res.redirect(`/recipes/${req.params.id}`);
            });
    }); 
}

function deleteComment(req, res){

    //finding recipe with comment
    Recipe.findOne({'comments._id': req.params.id, 'comments.user': req.user._id}, 
        function(err, recipeDoc){
        if(!recipeDoc) return res.redirect('/recipes');

        recipeDoc.comments.remove(req.params.id);

        recipeDoc.save(function(err){
            if(err) return res.send('error, check terminal to fix');
            res.redirect(`/recipes/${recipeDoc._id}`)
        })
    })
}

