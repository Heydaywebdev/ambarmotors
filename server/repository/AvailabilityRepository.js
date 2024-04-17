const BaseRepository = require('./BaseRepository')

class TestDriveRepository extends BaseRepository {
  constructor() {
    super('TestDrive')
  }
}

module.exports = TestDriveRepository
