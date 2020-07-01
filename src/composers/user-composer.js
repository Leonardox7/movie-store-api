const UserService = require('../services/user-service');

const UserRepository = require('../repositories/user-repository');

const UserController = require('../presentation/controllers/user-controller');

const MomentAdapter = require('../utils/adapters/moment-adapter');
const CpfValidatorAdapter = require('../utils/adapters/cpf-validator-adapter');
const NameValidator = require('../utils/adapters/name-validator');

class UserComposer {
  static composer() {
    const momentAdapter = new MomentAdapter();
    const cpfValidatorAdapter = new CpfValidatorAdapter();
    const nameValidator = new NameValidator();

    const userRepository = new UserRepository();
    const userService = new UserService({ userRepository });

    return new UserController({
      userService,
      momentAdapter,
      cpfValidatorAdapter,
      nameValidator,
    });
  }
}

module.exports = UserComposer;