class NoContent {
  constructor(data) {
    this.statusCode = 204;
    this.data = data || 'No content';
  }
}

module.exports = NoContent;
