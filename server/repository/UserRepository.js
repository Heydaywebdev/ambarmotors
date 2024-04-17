const bcrypt = require('bcryptjs')
const BaseRepository = require('./BaseRepository')

class UserRepository extends BaseRepository {
  constructor() {
    super('User')
  }

  Create(record) {
    record.Password = bcrypt.hashSync(record.Password, bcrypt.genSaltSync(8))
    return super.Create(record)
  }
}

module.exports = UserRepository
