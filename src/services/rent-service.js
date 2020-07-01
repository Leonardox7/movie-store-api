const Rent = require('../domain/rent');
const RentHistory = require('../domain/rent-history');

const idGenerator = require('./helpers/id-generator');

class RentService {
  constructor({
    rentRepository,
    rentHistoryRepository,
    movieService,
    momentAdapter,
  } = {}) {
    this.rentRepository = rentRepository;
    this.rentHistoryRepository = rentHistoryRepository;
    this.movieService = movieService;
    this.momentAdapter = momentAdapter;
  }

  /**
   * @param {string} userId
   * @param {array} movies
   */
  rent(userId, movies) {
    const _id = idGenerator();
    const DAYS_RETURN = 5;
    const startAt = this.momentAdapter.getDate();
    const expireAt = this.momentAdapter.addDays(DAYS_RETURN);

    const normalizedRentMovies = this._normalizeMovies({
      movies,
      startAt,
      expireAt,
    });
    const rent = new Rent(_id, userId, normalizedRentMovies);

    this.rentRepository.insert(rent);
    // TODO: salvar history
    return rent;
  }

  /**
   * @private
   * @param {object} args
   * @returns {array}
   */
  _normalizeMovies({ movies, startAt, expireAt }) {
    let hashMovies = {};

    movies.forEach((movie) => {
      hashMovies[movie._id] = {};
      hashMovies[movie._id].id = movie._id;
      hashMovies[movie._id].name = movie.name;
      hashMovies[movie._id].renewedTimes = 0;
      hashMovies[movie._id].startAt = startAt;
      hashMovies[movie._id].expireAt = expireAt;
      hashMovies[movie._id].returnDate = null;
    });

    return hashMovies;
  }

  /**
   * @param {array} movies
   * @returns {boolean}
   */
  verifyStock(movies) {
    let canRent = true;
    let moviesHasNoStock = [];

    movies.forEach((choosedMovie) => {
      const movie = this.movieService.findById(choosedMovie.id);
      const basePath = `movies.${choosedMovie.id}`;
      const returnDate = `${basePath}.returnDate`;

      const query = {};
      query[basePath] = { $exists: true };
      query[returnDate] = null;

      const rented = this.rentRepository.find(query).count();
      if (movie.amount === rented) {
        canRent = false;
        moviesHasNoStock.push(movie);
      }
    });

    if (!canRent) return { canRent, moviesHasNoStock };

    return { canRent };
  }

  /**
   * @param {string} cpf
   * @param {array} moviesId
   * @returns {boolean}
   */
  canRenewSameMovie(cpf, moviesId) {
    const rent = this.findByCpf(cpf);
    if (!rent) return true;

    const canRenew = true;
    moviesId.forEach((movieId) => {
      const movie = rent.movies[movieId];
      if (movie && movie.renewedTimes > 1) canRenew = false;
    });

    return canRenew;
  }

  /**
   * @param {string} cpf
   * @param {array} moviesId
   */
  renewMovie(cpf, moviesId) {
    const DAYS_RETURN = 3;
    const startAt = this.momentAdapter.getDate();
    const expireAt = this.momentAdapter.addDays(DAYS_RETURN);
    const rent = this.findByCpf(cpf);
    if (!rent) return false;

    const moviesUpdated = rent.movies;

    moviesId.forEach((movieId) => {
      moviesUpdated[movieId].renewedTimes++;
      moviesUpdated[movieId].startAt = startAt;
      moviesUpdated[movieId].expireAt = expireAt;
    });

    this.rentRepository.updateOne({ cpf }, { $set: { movies: moviesUpdated } });

    return true;
  }

  /**
   * @param {string} cpf
   * @param {number} amountMoviesRent
   * @returns {boolean}
   */
  exceedsMovieLimit(cpf, amountMoviesRent) {
    const rent = this.rentRepository.find({ cpf });
    if (!rent && amountMoviesRent < 6) return false;

    const alreadyRent = rent.moviesId ? rent.moviesId.length : 0;
    return alreadyRent + amountMoviesRent > 5;
  }

  /**
   * @param {string} cpf
   * @returns {object}
   */
  findByCpf(cpf) {
    return this.rentRepository.findOne({ cpf });
  }

  /**
   * @param {string} cpf
   */
  removeByCpf(cpf) {
    return this.rentRepository.remove({ cpf });
  }

  stock() {
    const movies = this.movieService.findAll({});
    const moviesRent = this.rentRepository.find({}, { movies: 1 }).fetch();

    return movies.map((movie) => {
      let moviesFiltered = [];

      moviesRent.forEach((movieRent) => {
        const moviesRentId = Object.keys(movieRent.movies);
        moviesFiltered = moviesRentId.filter(
          (movieId) => movieId === movie._id
        );
      });
      return {
        id: movie._id,
        name: movie.name,
        availables: moviesFiltered.length - movie.amount,
      };
    });
  }
}

module.exports = RentService;
