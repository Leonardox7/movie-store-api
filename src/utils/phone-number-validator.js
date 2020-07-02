class PhoneNumberValidator {
  isValid(phoneNumber) {
    if (!phoneNumber || typeof phoneNumber !== 'string') return false;

    const regex = /^[0-9]+$/;
    if (!regex.test(phoneNumber)) return false;

    if (phoneNumber.length > 11 || phoneNumber.length < 10) return false;

    return true;
  }
}

module.exports = PhoneNumberValidator;
