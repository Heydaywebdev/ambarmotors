const BaseApiController = require('./BaseApiController')

class MetricsController extends BaseApiController {
  constructor(app) {
    super(app)
  }

  Router(path) {
    this.app.get(`${this.baseUrl}${path}/readiness`, this.Readiness)
    this.app.get(`${this.baseUrl}${path}/liveness`, this.Liveness)
  }

  Readiness(req, res) {
    res.status(200).send('')
  }

  Liveness(req, res) {
    res.status(200).send('')
  }
}

module.exports = MetricsController
