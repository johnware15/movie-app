process.env.NODE_ENV = 'test'

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app.js')

chai.use(chaiHttp)
const request = chai.request

describe('app', function() {
  it('should be an express app', function() {
    expect(app.EXPRESS_APP).to.be.true
  })

  it('should render text at homepage', function(done) {
    request(app)
    .get('/')
    .end((error, response) => {
      expect(error).to.be.null
      expect(response).to.have.status(200)
      done()
    })
  })

  it('should render text on login page', function(done) {
    request(app)
    .get('/login')
    .end((error, response) => {
      expect(error).to.be.null
      expect(response).to.have.status(200)
      done()
    })
  })

  
})
