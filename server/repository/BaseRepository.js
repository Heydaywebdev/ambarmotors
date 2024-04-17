class BaseRepository {
  constructor(model) {
    this._model = model
  }

  FindAll(
    condition = {},
    limit = null,
    skip = null,
    populate = null,
    sort = { _id: -1 },
    select = null
  ) {
    const myModel = global.db[this._model]

    condition.removed = false

    const query = myModel.find(condition)

    if (sort) query.sort(sort)

    if (limit) query.limit(+limit)
    if (skip) query.skip(+skip)
    if (populate) query.populate(populate)

    if (select) query.select(select)

    return query.exec()
  }

  Count(condition = {}) {
    const myModel = global.db[this._model]
    condition.removed = false
    return myModel.countDocuments(condition).exec()
  }

  Find(condition = {}, populate = null, select = null) {
    const myModel = global.db[this._model]

    condition.removed = false

    const query = myModel.findOne(condition)

    if (select) query.select(select)

    if (populate) {
      query.populate(populate)
    }

    return query.exec()
  }

  FindOneAndUpdate(condition = {}, records = {}, populate = null) {
    const myModel = global.db[this._model]

    condition.removed = false
    records.updatedAt = Date.now()

    const query = myModel.findOneAndUpdate(
      condition,
      { $set: records },
      { returnNewDocument: true }
    )

    if (populate) {
      query.populate(populate)
    }

    return query.exec()
  }

  FindOneAndRemove(condition = {}, populate = null) {
    const myModel = global.db[this._model]
    condition.removed = false

    const query = myModel.findOneAndUpdate(condition, {
      $set: { removed: true }
    })

    if (populate) {
      query.populate(populate)
    }

    return query.exec()
  }

  Aggregate(query) {
    const myModel = global.db[this._model]

    return myModel.aggregate(query).exec()
  }

  Distinct(field, condition = {}) {
    const myModel = global.db[this._model]

    return myModel.distinct(field, condition).exec()
  }

  Create(record, agent = null) {
    record.removed = false
    const myModel = new global.db[this._model](record)

    return myModel.save()
  }

  CreateMany(records) {
    const myModel = global.db[this._model]

    return myModel.insertMany(records)
  }

  Remove(id) {
    const myModel = global.db[this._model]

    return myModel.updateOne({ _id: id }, { $set: { removed: true } }).exec()
  }

  RemoveOne(condition) {
    const myModel = global.db[this._model]

    condition.removed = false

    const query = myModel.updateOne(condition, { $set: { removed: true } })

    return query.exec()
  }

  async RemoveDuplicates(field) {
    const myModel = global.db[this._model]

    const records = await myModel.aggregate([
      {
        $group: {
          _id: { [field]: `$${field}` },
          dups: { $addToSet: '$_id' },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ])

    records.forEach(async doc => {
      doc.dups.shift()
      await myModel.remove({ _id: { $in: doc.dups } })
    })
  }

  RemoveAll(condition = {}) {
    const myModel = global.db[this._model]

    return myModel.updateMany(condition, { $set: { removed: true } }).exec()
  }

  Update(id, record, upsert = false) {
    const myModel = global.db[this._model]

    record.updatedAt = Date.now()

    return myModel
      .updateOne({ _id: id }, { $set: record }, { upsert: upsert })
      .exec()
  }

  UpdateBy(by, record, multi = true, upsert = false) {
    const myModel = global.db[this._model]

    record.updatedAt = Date.now()

    return myModel.updateMany(by, { $set: record }, { upsert: upsert }).exec()
  }

  Upsert(by, record) {
    const myModel = global.db[this._model]

    record.updatedAt = Date.now()

    return myModel.updateMany(by, { $set: record }, { upsert: true }).exec()
  }
}
module.exports = BaseRepository
