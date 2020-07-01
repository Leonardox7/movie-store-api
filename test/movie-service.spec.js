const expect = require('chai').expect;
const MovieService = require('../src/services/movie-service');


const makeMovieRepositoryStub = () => {
  class MovieRepositoryStub {
    insert() {
      return true;
    }
  }
  return new MovieRepositoryStub();
};

const makeSut = () => {
  const MovieRepositoryStub = makeMovieRepositoryStub();
  return new MovieService({ movieRepository: MovieRepositoryStub });
};

describe('MovieService', function () {
  describe('#insert', function () {
    it('should return id', function () {
      const sut = makeSut();
      const params = {
        name: 'Leonardo',
        birthday: '1998-10-26',
        cpf: '15760505050',
        phoneNumber: '31988888850',
      };
      expect(sut.insert(params)).to.be.an('string');
    });
  });
});
