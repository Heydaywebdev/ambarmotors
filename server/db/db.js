const mongoose = require('mongoose')
const Models = require('./models')

global.conection = false

class Db {
  static Initialize(cb) {
    const opts = {
      useNewUrlParser: true
    }

    const config = global.config
    const env = global.env

    const mongooseDb = mongoose.connection

    mongooseDb.on('error', error => {
      global.conection = false
      mongoose.disconnect()
    })

    mongooseDb.on('connected', () => {
      global.db = new Models(mongoose).Load()
      global.conection = true
      console.log('MongoDB: Connected')
      cb(true)
    })

    mongooseDb.on('reconnected', () => {
      global.db = new Models(mongoose).Load()
      cb(true)
    })

    mongooseDb.on('disconnected', () => {
      console.error('MongoDB: Disconnected')
      mongoose.connect(config.env[env].mongoUrl, opts)
    })

    mongoose.connect(config.env[env].mongoUrl, opts)
  }
}

module.exports = Db
