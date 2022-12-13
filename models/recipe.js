const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//this is implementing a 1:M, bc one recipe can have many comments
const commentSchema = new Schema({
    content: String,
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    userName: String,
},  
    {
    timestamps: true
});

// the purpose of this schema is to shape the document in our recipes collection (database)
const recipeSchema = new Schema({
    title: String,
    ingredient: [String],
    direction: String,
    serving: Number, 
    cookTime: String,
    prepTime: String,
    image: String,
    comments: [commentSchema]

});

// this is my recipes collection (database) that can be looked at in mongoDB once i put something in it
module.exports = mongoose.model('Recipe', recipeSchema);






// point of file:
// its to create our model and export it
// the model performs CRUD operations in our database and we import the model in our 'controller js' to execute them