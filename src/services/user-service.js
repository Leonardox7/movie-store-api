const User = require('../domain/user');
const idGenerator = require('./helpers/id-generator');

class UserService {
  constructor({ userRepository } = {}) {
    this.userRepository = userRepository;
  }

  insert({ name, birthday, cpf } = {}) {
    const id = idGenerator();
    const user = new User({ id, name, birthday, cpf });
    this.userRepository.insert(user);
    return id;
  }
}

module.exports = UserService;
