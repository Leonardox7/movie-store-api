const MongoDbHelper = require('../../helpers/mongodb-helper');
const Schema = MongoDbHelper.getSchema();

const movieSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  name_nd: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = movieSchema;
