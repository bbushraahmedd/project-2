const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// the purpose of this schema is to shape the document in our recipes collection (database)
const recipeSchema = new Schema({
    title: String,
    ingredient: [String],
    direction: String,
    serving: Number, 
    cookTime: String,
    prepTime: String
});

// this is my recipes collection (database) that can be looked at in mongoDB once i put something in it
module.exports = mongoose.model('Recipe', recipeSchema);






// point of file:
// its to create our model and export it
// the model performs CRUD operations in our database and we import the model in our 'controller js' to execute them