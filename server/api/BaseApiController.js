class BaseApiController {
  constructor($app) {
    this.baseUrl = '/'
    this.app = $app
  }

  Router(path) {
    this.app.get(`${path}/`, this.List)
    this.app.post(`${path}/`, this.Create)
    this.app.put(`${path}/`, this.Update)
    this.app.delete(`${path}/`, this.Remove)
  }

  List(req, res) {
    res.status(200).json({ error: true, message: 'Not implemented yet' })
  }

  Create(req, res) {
    res.status(200).json({ error: true, message: 'Not implemented yet' })
  }

  Update(req, res) {
    res.status(200).json({ error: true, message: 'Not implemented yet' })
  }

  Remove(req, res) {
    res.status(200).json({ error: true, message: 'Not implemented yet' })
  }
}

module.exports = BaseApiController
