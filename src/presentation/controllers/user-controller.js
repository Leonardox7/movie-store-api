const HttpResponse = require('../helpers/http-response');

class UserController {
  constructor({ userService, momentAdapter, cpfValidatorAdapter } = {}) {
    this.userService = userService;
    this.momentAdapter = momentAdapter;
    this.cpfValidatorAdapter = cpfValidatorAdapter;
  }

  /**
   * @public
   * @post
   * @param {object} httpRequest
   */
  register(httpRequest) {
    try {
      const required = ['name', 'gender', 'cpf', 'birthday', 'phoneNumber'];

      for (const field of required) {
        if (!httpRequest.params[field])
          return HttpResponse.badRequest(`${field} is required`);
      }

      const MAJORITY_AGE = 18;
      const { name, gender, cpf, birthday, phoneNumber } = httpRequest.params;
      const age = this.momentAdapter.diffYears(birthday);

      if (!this.momentAdapter.isValid(birthday))
        return HttpResponse.badRequest('Invalid birthday');

      if (age < MAJORITY_AGE) return HttpResponse.unauthorized();

      const id = this.userService.insert({
        name,
        gender,
        cpf,
        birthday,
        phoneNumber,
      });
      if (!id) return HttpResponse.internalServerError();

      return HttpResponse.ok('User registered !');
    } catch (e) {
      console.log(e.message);
      return HttpResponse.internalServerError();
    }
  }
}

module.exports = UserController;
