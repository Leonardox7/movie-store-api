require('dotenv').config({ path: './src/config/.env' });

const expect = require('chai').expect;
const UserService = require('../src/services/user-service');
const UserRepository = require('../src/infra/repositories/user-repository');
const MongoDbHelper = require('../src/infra/helpers/mongodb-helper');

describe('UserService', () => {
  before(async () => {
    await MongoDbHelper.connect();
  });

  describe('#insert', () => {
    it('should return _id', async () => {
      const sut = new UserService({ userRepository: UserRepository });
      const params = {
        name: 'Leonardo Maia',
        birthday: '1998-10-26',
        cpf: '15760505050',
        phoneNumber: '3133543210',
        gender: 'male',
      };
      const user = await sut.insert(params);

      expect(user).to.be.an('string');
    });
  });

  describe('#update', () => {
    it('should update user', async () => {
      const sut = new UserService({ userRepository: UserRepository });
      const foundedUser = sut.findByCpf('15760505050');
      const params = {
        id: foundedUser._id,
        birthday: '1998-10-21',
        phoneNumber: '319999999',
      };
      const user = await sut.update(params);

      expect(user).to.be.an('object');
      expect(user.ok).to.equal(1);
    });
  });

  describe('#remove', () => {
    it('should remove user', async () => {
      const sut = new UserService({ userRepository: UserRepository });
      const foundedUser = sut.findByCpf('15760505050');
      const user = await sut.remove(foundedUser._id);

      expect(user).to.be.an('object');
      expect(user.ok).to.equal(1);
    });
  });

  after(async () => {
    await MongoDbHelper.disconnect();
  });
});
