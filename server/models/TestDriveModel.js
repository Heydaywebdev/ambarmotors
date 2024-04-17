const BaseModel = require('./BaseModel')

class TestDriveModel extends BaseModel {
  constructor(mongoose) {
    super(mongoose, 'TestDrive')
  }

  Initialize() {
    const schema = new this.Schema({
      FirstName: { type: String, required: true },
      MiddleName: { type: String },
      LastName: { type: String, required: true },
      Email: { type: String, required: true },
      Phone: { type: String },
      VIN: { type: String, required: true },
      Date: { type: Date, default: new Date(), required: true },
      Hour: { type: String, required: true },
      Location: { type: String, required: true },
      Comments: { type: String },
      createdAt: { type: Date, default: new Date() },
      removed: { type: Boolean, required: true, default: false }
    })

    return this.mongoose.model(this.name, schema)
  }
}

module.exports = TestDriveModel
