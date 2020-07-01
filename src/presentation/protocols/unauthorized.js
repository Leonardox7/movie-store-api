class Unauthorized {
  constructor(message) {
    this.statusCode;
    this.message = message || 'Unauthorized';
  }
}

module.exports = Unauthorized;
