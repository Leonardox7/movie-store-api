const MongoDbHelper = require('../helpers/mongodb-helper');
const RentSchema = require('./schemas/rent-schema');
const RentRepository = MongoDbHelper.getCollection('rents', RentSchema);

module.exports = RentRepository