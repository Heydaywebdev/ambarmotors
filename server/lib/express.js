const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')

class Express {
  constructor(app) {
    this.app = app
    this.initialize()
  }

  initialize() {
    this.app.use(cors())
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
    this.app.use(helmet())

    this.app.use(passport.initialize())
    this.app.use(passport.session())

    this.app.use((req, res, next) => {
      res.locals.user = req.user || null
      res.jsonify = function(error, message, data, status_code = 200) {
        this.status(status_code).json({
          error: error,
          message: message,
          data: data
        })
      }
      next()
    })
  }
}

module.exports = Express
