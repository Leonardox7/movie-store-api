const HttpResponse = require('../helpers/http-response');

class MovieController {
  constructor({ movieService, rentService } = {}) {
    this.movieService = movieService;
    this.rentService = rentService;
  }

  /**
   * @public
   * @post
   */
  create(httpRequest) {
    try {
      const required = ['name', 'genre', 'director', 'amount'];
      for (const field of required) {
        if (!httpRequest.params[field])
          return HttpResponse.badRequest(`${field} is required`);
      }

      const { name, genre, director, amount } = httpRequest.params;
      const _id = this.movieService.insert({ name, genre, director, amount });

      if (!_id) return HttpResponse.internalServerError();

      return HttpResponse.ok({ message: 'Movie saved !' });
    } catch (e) {
      console.log(e.message);
      return HttpResponse.internalServerError();
    }
  }

  stock() {
    try {
      const stock = this.rentService.stock();
      if (!sotck || stock.length == 0) return HttpResponse.noContent();
      return HttpResponse.ok({ data: stock });
    } catch (e) {
      return HttpResponse.internalServerError();
    }
  }

  /**
   * @public
   * @get
   */
  findAll() {
    try {
      const movies = this.movieService.findAll();
      return HttpResponse.ok({ data: movies });
    } catch (e) {
      console.log(e.message);
      return HttpResponse.internalServerError();
    }
  }
}

module.exports = MovieController;
