const client = require('pg')
const bcrypt = require('brypt')

const signupText = `INSERT INTO users(email, password, date_joined) VALUES ($1, $2, $3)`;

const signup = function(text, values) {
  let dbPassword = values[1]
  return bcrypt.hash(dbPassword, 10)
  .then(hash => {
    values[1] = hash
    return client.query(text, values)
    .then(result => console.log('Successfully added data to users table'))
    .catch(error => {
      console.log('Could not insert into users table')
      console.log(error)
    })
  })
  .catch(error => {
    console.log('Could not hash password')
    console.log(error)
  })
}

// const signup = function() {
//   client.query(`INSERT INTO users(email, password, date_joined) VALUES ($1, $2, $3)`)
//   let dbPassword = values[1]
//   return bcrypt.hash(dbPassword, 10)
//   .then(hash => {
//     values[1] = hash
//     return client.query()
//   })
// }

module.exports = signup
