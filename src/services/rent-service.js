const Rent = require('../domain/rent');
const idGenerator = require('./helpers/id-generator');

class RentService {
  constructor({
    rentRepository,
    rentHistoryService,
    movieService,
    momentAdapter,
  } = {}) {
    this.rentRepository = rentRepository;
    this.rentHistoryService = rentHistoryService;
    this.movieService = movieService;
    this.momentAdapter = momentAdapter;
  }

  async rent(userId, movies) {
    const DAYS_RETURN = 5;
    const startAt = this.momentAdapter.getDate();
    const expireAt = this.momentAdapter.addDays(DAYS_RETURN);
    const rent = await this.findByUserId(userId);

    if (rent)
      return this.updateMovies({ userId, rent, movies, startAt, expireAt });

    return this.insert({ userId, movies, startAt, expireAt });
  }

  async updateMovies({ userId, rent, movies, startAt, expireAt }) {
    const moviesRented = rent.movies;
    const rentHistoryMoviesList = [];

    movies.forEach((movie) => {
      if (moviesRented[movie._id] && !moviesRented[movie._id].returnDate)
        return;

      movie.expireAt = expireAt;
      movie.startAt = startAt;

      moviesRented[movie._id] = {};
      moviesRented[movie._id].id = movie._id;
      moviesRented[movie._id].name = movie.name;
      moviesRented[movie._id].renewedTimes = 0;
      moviesRented[movie._id].startAt = startAt;
      moviesRented[movie._id].expireAt = expireAt;
      moviesRented[movie._id].returnDate = null;

      rentHistoryMoviesList.push(movie);
    });

    await this.rentHistoryService.insertMany(userId, rentHistoryMoviesList);

    await this.rentRepository.updateOne({ userId }, { movies: moviesRented });

    return rent._id;
  }

  async insert({ userId, movies, startAt, expireAt }) {
    const _id = idGenerator();

    const normalizedRentMovies = this._normalizeMovies({
      movies,
      startAt,
      expireAt,
    });
    const newRent = new Rent(_id, userId, normalizedRentMovies);

    const moviesHistoryAdapted = movies.map((movie) => {
      movie.startAt = startAt;
      return movie;
    });

    await this.rentHistoryService.insertMany(userId, moviesHistoryAdapted);
    await this.rentRepository.create(newRent);

    return _id;
  }

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

  async verifyStock(movies) {
    let canRent = true;
    let moviesHasNoStock = [];

    movies.forEach(async (choosedMovie) => {
      const movie = await this.movieService.findById(choosedMovie.id);
      if (!movie) return;

      const basePath = `movies.${choosedMovie.id}`;
      const returnDate = `${basePath}.returnDate`;

      const query = {};
      query[basePath] = { $exists: true };
      query[returnDate] = null;

      const rented = await this.rentRepository.find(query).countDocuments();

      if (movie.amount === rented) {
        canRent = false;
        moviesHasNoStock.push(movie);
      }
    });

    return { canRent, moviesHasNoStock };
  }

  async canRenewSameMovie(userId, moviesId) {
    const rent = await this.rentRepository.findOne({ userId });
    if (!rent || rent.length === 0) return true;

    let canRenew = true;

    moviesId.forEach((movieId) => {
      const movieRented = rent.movies[movieId];
      if (movieRented && movieRented.renewedTimes > 1) canRenew = false;
    });

    return canRenew;
  }

  async renewMovie(userId, moviesId) {
    const DAYS_RETURN = 3;
    const startAt = this.momentAdapter.getDate();
    const expireAt = this.momentAdapter.addDays(DAYS_RETURN);
    const rent = await this.rentRepository.findOne({ userId });

    if (!rent || rent.length === 0) return false;

    const moviesUpdated = rent.movies;

    moviesId.forEach((movieId) => {
      moviesUpdated[movieId].renewedTimes++;
      moviesUpdated[movieId].startAt = startAt;
      moviesUpdated[movieId].expireAt = expireAt;
    });

    await this.rentRepository.updateOne(
      { userId },
      { $set: { movies: moviesUpdated } }
    );

    return true;
  }

  async exceedsMovieLimit(userId, amountMoviesRent) {
    const rent = await this.rentRepository.findOne({ userId });
    if ((!rent || rent.length === 0) && amountMoviesRent < 6) return false;

    const keysMovies = Object.keys(rent.movies);
    const alreadyRent = keysMovies.length;

    return alreadyRent + amountMoviesRent > 5;
  }

  async stock() {
    const movies = await this.movieService.findAll({});
    const moviesRent = await this.rentRepository.find({}, { movies: 1 });

    return movies.map((movie) => {
      let moviesFiltered = [];

      moviesRent.forEach((movieRent) => {
        const moviesRentId = Object.keys(movieRent.movies);
        moviesFiltered = moviesRentId.filter((movieId) => movieId == movie._id);
      });

      return {
        id: movie._id,
        name: movie.name,
        availables: movie.amount - moviesFiltered.length,
      };
    });
  }

  async devolution(userId, movies) {
    const returnDate = this.momentAdapter.getDate();
    const rent = await this.rentRepository.findOne({ userId });

    if (!rent || rent.length === 0) return null;

    const rentMovies = rent.movies;

    movies = movies.map((movie) => {
      const movieRent = rentMovies[movie._id];
      movieRent.returnDate = returnDate;

      rentMovies[movie._id] = {};
      rentMovies[movie._id].id = movieRent.id;
      rentMovies[movie._id].name = movieRent.name;
      rentMovies[movie._id].renewedTimes = movieRent.renewedTimes;
      rentMovies[movie._id].startAt = movieRent.startAt;
      rentMovies[movie._id].expireAt = movieRent.expireAt;
      rentMovies[movie._id].returnDate = returnDate;

      return movieRent;
    });

    const moviesId = movies.map((movie) => movie.id);
    await this.rentHistoryService.removeByUserIdAndMoviesIdAndReturnDate(
      userId,
      moviesId
    );

    await this.rentHistoryService.insertMany(userId, movies);

    return await this.rentRepository.updateOne(
      { userId },
      { movies: rentMovies }
    );
  }

  async findByCpf(cpf) {
    return await this.rentRepository.findOne({ cpf });
  }

  async removeByUserId(userId) {
    return await this.rentRepository.remove({ userId });
  }

  async findAll() {
    return await this.rentRepository.find({});
  }

  async findByUserId(userId) {
    return await this.rentRepository.findOne({ userId });
  }
}

module.exports = RentService;
