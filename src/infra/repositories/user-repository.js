const MongoDbHelper = require('../helpers/mongodb-helper');
const UserSchema = require('./schemas/user-schema');
const UserRepository = MongoDbHelper.getCollection('users', UserSchema);

module.exports = UserRepository;
