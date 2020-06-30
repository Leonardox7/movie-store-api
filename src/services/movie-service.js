const Movie = require('../domain/movie');
const idGenerator = require('./helpers/id-generator');

class MovieService {
  constructor({ movieRepository } = {}) {
    this.movieRepository = movieRepository;
  }

  insert({ name, genre, director, amount } = {}) {
    const id = idGenerator();
    const movie = new Movie({ id, name, genre, director, amount });
    this.movieRepository.insert(movie);
    return id;
  }

  findAll() {
    const movies = this.movieRepository.find({}).fetch();
    return movies;
  }
}

module.exports = MovieService;
