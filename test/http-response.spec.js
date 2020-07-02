const expect = require('chai').expect;
const HttpResponse = require('../src/presentation/helpers/http-response');

describe('HttpResponse', () => {
  describe('#ok', () => {
    it('should return status code 200', () => {
      const response = HttpResponse.ok();

      expect(response).to.be.an('object');
      expect(response.statusCode).to.equal(200);
      expect(response.data).to.equal('');
    });

    it('should return status code 200 with message', () => {
      const response = HttpResponse.ok('Created movie !');

      expect(response).to.be.an('object');
      expect(response.statusCode).to.equal(200);
      expect(response.data).to.equal('Created movie !');
    });
  });

  describe('#noContent', () => {
    it('should return status code 204', () => {
      const response = HttpResponse.noContent();

      expect(response).to.be.an('object');
      expect(response.statusCode).to.equal(204);
      expect(response.data).to.equal('No content');
    });
  });

  describe('#badRequest', () => {
    it('should return status code 400', () => {
      const response = HttpResponse.badRequest('Invalid name');

      expect(response).to.be.an('object');
      expect(response.statusCode).to.equal(400);
      expect(response.message).to.equal('Invalid name');
    });
  });

  describe('#internalServerError', () => {
    it('should return status code 500', () => {
      const response = HttpResponse.internalServerError();

      expect(response.statusCode).to.equal(500);
      expect(response.message).to.equal('Internal Server Error');
    });
  });

  describe('#conflict', () => {
    it('should return status code 409', () => {
      const response = HttpResponse.conflict();

      expect(response).to.be.an('object');
      expect(response.statusCode).to.equal(409);
      expect(response.message).to.equal('Conflict');
    });
  });

  describe('#unauthorized', () => {
    it('should return status code 401', () => {
      const response = HttpResponse.unauthorized();

      expect(response).to.be.an('object');
      expect(response.statusCode).to.equal(401);
      expect(response.message).to.equal('Unauthorized');
    });
  });
});
