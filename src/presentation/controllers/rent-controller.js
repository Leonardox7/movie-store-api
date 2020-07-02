const HttpResponse = require('../helpers/http-response');

class RentController {
  constructor({ cpfValidatorAdapter, rentService, userService } = {}) {
    this.cpfValidatorAdapter = cpfValidatorAdapter;
    this.rentService = rentService;
    this.userService = userService;
  }

  /**
   * @POST
   */
  async rent(httpRequest) {
    try {
      if (!httpRequest.params.userId)
        return HttpResponse.badRequest('userId is required');

      if (!httpRequest.params.movies || httpRequest.params.movies.length === 0)
        return HttpResponse.badRequest('movies is required');

      const { userId, movies } = httpRequest.params;

      const exceedsMovieLimit = await this.rentService.exceedsMovieLimit(
        userId,
        movies.length
      );

      const user = await this.userService.findById(userId);
      if (!user || user.length === 0)
        return HttpResponse.unauthorized('Unauthorized user not registered');

      if (exceedsMovieLimit)
        return HttpResponse.unauthorized('Unauthorized exceeded rent limit');

      const stock = await this.rentService.verifyStockByMovies(movies);
      if (!stock.canRent) return HttpResponse.noContent();

      await this.rentService.rent(user._id, movies);

      return HttpResponse.ok('Book was rent !');
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }

  /**
   * @PUT
   */
  async renew(httpRequest) {
    try {
      if (!httpRequest.params.userId)
        return HttpResponse.badRequest('CPF is required');

      if (
        !httpRequest.params.moviesId ||
        httpRequest.params.moviesId.length === 0
      )
        return HttpResponse.badRequest('moviesId is required');

      const { userId, moviesId } = httpRequest.params;

      const user = await this.userService.findById(userId);

      if (!user)
        return HttpResponse.unauthorized('Unauthorized user not registered');

      const canRenew = await this.rentService.canRenewSameMovie(
        userId,
        moviesId
      );

      if (!canRenew)
        return HttpResponse.unauthorized('Unauthorized exceeded renew rent');

      const wasRenew = await this.rentService.renewMovie(user._id, moviesId);
      if (!wasRenew) return HttpResponse.internalServerError();

      return HttpResponse.ok('Book was renewd !');
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }

  /**
   * @PUT
   */
  async devolution(httpRequest) {
    try {
      if (!httpRequest.params.movies || httpRequest.params.movies.length === 0)
        return HttpResponse.badRequest('movies is required');

      if (!httpRequest.params.userId)
        return HttpResponse.badRequest('userId is required');

      const { userId, movies } = httpRequest.params;
      const rent = await this.rentService.devolution(userId, movies);
      if (!rent) return HttpResponse.internalServerError();

      return HttpResponse.ok('Book was returned !');
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }

  /**
   * @GET
   */
  async findAll() {
    try {
      const rents = await this.rentService.findAll();
      if (!rents || rents.length === 0) return HttpResponse.noContent();

      return HttpResponse.ok(rents);
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }

  /**
   * @GET
   */
  async findByUserId(httpRequest) {
    try {
      if (!httpRequest.params.userId)
        return HttpResponse.badRequest('userId is requireed');

      const rent = await this.rentService.findByUserId(
        httpRequest.params.userId
      );

      if (!rent || rent.length === 0) return HttpResponse.noContent();

      return HttpResponse.ok(rent);
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }

  /**
   * @DELETE
   */
  async delete(httpRequest) {
    try {
      if (!httpRequest.params.id)
        return HttpResponse.badRequest('id is required');

      await this.rentService.removeByUserId(httpRequest.params.id);

      return HttpResponse.ok('Rent deleted !');
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }
}

module.exports = RentController;
