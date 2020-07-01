const MovieController = require('../presentation/controllers/movie-controller');

const MovieRepository = require('../repositories/user-repository');
const MovieService = require('../services/movie-service');

const RentRepository = require('../repositories/rent-repository');
const RentService = require('../services/rent-service');

const MomentAdapter = require('../utils/adapters/moment-adapter');

class MovieComposer {
  static composer() {
    const momentAdapter = new MomentAdapter();

    const movieRepository = new MovieRepository();
    const movieService = new MovieService({ movieRepository });

    const rentRepository = new RentRepository();
    const rentService = new RentService({
      rentRepository,
      movieService,
      momentAdapter,
    });

    return new MovieController({ movieService, rentService });
  }
}

module.exports = MovieComposer;
