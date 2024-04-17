const MetricsApiController = require('../api/MetricsApiController')

class Router {
  constructor(app) {
    this.app = app

    this.ExtraMiddlewares()
    new MetricsApiController(app).Router('health')
  }

  ExtraMiddlewares() {
    this.app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', '*')
      res.header('Access-Control-Allow-Headers', '*')
      next()
    })
  }
}

module.exports = Router
