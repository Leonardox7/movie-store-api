const moment = require('moment');

class MomentAdapter {
  diffYears(date) {
    return moment().diff(date, 'years');
  }

  isValid(date) {
    return moment(date, 'YYYY-MM-DD', true).isValid();
  }
}

module.exports = MomentAdapter;
