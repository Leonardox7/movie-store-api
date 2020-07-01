const HttpResponse = require('../helpers/http-response');

class RentController {
  constructor({ cpfValidatorAdapter, rentService, userService } = {}) {
    this.cpfValidatorAdapter = cpfValidatorAdapter;
    this.rentService = rentService;
    this.userService = userService;
  }

  /**
   * @param {string} cpf
   * @param {array} movies
   */
  rent(httpRequest) {
    try {
      if (!httpRequest.params.cpf)
        return HttpResponse.badRequest('CPF is required');

      if (!httpRequest.params.movies || httpRequest.params.movies.length === 0)
        return HttpResponse.badRequest('movies is required');

      const { cpf, moviesId } = httpRequest.params;

      if (!this.cpfValidatorAdapter.isValid(cpf))
        return HttpResponse.badRequest('Invalid cpf');

      if (!this.userService.findByCpf(cpf))
        return HttpResponse.unauthorized('Unauthorized user not registered');

      if (this.rentService.exceedsMovieLimit(moviesId.length))
        return HttpResponse.unauthorized('Unauthorized exceeded rent limit');

      const stock = this.rentService.verifyStock(movies);
      if (!stock.canRent)
        return HttpResponse.noContent({ moviesHasNoStock: stock.moviesHasNoStock });

      this.rentService.rent(cpf, moviesId);
      return HttpResponse.ok('Book was rent !');
    } catch (e) {
      console.log(e.message);
      return HttpResponse.internalServerError();
    }
  }

  /**
   * @param {cpf} cpf
   * @param {array} moviesId
   */
  renew(httpRequest) {
    try {
      if (!httpRequest.params.cpf)
        return HttpResponse.badRequest('CPF is required');
      if (
        !httpRequest.params.moviesId ||
        httpRequest.params.movies.length === 0
      )
        return HttpResponse.badRequest('movies is required');

      const { cpf, moviesId } = httpRequest.params;

      if (!this.cpfValidatorAdapter.isValid(cpf))
        return HttpResponse.badRequest('Invalid cpf');

      if (!this.userService.findByCpf(cpf))
        return HttpResponse.unauthorized('Unauthorized user not registered');

      if (!this.rentService.canRenewSameMovie(cpf, moviesId))
        return HttpResponse.unauthorized('Unauthorized exceeded renew rent');

      this.rentService.renewMovie(cpf, moviesId);
    } catch (e) {
      console.log(e.message);
      return HttpResponse.internalServerError();
    }
  }
}

module.exports = RentController;
