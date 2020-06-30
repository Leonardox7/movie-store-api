const CPF = require('@fnando/cpf/commonjs');

class CPFValidatorAdapter {
  isValid(cpf) {
    return CPF.isValid(cpf);
  }
}

module.exports = CPFValidatorAdapter;
