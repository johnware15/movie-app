const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const signup = require('./queries/signup.js')
const login = require('./queries/login.js')

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

app.get('/', (req, res) => {
  !req.session.email ? user = 'Stranger' : user = req.session.email
  res.render('homepage', { user })
})

app.get('/logout', (req, res) => {
  req.session = null
  res.redirect('/')
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(signup)

app.use(login)
