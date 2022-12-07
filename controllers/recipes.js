module.exports = {
    index,
    show,
}

// Show func
async function show (req, res){
    console.log('Show function just ran')
}


// recipe index func
async function index (req, res){

    
    res.render('recipes/index')
}