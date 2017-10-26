const express = require('express')
const signupRoute = express.Router()

const {
  signupText,
  signup
} = ('../queries/signup.js')

signupRoute.get('/signup', (req, res) => {
  let redirectObj = {
    redirect: false,
    message: '',
    activeUserError: false
  }

  let errorObj = {
    error: false,
    message: '',
    activeUserError: false
  }

  if(req.session.email) {
    res.redirect('/')
  }

  if(!req.query.redirect) {
    res.redirect('signup', redirectObj)
  } else if (req.query.redirect === 'redirect1') {
    redirectObj.redirect = true
    redirectObj.message = 'Please fill out forms to continue'
    res.redirect('signup', redirectObj)
  } else if (req.query.redirect === 'redirect2') {
    redirectObj.redirect = true
    redirectObj.message = 'Passwords do not match'
    res.redirect('signup', redirectObj)
  } else if (req.query.redirect === 'redirect3') {
    redirectObj.activeUserError = true
    res.redirect('signup', redirectObj)
  } else if (req.query.error === 'error') {
    errorObj.error = true
    errorObj.message = 'Please try again'
  }
})

signupRoute.post('/signup', (req, res, next) => {
  if(!req.body.email || !req.body.password || !req.body.confirmPassword) {
    res.redirect('/signup/?redirect=redirect1')
  } else if (req.body.password !== req.body.confirmPassword) {
    res.redirect('/signup/?redirect=redirect2')
  } else {
    return login(loginText, [req.body.email])
    .then(result => {
      if(result === req.body.email) {
        res.redirect('/signup/redirect=redirect3')
      } else {
        return signup(signupText, [req.body.email, req.body.password])
        .then(result => next())
        .catch(error => res.status(500).redirect('/signup/?error=error'))
      }
    })
    .catch(error => {
      console.log(error)
      res.redirect('/signup/?error=error')
    })
  }
})

signupRoute.post('/signup', (req, res) => {
  req.session.email = req.body.email
  res.redirect('/')
})

module.exports = signupRoute
