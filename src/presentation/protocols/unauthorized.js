class Unauthorized {
  constructor(message) {
    this.statusCode = 401;
    this.message = message || 'Unauthorized';
  }
}

module.exports = Unauthorized;
