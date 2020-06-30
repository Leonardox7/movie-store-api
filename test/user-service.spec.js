const expect = require('chai').expect;
const UserService = require('../src/services/user-service');

const makeUserRepositoryStub = () => {
  class UserRepositoryStub {
    insert() {
      return true;
    }
  }

  return new UserRepositoryStub();
};

const makeSut = () => {
  const userRepositoryStub = makeUserRepositoryStub();
  const sut = new UserService({ userRepository: userRepositoryStub });

  return {
    sut,
    userRepositoryStub,
  };
};

describe('MovieService', function () {
  describe('#insert', function () {
    it('should return id', function () {
      const { sut } = makeSut();
      const params = {
        name: 'Leonardo',
        birthday: '1998-10-26',
        cpf: '15760505050',
      };
      expect(sut.insert(params)).to.be.an('string');
    });
  });
});
