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

  static noContent(body) {
    return new NoContent(body);
  }

  static badRequest(message) {
    return new BadRequest(message);
  }

  static internalServerError() {
    return new InternalServerError();
  }

  static unauthorized(message) {
    return new Unauthorized(message);
  }
}

module.exports = HttpResponse;
