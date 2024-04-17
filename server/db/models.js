const UserModel = require('../models/UserModel')
const ContactModel = require('../models/ContactModel')
const TestDriveModel = require('../models/TestDriveModel')
const AvailabilityModel = require('../models/AvailabilityModel')

class Models {
  constructor(mongoose) {
    this.mongoose = mongoose
  }

  Load() {
    return {
      mongoose: this.mongoose,
      User: new UserModel(this.mongoose),
      Contact: new ContactModel(this.mongoose),
      TestDrive: new TestDriveModel(this.mongoose),
      Availability: new AvailabilityModel(this.mongoose)
    }
  }
}

module.exports = Models
