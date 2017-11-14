process.env.NODE_ENV = 'test'

const client = require('../pg.js')
const expect = require('chai').expect

const {
  signup,
  signupText
} = require('../queries/signup.js')

const {
  login,
  loginText
} = require('../queries.login.js')

describe('signup', function() {
  let user = [
    'eleven@hawkins.com',
    'eggowaffles']
  before(function() {
    return signup(signupText, user).then((result) => {
    })
  })

  it('should return true if password matches', function() {
    return login(loginText, ['eleven@hawkins.com'], 'eggowaffles').then((result) => {
      expect(result).to.equal(true)
    })
  })

  after(function() {
    client.query('TRUNCATE TABLE users')
    .then(result => console.log('Truncated Table'))
    .catch(error => console.log(error))
  })
})
