const bcrypt = require('bcryptjs')
const BaseModel = require('./BaseModel')

class UserModel extends BaseModel {
  constructor(mongoose) {
    super(mongoose, 'User')
  }

  Initialize() {
    const userSchema = new this.Schema({
      FirstName: { type: String, required: true },
      MiddleName: { type: String },
      LastName: { type: String, required: true },
      Email: { type: String, required: true },
      Phone: { type: String },
      Password: { type: String, required: true },
      activationCode: { type: String },
      activated: { type: Boolean, default: false },
      activatedAt: { type: Date, default: new Date() },
      updatedAt: { type: Date, default: new Date() },
      createdAt: { type: Date, default: new Date() },
      removed: { type: Boolean, required: true, default: false }
    })

    userSchema.methods.validPassword = (password, next) => {
      bcrypt.compare(password, this.Password, (err, valid) => {
        if (err) return next(err)
        next(null, valid)
      })
    }

    userSchema.methods.generateHash = password => {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    }

    return this.mongoose.model(this.name, userSchema)
  }
}

module.exports = UserModel
