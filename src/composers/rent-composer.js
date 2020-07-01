const RentRepository = require('../repositories/rent-repository');
const RentService = require('../services/rent-service');

const MovieService = require('../services/movie-service');
const UserService = require('../services/user-service');

const MovieRepository = require('../repositories/user-repository');
const UserRepository = require('../repositories/user-repository');

const RentController = require('../presentation/controllers/rent-controller');

const MomentAdapter = require('../utils/adapters/moment-adapter');
const CpfValidatorAdapter = require('../utils/adapters/cpf-validator-adapter');

class RentComposer {
  static composer() {
    const momentAdapter = new MomentAdapter();
    const cpfValidatorAdapter = new CpfValidatorAdapter();

    const movieRepository = new MovieRepository();
    const movieService = new MovieService({ movieRepository });

    const userRepository = new UserRepository();
    const userService = new UserService({ userRepository });

    const rentRepository = new RentRepository();
    const rentService = new RentService({
      rentRepository,
      movieService,
      momentAdapter,
    });

    return new RentController({
      cpfValidatorAdapter,
      rentService,
      userService,
    });
  }
}

module.exports = RentComposer;
