const router = require('express').Router()
const passport = require('passport')
const keys = require('../config/keys')

// register services
require('../services/passport')

// define routes
router.get('/', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/callback', passport.authenticate('google'), (req, res) => {
  res.redirect(keys.domainUrl)
})

module.exports = router
