const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        let existingUser=await User.findOne({ googleId: profile.id })
          if (existingUser) {
            return done(null, existingUser);
            // we already have a record with the given profileID
          }
            // we don´t have a user record with this ID, make a new record
            //Create a new user in the users collection
            let user=await new User({ googleId: profile.id }).save()
            done(null, user);
      }
    )
  );