const check = require('validator')
const _ = require('lodash')

class Validator {
  static Login(req, res, next) {
    const { Email, Password } = req.body
    if (Email && Password && check.isEmail(Email.trim())) next()
    else
      res.status(400).json({
        error: true,
        message:
          'Bad request. Your request contains bad syntax and cannot be fulfilled'
      })
  }
  static Register(req, res, next) {
    const error = {}
    const { FirstName, MiddleName, LastName, Email, Phone, Password } = req.body

    if (!FirstName) error.FirstName = 'FirstName is required'
    else if (!check.isAlpha(FirstName.trim())) error.FirstName = 'Invalid field'

    if (MiddleName && !check.isAlpha(MiddleName.trim()))
      error.MiddleName = 'Invalid field'

    if (!LastName) error.LastName = 'LastName is required'
    else if (!check.isAlpha(LastName.trim())) error.LastName = 'Invalid field'

    if (!Email) error.Email = 'Email is required'
    else if (!check.isEmail(Email.trim())) error.Email = 'Invalid field'

    if (Phone && !check.isMobilePhone(Phone.trim(), 'en-US'))
      error.Phone = 'Invalid field'

    if (!Password) error.Password = 'Password is required'
    else if (!check.isLength(Password, 6, 50))
      error.Password = 'At least 6 characters long'

    if (!_.isEmpty(error)) {
      return res.status(400).json({
        error: true,
        message:
          'Bad request. Your request contains bad syntax and cannot be fulfilled'
      })
    }

    next()
  }

  static Activate(req, res, next) {
    const error = {}
    const { Email, Code } = req.body

    if (!Email) error.Email = 'Email is required'
    else if (!check.isEmail(Email.trim())) error.Email = 'Invalid field'

    if (!Code) error.Code = 'Code is required'
    else if (!check.isLength(Code, 32))
      error.Code = 'Code must contain 32 chars'

    if (!_.isEmpty(error)) {
      return res.status(400).json({
        error: true,
        message:
          'Bad request. Your request contains bad syntax and cannot be fulfilled'
      })
    }
    next()
  }

  static Contact(req, res, next) {
    const error = {}
    const {
      FirstName,
      MiddleName,
      LastName,
      Email,
      Phone,
      Comments,
      token
    } = req.body

    if (!Email) error.Email = 'Email is required'
    else if (!check.isEmail(Email.trim())) error.Email = 'Invalid field'

    if (!FirstName) error.Code = 'FirstName is required'

    if (!LastName) error.LastName = 'LastName is required'

    if (!Phone) error.Phone = 'Phone is required'

    if (!Comments) error.Comments = 'Comments is required'

    if (!token) error.token = 'Invalid recaptcha'

    if (!_.isEmpty(error)) {
      return res.status(400).json({
        error: true,
        message:
          'Bad request. Your request contains bad syntax and cannot be fulfilled'
      })
    }
    next()
  }

  static TestDrive(req, res, next) {
    const error = {}
    const {
      FirstName,
      MiddleName,
      LastName,
      Email,
      Phone,
      Comments,
      Hour,
      Date,
      VIN,
      Location,
      token
    } = req.body

    if (!Email) error.Email = 'Email is required'
    else if (!check.isEmail(Email.trim())) error.Email = 'Invalid field'

    if (!FirstName) error.Code = 'FirstName is required'

    if (!LastName) error.LastName = 'LastName is required'

    if (!Phone) error.Phone = 'Phone is required'

    if (!Comments) error.Comments = 'Comments is required'

    if (!Hour) error.Comments = 'Hour is required'

    if (!Date) error.Comments = 'Date is required'

    if (!VIN) error.Comments = 'VIN is required'

    if (!Location) error.Comments = 'Location is required'

    if (!token) error.token = 'Invalid recaptcha'

    if (!_.isEmpty(error)) {
      return res.status(400).json({
        error: true,
        message:
          'Bad request. Your request contains bad syntax and cannot be fulfilled'
      })
    }
    next()
  }

  static Availability(req, res, next) {
    const error = {}
    const {
      FirstName,
      MiddleName,
      LastName,
      Email,
      Phone,
      Comments,
      VIN,
      token
    } = req.body

    if (!Email) error.Email = 'Email is required'
    else if (!check.isEmail(Email.trim())) error.Email = 'Invalid field'

    if (!FirstName) error.Code = 'FirstName is required'

    if (!LastName) error.LastName = 'LastName is required'

    if (!Phone) error.Phone = 'Phone is required'

    if (!Comments) error.Comments = 'Comments is required'

    if (!VIN) error.Comments = 'VIN is required'

    if (!token) error.token = 'Invalid recaptcha'

    if (!_.isEmpty(error)) {
      return res.status(400).json({
        error: true,
        message:
          'Bad request. Your request contains bad syntax and cannot be fulfilled'
      })
    }
    next()
  }
}

module.exports = Validator
