const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const path = require('path')
const keys = require('./config/keys')

// initialize app (buy the plot of the land)
const app = express()

// register middleware (building in the immigration center)
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

// register models (making the houses)
require('./models/User')

// register routes (putting in the road signs)
app.use('/auth/google', require('./routes/authRouter'))
app.use('/api', require('./routes/apiRouter'))

// register web routes
if (process.env.NODE_ENV === 'production') {
  // serve static files
  app.use('/static', express.static('dist'))
  // define SPA (single page app) routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

// connect database (creating the map)
mongoose.connect(keys.mongoURI)

// start server (opening the roads)
app.listen(process.env.PORT || 5000, () => {
  console.log('listening on PORT', process.env.PORT || 5000)
})
