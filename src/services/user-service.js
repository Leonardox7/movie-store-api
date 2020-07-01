const User = require('../domain/user');
const idGenerator = require('./helpers/id-generator');

class UserService {
  constructor({ userRepository } = {}) {
    this.userRepository = userRepository;
  }

  insert({ name, birthday, cpf } = {}) {
    const _id = idGenerator();
    const user = new User(_id, name, birthday, cpf);
    this.userRepository.insert(user);
    return _id;
  }

  findAll() {
    return this.userRepository.find({}).fetch();
  }

  findByCpf(cpf) {
    return this.userRepository.findOne({ cpf });
  }
}

module.exports = UserService;
