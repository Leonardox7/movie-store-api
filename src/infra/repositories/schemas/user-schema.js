const MongoDbHelper = require('../../helpers/mongodb-helper');
const Schema = MongoDbHelper.getSchema();

const userShema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  birthday: { type: String, required: true },
  cpf: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
});

userShema.index({ cpf: 1 });

module.exports = userShema;
