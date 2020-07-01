const RentRepository = require('../infra/repositories/rent-repository');
const RentService = require('../services/rent-service');
const RentHistoryService = require('../services/rent-history-service');
const RentHistoryRepository = require('../infra/repositories/rent-history-repository');
const MovieService = require('../services/movie-service');
const UserService = require('../services/user-service');
const MovieRepository = require('../infra/repositories/movie-repository');
const UserRepository = require('../infra/repositories/user-repository');
const RentController = require('../presentation/controllers/rent-controller');
const MomentAdapter = require('../utils/adapters/moment-adapter');
const CpfValidatorAdapter = require('../utils/adapters/cpf-validator-adapter');

class RentComposer {
  static composer() {
    const momentAdapter = new MomentAdapter();
    const cpfValidatorAdapter = new CpfValidatorAdapter();

    const movieService = new MovieService({ movieRepository: MovieRepository });
    const userService = new UserService({ userRepository: UserRepository });
    const rentHistoryService = new RentHistoryService({
      rentHistoryRepository: RentHistoryRepository,
    });
    const rentService = new RentService({
      rentRepository: RentRepository,
      rentHistoryService,
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
