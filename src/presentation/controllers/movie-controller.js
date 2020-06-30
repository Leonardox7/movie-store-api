const HttpResponse = require('../helpers/http-response');

class MovieController {
  constructor({ movieService } = {}) {
    this.movieService = movieService;
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
      const id = this.movieService.insert({ name, genre, director, amount });

      if (!id) return HttpResponse.internalServerError();

      return HttpResponse.ok({ message: 'Movie saved !' });
    } catch (e) {
      console.log(e.message);
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
      return HttpResponse.ok({ result: movies });
    } catch (e) {
      console.log(e.message);
      return HttpResponse.internalServerError();
    }
  }
}

module.exports = MovieController;
