class InternalServerError extends Error {
  constructor() {
    super('Internal Server Error');
    this.statusCode = 500;
    this.name = 'InternalServerError';
  }
}

module.exports = InternalServerError;
