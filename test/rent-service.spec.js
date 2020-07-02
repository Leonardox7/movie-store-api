require('dotenv').config({ path: './src/config/.env' });
const expect = require('chai').expect;
const MongoDbHelper = require('../src/infra/helpers/mongodb-helper');

const movieSeed = require('./mocks/movie-seed');
const rentSeed = require('./mocks/rent-seed');
const userSeed = require('./mocks/user-seed');

const MomentAdapter = require('../src/utils/adapters/moment-adapter');
const MovieService = require('../src/services/movie-service');
const MovieRepository = require('../src/infra/repositories/movie-repository');

const RentHistoryRepository = require('../src/infra/repositories/rent-history-repository');
const RentHistoryService = require('../src/services/rent-history-service');

const RentRepository = require('../src/infra/repositories/rent-repository');
const RentService = require('../src/services/rent-service');

const UserRepository = require('../src/infra/repositories/user-repository');
const UserService = require('../src/services/user-service');

const makeSut = () => {
  const movieServiceStub = new MovieService({
    movieRepository: MovieRepository,
  });
  const userServiceStub = new UserService({ userRepository: UserRepository });
  const rentHistoryStub = new RentHistoryService({
    rentHistoryRepository: RentHistoryRepository,
  });
  const momentAdapter = new MomentAdapter();
  const sut = new RentService({
    rentRepository: RentRepository,
    rentHistoryService: rentHistoryStub,
    movieService: movieServiceStub,
    momentAdapter: momentAdapter,
  });

  return {
    sut,
    movieServiceStub,
    userServiceStub,
  };
};

describe('RentService', () => {
  before(async () => {
    await MongoDbHelper.connect();
    const { movieServiceStub, userServiceStub } = makeSut();
    movieSeed.forEach((movie) => movieServiceStub.insert(movie));
    userSeed.forEach((user) => userServiceStub.insert(user));
  });

  describe('#rent', () => {
    it('should return success rent', async () => {
      const userId = 'xza8895A5AA';
      const movies = [
        {
          _id: 'abcd',
          name: 'Imbatível em redenção 3',
        },
        {
          _id: '848as4a4av4av',
          name: 'A espera de um milagre',
        },
      ];
      const { sut } = makeSut();
      const response = await sut.rent(userId, movies);
      expect(response).to.be.an('string');
    });
  });

  describe('#stock', () => {
    it('should return array with all movies with key availables', async () => {
      const { sut } = makeSut();
      const moviesInStock = await sut.stock();

      expect(moviesInStock).to.be.an('array');

      moviesInStock.forEach((movie) => {
        expect(movie).to.have.deep.keys({ id: 1, name: 1, availables: 1 });
      });
    });
  });

  describe('#renewMovie', () => {
    it('should return rewnew movie true', async () => {
      const userId = 'xza8895A5AA';
      const moviesId = ['abcd'];
      const { sut } = makeSut();
      const response = await sut.renewMovie(userId, moviesId);

      expect(response).to.be.an('boolean');
      expect(response).to.equal(true);
    });
  });

  after(async () => {
    await MongoDbHelper.disconnect();
    const { movieServiceStub, userServiceStub } = makeSut();
    movieSeed.forEach((movie) => movieServiceStub.remove(movie._id));
    userSeed.forEach((user) => userServiceStub.remove(user._id));
  });
});
