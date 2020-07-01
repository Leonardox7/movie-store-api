class NameValidator {
  isValid(fullName) {
    if (!fullName) return false;
    const specialCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialCharacter.test(fullName)) return false;
    const partsOfName = fullName.split(' ');
    if (partsOfName.length < 2) return false;
    const firstName = partsOfName[0];
    if (firstName.length < 4) return false;

    return true;
  }
}

module.exports = NameValidator;
