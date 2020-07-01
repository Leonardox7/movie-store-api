const MovieController = require('../presentation/controllers/movie-controller');
const MovieRepository = require('../infra/repositories/movie-repository');
const MovieService = require('../services/movie-service');
const RentRepository = require('../infra/repositories/rent-repository');
const RentService = require('../services/rent-service');
const MomentAdapter = require('../utils/adapters/moment-adapter');

class MovieComposer {
  static composer() {
    const momentAdapter = new MomentAdapter();
    const movieService = new MovieService({ movieRepository: MovieRepository });
    const rentService = new RentService({
      rentRepository: RentRepository,
      movieService,
      momentAdapter,
    });

    return new MovieController({ movieService, rentService });
  }
}

module.exports = MovieComposer;
