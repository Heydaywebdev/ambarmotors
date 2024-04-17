const BaseModel = require('./BaseModel')

class ContactModel extends BaseModel {
  constructor(mongoose) {
    super(mongoose, 'Contact')
  }

  Initialize() {
    const userSchema = new this.Schema({
      FirstName: { type: String, required: true },
      MiddleName: { type: String },
      LastName: { type: String, required: true },
      Email: { type: String, required: true },
      Phone: { type: String },
      Comments: { type: String },
      createdAt: { type: Date, default: new Date() },
      removed: { type: Boolean, required: true, default: false }
    })

    return this.mongoose.model(this.name, userSchema)
  }
}

module.exports = ContactModel
