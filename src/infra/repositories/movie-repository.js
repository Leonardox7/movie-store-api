const MongoDbHelper = require('../helpers/mongodb-helper');
const MovieSchema = require('./schemas/movie-schema');
const MovieRepository = MongoDbHelper.getCollection('movies', MovieSchema);

module.exports = MovieRepository;
