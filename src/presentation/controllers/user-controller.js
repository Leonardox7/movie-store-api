const HttpResponse = require('../helpers/http-response');

class UserController {
  constructor({
    userService,
    momentAdapter,
    cpfValidatorAdapter,
    nameValidator,
  } = {}) {
    this.userService = userService;
    this.momentAdapter = momentAdapter;
    this.cpfValidatorAdapter = cpfValidatorAdapter;
    this.nameValidator = nameValidator;
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

      if (!this.nameValidator.isValid(name))
        return HttpResponse.badRequest('Invalid name');

      if (!this.cpfValidatorAdapter.isValid(cpf))
        return HttpResponse.badRequest('Invalid cpf');

      if (!this.momentAdapter.isValid(birthday))
        return HttpResponse.badRequest('Invalid birthday');

      if (age < MAJORITY_AGE)
        return HttpResponse.unauthorized('Not Authorized underage user');

      const _id = this.userService.insert({
        name,
        gender,
        cpf,
        birthday,
        phoneNumber,
      });

      if (!_id) return HttpResponse.internalServerError();

      return HttpResponse.ok('User registered !');
    } catch (e) {
      console.log(e.message);
      return HttpResponse.internalServerError();
    }
  }

  update() { }

  findAll(httpRequest) {
    try {
      const users = this.userService.findAll();
      if (!users || users.length === 0) HttpResponse.noContent();

      return HttpResponse.ok({ data: users });
    } catch (e) {
      console.log(e.message);
      return HttpResponse.internalServerError();
    }
  }

  findByCpf(httpRequest) {
    try {
      if (!this.cpfValidatorAdapter.isValid(httpRequest.params.cpf))
        return HttpResponse.badRequest('Invalid cpf');

      const users = this.userService.findByCpf(httpRequest.params.cpf);
      if (!users || users.length === 0) HttpResponse.noContent();

      return HttpResponse.ok({ data: users });
    } catch (e) {
      console.log(e.message);
      return HttpResponse.internalServerError();
    }
  }

}

module.exports = UserController;
