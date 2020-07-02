const HttpResponse = require('../helpers/http-response');

class MovieController {
  constructor({ movieService, rentService } = {}) {
    this.movieService = movieService;
    this.rentService = rentService;
  }

  /**
   * @POST
   */
  async create(httpRequest) {
    try {
      const required = ['name', 'genre', 'director', 'amount'];
      for (const field of required) {
        if (!httpRequest.params[field])
          return HttpResponse.badRequest(`${field} is required`);
      }

      const { name, genre, director, amount } = httpRequest.params;

      const movie = await this.movieService.findByName(name);

      if (movie && movie.length > 0)
        return HttpResponse.conflict('Movie already registered.');

      const _id = await this.movieService.insert({
        name,
        genre,
        director,
        amount,
      });

      if (!_id) return HttpResponse.internalServerError();

      return HttpResponse.ok('Movie saved !');
    } catch (e) {
      console.error(e.message);
      return HttpResponse.internalServerError();
    }
  }

  /**
   * @PUT
   */
  async increaseAmount(httpRequest) {
    try {
      if (!httpRequest.params.id)
        return HttpResponse.badRequest('id is required');

      if (!httpRequest.params.amount)
        return HttpResponse.badRequest('amount is required');

      const { id, amount } = httpRequest.params;

      await this.movieService.increaseAmount(id, amount);

      return HttpResponse.ok('Stock updated !');
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }

  /**
   * @GET
   */
  async stock() {
    try {
      const stock = await this.rentService.stock();
      if (!stock || stock.length == 0) return HttpResponse.noContent();

      return HttpResponse.ok(stock);
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
      const movies = await this.movieService.findAll();

      return HttpResponse.ok(movies);
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

      await this.movieService.remove(httpRequest.params.id);

      return HttpResponse.ok('Movie deleted !');
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }
}

module.exports = MovieController;
