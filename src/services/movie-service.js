const Movie = require('../domain/movie');
const idGenerator = require('./helpers/id-generator');

class MovieService {
  constructor({ movieRepository } = {}) {
    this.movieRepository = movieRepository;
  }

  async insert({ name, genre, director, amount } = {}) {
    const _id = idGenerator();
    const movie = new Movie(_id, name, genre, director, amount);
    await this.movieRepository.create(movie);
    return _id;
  }

  async findAll() {
    return await this.movieRepository.find({});
  }

  async findById(_id) {
    return await this.movieRepository.findOne({ _id });
  }

  async findByName(name) {
    const nameNd = name.toUpperCase();
    return await this.movieRepository.find({ name_nd: nameNd });
  }

  async increaseAmount(_id, amount) {
    return await this.movieRepository.updateOne(
      { _id },
      { $inc: { amount: amount } }
    );
  }

  async remove(_id) {
    return await this.movieRepository.deleteOne({ _id });
  }
}

module.exports = MovieService;
