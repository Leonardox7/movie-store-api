require('dotenv').config({ path: './src/config/.env' });

const expect = require('chai').expect;
const MovieService = require('../src/services/movie-service');
const MovieRepository = require('../src/infra/repositories/movie-repository');
const MongoDbHelper = require('../src/infra/helpers/mongodb-helper');

describe('MovieService', () => {
  before(async () => {
    await MongoDbHelper.connect();
  });

  describe('#insert', () => {
    it('should return id', async () => {
      const sut = new MovieService({ movieRepository: MovieRepository });
      const params = {
        name: 'X-man no evolution',
        genre: 'Comedy',
        director: 'unknown',
        amount: 10,
      };
      const movie = await sut.insert(params);

      expect(movie).to.be.an('string');
    });
  });

  describe('#increaseAmount', () => {
    it('should return ok updated', async () => {
      const sut = new MovieService({ movieRepository: MovieRepository });
      const foundedMovie = sut.findByName('X-man no evolution');
      const movie = await sut.increaseAmount(foundedMovie._id, 20);

      expect(movie).to.be.an('object');
      expect(movie.ok).to.equal(1);
    });
  });

  describe('#remove', () => {
    it('should remove movie', async () => {
      const sut = new MovieService({ movieRepository: MovieRepository });
      const foundedMovie = sut.findByName('X-man no evolution');
      const movie = await sut.remove(foundedMovie._id);

      expect(movie).to.be.an('object');
      expect(movie.ok).to.equal(1);
    });
  });

  after(async () => {
    await MongoDbHelper.disconnect();
  });
});
