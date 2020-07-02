require('dotenv').config({ path: './src/config/.env' });
const expect = require('chai').expect;
const MongoDbHelper = require('../src/infra/helpers/mongodb-helper');

const movieSeed = require('./mocks/movie-seed');
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

const clearDb = async () => {
  await MovieRepository.deleteMany({});
  await UserRepository.deleteMany({});
  await RentRepository.deleteMany({});
  await RentHistoryRepository.deleteMany({});
};

const populateDb = async () => {
  await MovieRepository.insertMany(movieSeed);
  await UserRepository.insertMany(userSeed);
};

describe('RentService', () => {
  before(async () => {
    await MongoDbHelper.connect();
    await clearDb();
    await populateDb();
  });

  describe('#rent', () => {
    it('should return success first user rent time', async () => {
      const userId = 'xza8895A5AA';
      const movies = [
        {
          _id: 'ofb4w3rkity91ppy3oo3n',
          name: 'Imbatível em redenção 3',
        },
        {
          _id: '2jm74fz22jc7ttea73w2p',
          name: 'A espera de um milagre',
        },
      ];
      const { sut } = makeSut();
      const response = await sut.rent(userId, movies);

      expect(response).to.be.an('string');
    });

    it('should return success rent user already have data in rents', async () => {
      const userId = 'xza8895A5AA';
      const movies = [
        {
          _id: '2jqeogsxakjsl1yfqmv8d',
          name: 'Todo mundo em panico',
        },
        {
          _id: '922eogsxakjsl1yfqmv8d',
          name: 'Fim',
        },
        {
          _id: 'D34eogsxakjsl1yfqmv8d',
          name: 'Zumbilandia',
        },
      ];
      const { sut } = makeSut();
      const response = await sut.rent(userId, movies);

      expect(response).to.be.an('string');
    });
  });

  describe('#verifyStockByMovies', () => {
    it('should return object with condition if can rent and movies have not stock', async () => {
      const movies = [
        {
          _id: '2jm74fz22jc7ttea73w2p',
          name: 'A espera de um milagre',
        },
      ];
      const { sut } = makeSut();
      const rent = await sut.verifyStockByMovies(movies);

      expect(rent).to.be.an('object');
      expect(rent.canRent).to.equal(false);
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
      const moviesId = ['ofb4w3rkity91ppy3oo3n'];
      const { sut } = makeSut();
      const response = await sut.renewMovie(userId, moviesId);

      expect(response).to.be.an('boolean');
      expect(response).to.equal(true);
    });
  });

  describe('#exceedsMovieLimit', () => {
    it('should return doesnt exceeds movie limit', async () => {
      const userId = 'cAEA8485588';
      const movies = [
        {
          _id: 'ofb4w3rkity91ppy3oo3n',
          name: 'Imbatível em redenção 3',
        },
      ];

      const amountMoviesRent = 2;
      const { sut } = makeSut();
      await sut.rent(userId, movies);
      const response = await sut.exceedsMovieLimit(userId, amountMoviesRent);

      expect(response).to.be.an('boolean');
      expect(response).to.equal(false);
    });

    it('should return exceeds movie limit', async () => {
      const userId = 'xza8895A5AA';
      const amountMoviesRent = 2;
      const { sut } = makeSut();
      const response = await sut.exceedsMovieLimit(userId, amountMoviesRent);

      expect(response).to.be.an('boolean');
      expect(response).to.equal(true);
    });
  });

  describe('#devolution', () => {
    it('should return movie was returned', async () => {
      const userId = 'xza8895A5AA';
      const movies = [
        {
          _id: 'ofb4w3rkity91ppy3oo3n',
          name: 'Imbatível em redenção 3',
        },
        {
          _id: '2jm74fz22jc7ttea73w2p',
          name: 'A espera de um milagre',
        },
      ];
      const { sut } = makeSut();
      const response = await sut.devolution(userId, movies);

      expect(response).to.be.an('object');
      expect(response.ok).to.equal(1);
    });
  });

  after(async () => {
    await MongoDbHelper.disconnect();
    await clearDb();
  });
});
