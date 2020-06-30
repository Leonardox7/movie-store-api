const expect = require('chai').expect;
const HttpResponse = require('../src/presentation/helpers/http-response');

describe('HttpResponse', function () {
  describe('#ok', function () {
    it('should return status code 200', function () {
      const response = HttpResponse.ok();
      expect(response).to.be.an('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal('');
    });

    it('should return status code 200 with message', function () {
      const response = HttpResponse.ok('Created movie !');
      expect(response).to.be.an('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal('Created movie !');
    });
  });

  describe('#noContent', function () {
    it('should return status code 204', function () {
      const response = HttpResponse.noContent();
      expect(response).to.be.an('object');
      expect(response.statusCode).to.equal(204);
      expect(response.message).to.equal('No content');
    });
  });

  describe('#badRequest', function () {
    it('should return status code 400', function () {
      const response = HttpResponse.badRequest('Invalid name');
      expect(response).to.be.an('object');
      expect(response.statusCode).to.equal(400);
      expect(response.message).to.equal('Invalid name');
    });
  });

  describe('#internalServerError', function () {
    it('should return status code 500', function () {
      const response = HttpResponse.internalServerError();
      expect(response.statusCode).to.equal(500);
      expect(response.message).to.equal('Internal Server Error');
    });
  });
});
