const UserService = require('../services/user-service');
const UserRepository = require('../infra/repositories/user-repository');
const UserController = require('../presentation/controllers/user-controller');
const MomentAdapter = require('../utils/adapters/moment-adapter');
const CpfValidatorAdapter = require('../utils/adapters/cpf-validator-adapter');
const NameValidator = require('../utils/name-validator');
const PhoneNumberValidator = require('../utils/phone-number-validator');

class UserComposer {
  static composer() {
    const momentAdapter = new MomentAdapter();
    const cpfValidatorAdapter = new CpfValidatorAdapter();
    const nameValidator = new NameValidator();
    const phoneNumberValidator = new PhoneNumberValidator();

    const userService = new UserService({ userRepository: UserRepository });

    return new UserController({
      userService,
      momentAdapter,
      cpfValidatorAdapter,
      nameValidator,
      phoneNumberValidator,
    });
  }
}

module.exports = UserComposer;
