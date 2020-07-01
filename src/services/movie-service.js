const Movie = require('../domain/movie');
const idGenerator = require('./helpers/id-generator');

class MovieService {
  constructor({ movieRepository } = {}) {
    this.movieRepository = movieRepository;
  }

  insert({ name, genre, director, amount } = {}) {
    const _id = idGenerator();
    const movie = new Movie(_id, name, genre, director, amount);
    this.movieRepository.insert(movie);
    return _id;
  }

  findAll() {
    return this.movieRepository.find({}).fetch();
  }

  findById(_id) {
    return this.movieRepository.findOne({ _id }).fetch();
  }

  findByName(name) {
    // TODO: Criar regex
    return this.movieRepository.find({ name }).fetch();
  }
}

module.exports = MovieService;
