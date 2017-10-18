const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const signup = require('./queries/signup.js')

if(process.env.NODE_ENV === 'test') {
  app.EXPRESS_APP = true
  app.listen(3000, () => console.log('http://localhost:3000'))
  module.exports = app
} else {
  app.listen(3000, () => console.log('http://localhost:3000'))
}

app.set('view engine', 'ejs')

app.use(cookieSession({
  name: 'session',
  secret: 'fbfeucndjnce'
}))
