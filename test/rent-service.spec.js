const expect = require('chai').expect;

const movieSeed = require('./mocks/movie-seed');
const rentSeed = require('./mocks/rent-seed');
const userSeed = require('./mocks/user-seed');

// rentRepository,
// rentHistoryRepository,
// movieService,
// momentAdapter,

const MomentAdapter = require('../src/utils/adapters/moment-adapter');
const MovieService = require('../src/services/movie-service');
const RentService = require('../src/services/rent-service');

const makeMovieRepositoryStub = () => {
  class MovieRepositoryStub {
    insert() {
      return true;
    }

    find() {
      return {
        fetch: () => movieSeed,
      };
    }

    findOne({ _id }) {
      return {
        fetch: () => movieSeed.find((movie) => movie._id === _id),
      };
    }
  }
  return new MovieRepositoryStub();
};

const makeRentRepositoryStub = () => {
  class RentRepositoryStub {
    find() {
      return {
        fetch: () => rentSeed,
      };
    }
    findOne(cpf) {
      return {
        fetch: () => rentSeed.find((rent) => rent.cpf === cpf),
      };
    }

    insert() {
      return true;
    }
  }

  return new RentRepositoryStub();
};

const makeSut = () => {
  const rentRepositoryStub = makeRentRepositoryStub();
  const movieRepositoryStub = makeMovieRepositoryStub();

  const sut = new RentService({
    rentRepository: rentRepositoryStub,
    movieService: new MovieService({ movieRepository: movieRepositoryStub }),
    momentAdapter: new MomentAdapter(),
  });

  return {
    sut,
    rentRepositoryStub,
    movieRepositoryStub,
  };
};

describe('Rent', function () {
  describe('#rent', function () {
    it('should return success rent', function () {
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
      const response = sut.rent(userId, movies);
      expect(response).to.be.an('object');
      expect(response).to.have.deep.keys({ _id: 1, userId: 1, movies: 1 });
    });

    describe('#stock', function () {
      it('should return success rent', function () {
        const movies = [
          {
            id: 'abcd',
            name: 'Imbatível em redenção 3',
            renewedTimes: 0,
            startAt: '2020-07-03',
            expireAt: '2020-07-08',
            returnDate: null,
          },
        ];
        // const { sut, rentRepositoryStub } = makeSut();

        // expect(response).to.be.an('object');
        // expect(response).to.have.deep.keys({ canRent: 1, moviesHasNoStock: 1 });
      });
    });

    //   describe('#renew', function () {
    //     it('should return success renew', function () {
    //       const request = {
    //         params: {
    //           cpf: '',
    //           moviesId: [],
    //         },
    //       };
    //       const { sut } = makeSut();
    //       const response = sut.rent(request);
    //       expect(response.body).to.be.an('string');
    //       expect(sut.register(response.body)).to.equal(
    //         'Unauthorized user not registered'
    //       );
    //     });

    //     it('should return unauthorized exceeded renew', function () {
    //       const request = {
    //         params: {
    //           cpf: '',
    //           moviesId: [],
    //         },
    //       };
    //       const { sut } = makeSut();
    //       const response = sut.rent(request);
    //       expect(response.body).to.be.an('string');
    //       expect(sut.register(response.body)).to.equal(
    //         'Unauthorized user not registered'
    //       );
    //     });
  });
});
