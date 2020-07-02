const User = require('../domain/user');
const idGenerator = require('./helpers/id-generator');

class UserService {
  constructor({ userRepository } = {}) {
    this.userRepository = userRepository;
  }

  async insert({ name, birthday, cpf, gender, phoneNumber } = {}) {
    const _id = idGenerator();
    const user = new User(_id, name, birthday, cpf, gender, phoneNumber);
    await this.userRepository.create(user);
    return _id;
  }

  async update({ id, name, phoneNumber, birthday, cpf } = {}) {
    const query = {};

    if (name) query.name = name;
    if (phoneNumber) query.phoneNumber = phoneNumber;
    if (birthday) query.birthday = birthday;
    if (cpf) query.cpf = cpf;

    return await this.userRepository.updateOne({ _id: id }, query);
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async remove(_id) {
    return await this.userRepository.deleteOne({ _id });
  }

  async findById(_id) {
    return await this.userRepository.findOne({ _id });
  }

  async findByCpf(cpf) {
    return await this.userRepository.findOne({ cpf });
  }
}

module.exports = UserService;
