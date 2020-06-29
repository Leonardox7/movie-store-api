class Unauthorized {
  constructor() {
    super('Unauthorized');
    this.statusCode;
    this.name = 'UnauthorizedException';
  }
}

module.exports = Unauthorized;
