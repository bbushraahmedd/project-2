const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require('../models/user');
// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    try{
      // checking to see if user has logged in
    let user = await User.findOne({ googleId: profile.id});
    // if user document exists then pass the users information to the next middleware function
		// if the user doens't exist user will be undefined
    if (user) return cb(null, user);
    // We have a new user via OAuth!
    // Create that User
      user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try{
      let userDoc = await User.findById(id);
      done(null, userDoc);
    } catch(err) {
      done(err);
    }
 });
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user





