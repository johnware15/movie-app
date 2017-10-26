const client = require('./pg')
const bcrypt = require('bcrypt')

const loginText = `SELECT email, password FROM users WHERE email = $1`;
const loginEmailText = `SELECT email FROM users WHERE email = $1`;

const login = function(text, values, password) {
  let dbPassword
  return client.query(text, values)
  .then(result => {
    dbPassword = result.rows[0].password
    return bcrypt.compare(password, dbPassword)
    .then(result => result)
  })
  catch(error = {
    console.log('Did not find driver')
    console.log(error)
  })
}

const loginEmail = function(text, values) {
  let dbPassword
  return client.query(text, values)
  .then(result => result.rows[0].email)
  .catch(error => {
    console.log(error)
    return undefined
  })
}

module.exports = {
  login,
  loginText,
  loginEmail,
  loginEmailText
}
