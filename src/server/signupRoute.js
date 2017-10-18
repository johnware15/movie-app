const express = require('express')
const signupRoute = express.Router()

const {
  signupText,
  signup
} = ('../queries/signup.js')

signupRoute.get('/signup', (req, res) => {
  let errorObj = {
    error: false,
    message: '',
    activeUserError: false
  }
  if(req.session.email) {
    res.redirect('/')
  }

  if(!req.query.error) {
    res.render('signup', errorObj)
  } else if (req.query.error === 'error1') {
    errorObj.error = true
    errorObj.message = 'Please fill out forms to continue'
    res.render('signup', errorObj)
  } else if (req.query.error === 'error2') {
    errorObj.error = true
    errorObj.message = 'Passwords do not match'
    res.render('signup', errorObj)
  } else if (req.query.error === 'error3') {
    errorObj.activeUserError = true
    res.render('signup', errorObj)
  } else if (req.query.error === 'error4') {
    errorObj.error = true
    errorObj.message = 'Error, please try again'
  }
})

signupRoute.post('/signup', (req, res, next) => {
  if(!req.body.email || !req.body.password || !req.body.confirmPassword) {
    res.redirect('/signup/?error=error1')
  } else if (req.body.password !== req.body.confirmPassword) {
    res.redirect('/signup/?error=error2')
  } else {
    return login(loginText, [req.body.email])
    .then(result => {
      if(result === req.body.email) {
        res.redirect('/signup/error=error3')
      } else {
        return signup(signupText, [req.body.email, req.body.password])
        .then(result => next())
        .catch(error => res.status(500).redirect('/signup/?error=error4'))
      }
    })
    .catch(error => {
      console.log(error)
      res.redirect('/signup/?error=error4')
    })
  }
})

signupRoute.post('/signup', (req, res) => {
  req.session.email = req.body.email
  res.redirect('/')
})

module.exports = signupRoute
