const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Session = require('../lib/session')
const UserRepository = require('../repository/UserRepository')
const BaseApiController = require('./BaseApiController')
const Validator = require('./../lib/validator');

class UserApiController extends BaseApiController {
  constructor(app) {
    super(app)
  }

  Router(path) {
    this.app.post(`${this.baseUrl}${path}/login`, Validator.Login, this.Login)
    this.app.post(`${this.baseUrl}${path}/register`, Validator.Register, this.Register)
    this.app.post(`${this.baseUrl}${path}/activate`,Validator.Activate, this.Activate)

  }



  async Login(req, res) {
    try {
      const username = req.body.Email
      const password = req.body.Password

      const repository = new UserRepository()

      let user = await repository.Find({ Email: username, activated: true })

      if (!user)
        return res
          .status(401)
          .json({ error: true, message: 'Invalid username or password.' })

      if (bcrypt.compareSync(password, user.Password)) {
        const token = jwt.sign({ id: user._id }, global.config.env.jwt_key, {
          expiresIn: 86400
        })

        delete user.Password

        res.status(201).json({
          error: false,
          message: 'Login succeed',
          token: token,
          user: {
            FirstName: user.FirstName,
            MiddleName: user.MiddleName,
            LastName: user.LastName,
            Email: user.Email,
            Phone: user.Phone
          }
        })
      } else {
        res
          .status(401)
          .json({ error: true, message: 'Invalid username or password.' })
      }
    } catch (e) {
      res.status(500).json({ error: true, message: 'Internal Server Error.' })
    }
  }
  async Register(req, res) {
    try {
      const record = req.body

      record.activationCode = crypto.randomBytes(16).toString('hex')
      record.activated = false
      record.updatedAt = new Date()
      record.createdAt = new Date()

      const repository = new UserRepository()

      const user = await repository.Create(record)

      res.status(200).json({
        error: false,
        message: 'User created',
        userId: user._id
      })
    } catch (e) {
      res.status(500).json({ error: true, message: 'Internal Server Error.' })
    }
  }

  async Activate(req, res) {
    try {
      const { Email, Code } = req.body

      const repository = new UserRepository()

      const user = await repository.FindOneAndUpdate(
        {
          Email,
          activationCode: Code
        },
        { activated: true, activatedAt: new Date() }
      )

      if (user)
        res.status(200).json({
          error: false,
          message: 'User activated',
          userId: user._id
        })
      else
        res.status(200).json({
          error: true,
          message: 'User not activated'
        })
    } catch (e) {
      res.status(500).json({ error: true, message: 'Internal Server Error.' })
    }
  }
}

module.exports = UserApiController
