const ContactRepository = require('../repository/ContactRepository')
const TestDriveRepository = require('../repository/TestDriveRepository')
const AvailabilityRepository = require('../repository/AvailabilityRepository')
const Session = require('../lib/session')
const BaseApiController = require('./BaseApiController')
const Validator = require('./../lib/validator')

class FormsApiController extends BaseApiController {
  constructor(app) {
    super(app)
  }

  Router(path) {
    this.app.post(
      `${this.baseUrl}${path}/contact`,
      Validator.Contact,
      Session.ValidateRecaptcha,
      this.Contact
    )
    this.app.post(
      `${this.baseUrl}${path}/test_drive`,
      Validator.TestDrive,
      Session.ValidateRecaptcha,
      this.TestDrive
    )
    this.app.post(
      `${this.baseUrl}${path}/availability`,
      Validator.Availability,
      Session.ValidateRecaptcha,
      this.Availability
    )
    this.app.get(`${this.baseUrl}${path}/test`, this.test)
  }

  async Contact(req, res) {
    try {
      const record = {
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Comments: req.body.Comments,
        createdAt: new Date(),
        removed: false
      }

      const repository = new ContactRepository()
      await repository.Create(record)

      res.jsonify(false, 'Created', null)
    } catch (e) {
      res.status(500).json({ error: true, message: 'Internal Server Error.' })
    }
  }

  async TestDrive(req, res) {
    try {
      const record = {
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Comments: req.body.Comments,
        Date: req.body.Date,
        Hour: req.body.Hour,
        VIN: req.body.VIN,
        Location: req.body.Location,
        createdAt: new Date(),
        removed: false
      }

      const repository = new TestDriveRepository()
      await repository.Create(record)

      res.jsonify(false, 'Created', null)
    } catch (e) {
      res.status(500).json({ error: true, message: 'Internal Server Error.' })
    }
  }

  async Availability(req, res) {
    try {
      const record = {
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Comments: req.body.Comments,
        VIN: req.body.VIN,
        createdAt: new Date(),
        removed: false
      }

      const repository = new AvailabilityRepository()
      await repository.Create(record)

      res.jsonify(false, 'Created', null)
    } catch (e) {
      res.status(500).json({ error: true, message: 'Internal Server Error.' })
    }
  }

  test(req, res) {
    res.jsonify(false, 'Test: OK.')
  }
}

module.exports = FormsApiController
