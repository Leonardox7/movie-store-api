const MongoDbHelper = require('../../helpers/mongodb-helper');
const Schema = MongoDbHelper.getSchema();

const rentHistorySchema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
  startDate: { type: String, required: true },
  returnDate: { type: String, required: false },
  wasRenewed: { type: Boolean, required: false },
});

module.exports = rentHistorySchema;
