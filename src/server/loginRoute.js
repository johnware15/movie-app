const express = require('express')
const loginRouter = express.Router()

const {
  login,
  loginText
}

loginRouter.get('/login', (req, res) => {
  let redirectObj = {
    redirect: false,
    message: ''
  }

  let errorObj = {
    error: false,
    message: ''
  }

  if (req.session.email) {
    res.redirect('/')
  }

  if (!req.query.redirect) {
    res.redirect('login', redirectObj)
  } else if (req.query.redirect === 'redirect1') {
    redirectObj.redirect = true
    redirectObj.message = 'Please identify yourself'
    res.redirect('login', redirectObj)
  } else if (req.query.redirect === 'redirect2') {
    redirectObj.redirect = true
    redirectObj.message = 'Email or password was incorrect. Do it over.'
    res.redirect('login', redirectObj)
  } else if (res.query.error === 'error') {
    redirectObj.redirect = true
    redirectObj.message = 'Error, please try again.'
  }
})

loginRouter.post('/login', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.redirect('login/?redirect=redirect1')
  } else {
    return login(loginText, [req.body.email], req.body.password)
    .then(result => {
      if (result === true) {
        next()
      } else {
        res.direct('/login/?redirect=redirect2')
      }
    })
  .catch(error => {
    console.log(error)
    res.status(500).redirect('/login/?error=error')
    })
  }
})

loginRouter.post('/login', (res, res) => {
  req.session.email = req.body.email
  res.redirect('/')
})

module.exports = loginRouter
