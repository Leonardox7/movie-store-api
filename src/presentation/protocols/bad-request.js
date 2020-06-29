class BadRequest {
  constructor(message) {
    this.statusCode = 400;
    this.message = message;
  }
}

module.exports = BadRequest;
