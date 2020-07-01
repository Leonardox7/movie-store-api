const MongoDbHelper = require('../helpers/mongodb-helper');
const RentHistorySchema = require('./schemas/rent-history-schema');
const RentHistoryRepository = MongoDbHelper.getCollection('rent_histories', RentHistorySchema);
module.exports = RentHistoryRepository;
