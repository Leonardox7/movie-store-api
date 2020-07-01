const MongoDbHelper = require('../../helpers/mongodb-helper');
const Schema = MongoDbHelper.getSchema();

const rentShema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  movies: {type: Object, required: true},
});

module.exports = rentShema;
