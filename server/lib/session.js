const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/UserRepository');
const Recaptcha = require('express-recaptcha').RecaptchaV3;
const recaptcha = new Recaptcha('6LcAgKwUAAAAACCtODSku12MNUkIi_zelwPQEARE', '6LcAgKwUAAAAADP034fSrQqqu9gTCXLtqmvIADXq', {callback:'cb'});

class Session {
  static DecodeToken(req) {
    try {
      const authHeader = req.headers.authorization || `token ${req.query.token}`
      const [, token] = authHeader.split(' ')

      if (token) {
        const decoded = jwt.verify(token, global.config.env.jwt_key)

        const Users = new UserRepository()

        return Users.Find({ _id: decoded.id })
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  }

  static async HasPermissions(req, res, next) {
    try {
      const user = await Session.DecodeToken(req)

      if (user) {
        req.user = user
        return next()
      } else {
        res.status(401).json({ error: true, message: 'Unauthorized' })
      }
    } catch (e) {
      res.status(500).json({ error: true, message: 'Internal server error' })
    }
  }

  static Auth(req, res, next) {
    if (req.xhr) {
      return req.user
        ? next()
        : res.status(403).json({ error: 'Requires login' })
    } else {
      return req.user ? next() : res.redirect('/user/login')
    }
  }

  static IsXhr(req, res, next) {
    return req.xhr ? next() : res.status(403).json({ error: "Don't allowed" })
  }

  static NoAuth(req, res, next) {
    return req.user ? res.redirect('/') : next()
  }

  static NoCache(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', 0)
    return next()
  }

  static ValidateRecaptcha(req, res, next) {
    req.body['g-recaptcha-response'] = req.body.token
    recaptcha.verify(req, (error, data) => {
      if (!error) {
        next();
      } else {
        res.jsonify(true, 'Invalid Token', null, 400);
      }
    })
  }
}

module.exports = Session
