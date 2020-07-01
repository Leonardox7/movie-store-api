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
   * @param {object} httpRequest
   * @POST
   */
  async register(httpRequest) {
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

      const user = await this.userService.findByCpf(cpf);
      if (user && user.length > 0)
        return HttpResponse.conflict('Conflict user already registered');

      const _id = await this.userService.insert({
        name,
        gender,
        cpf,
        birthday,
        phoneNumber,
      });

      if (!_id) return HttpResponse.internalServerError();

      return HttpResponse.ok('User registered !');
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }

  /**
   *
   * @param {object} httpRequest
   * @PUT
   */
  async update(httpRequest) {
    try {
      if (!httpRequest.params.id)
        return HttpResponse.badRequest('id is required');

      if (
        httpRequest.params.cpf &&
        !this.cpfValidatorAdapter.isValid(httpRequest.params.cpf)
      )
        return HttpResponse.badRequest('Invalid cpf');

      if (
        httpRequest.params.birthday &&
        !this.momentAdapter.isValid(httpRequest.params.birthday)
      )
        return HttpResponse.badRequest('Invalid birthday');

      if (
        httpRequest.params.name &&
        !this.nameValidator.isValid(httpRequest.params.name)
      )
        return HttpResponse.badRequest('Invalid name');

      const { id, cpf, birthday, name } = httpRequest.params;

      const updated = await this.userService.update({
        id,
        cpf,
        birthday,
        name,
      });

      if (!updated) return HttpResponse.internalServerError();

      return HttpResponse.ok('User updated !');
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }
  /**
   *
   * @param {object} httpRequest { params: { id } }
   * @DELETE
   */
  async delete(httpRequest) {
    try {
      if (!httpRequest.params.id)
        return HttpResponse.badRequest('id is required');

      await this.userService.remove(httpRequest.params.id);

      return HttpResponse.ok('User deleted !');
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }

  /**
   * @GET
   */
  async findAll() {
    try {
      const users = await this.userService.findAll();
      if (!users || users.length === 0) HttpResponse.noContent();

      return HttpResponse.ok(users);
    } catch (e) {
      console.error(e.message);
      return HttpResponse.internalServerError();
    }
  }

  /**
   * @param {*} httpRequest
   * @GET
   */
  async findByCpf(httpRequest) {
    try {
      if (!this.cpfValidatorAdapter.isValid(httpRequest.params.cpf))
        return HttpResponse.badRequest('Invalid cpf');

      const users = await this.userService.findByCpf(httpRequest.params.cpf);
      if (!users || users.length === 0) HttpResponse.noContent();

      return HttpResponse.ok(users);
    } catch (e) {
      console.error(e);
      return HttpResponse.internalServerError();
    }
  }
}

module.exports = UserController;
