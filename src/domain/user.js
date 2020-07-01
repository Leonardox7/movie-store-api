class User {
  constructor(_id, name, birthday, cpf, gender, phoneNumber) {
    this._id = _id;
    this.name = name;
    this.birthday = birthday;
    this.cpf = cpf;
    this.gender = gender
    this.phoneNumber = phoneNumber
  }
}

module.exports = User;
