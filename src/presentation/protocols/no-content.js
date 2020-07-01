class NoContent {
  constructor(body) {
    this.statusCode = 204;
    this.body = body || 'No content';
  }
}

module.exports = NoContent;
