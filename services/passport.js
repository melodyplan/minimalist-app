const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

// method that takes the user and passes it back to the browser via cookies
// to authenticate follow up requests
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// method that takes a request from the browser, parses the cookie to retrieve
// the previously signed in user
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(existingUser => {
      done(null, existingUser)
    })
})


passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        done(null, existingUser)
      } else {
        new User({ googleId: profile.id })
          .save()
          .then((newUser) => {
            done(null, newUser)
          })
      }
    })
}))
