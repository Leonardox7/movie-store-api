const {
  Unauthorized,
  InternalServerError,
  Success,
  NoContent,
  BadRequest,
} = require('../protocols');

class HttpResponse {
  static ok(message = '') {
    return new Success(message);
  }

  static noContent() {
    return new NoContent();
  }

  static badRequest(message) {
    return new BadRequest(message);
  }

  static internalServerError() {
    return new InternalServerError();
  }

  static unauthorized() {
    return new Unauthorized();
  }
}

module.exports = HttpResponse;
