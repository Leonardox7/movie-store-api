class Conflict {
  constructor(message) {
    this.statusCode = 409;
    this.message = message || 'Conflict';
  }
}

module.exports = Conflict;
