global.config = require('../nuxt.config.js')
global.env = process.env.NODE_ENV || 'production'

const express = require('express')
const app = express()
const Express = require('./lib/express')
const Passport = require('./lib/passport')
const Router = require('./routes/router')

const passportLib = new Passport(app)
const expressLib = new Express(app)
const routerLib = new Router(app)

app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
      error: true,
      message: err
    })
  })
}

module.exports = {
  path: '/api/',
  handler: app
}
