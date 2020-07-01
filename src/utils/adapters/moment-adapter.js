const moment = require('moment');

class MomentAdapter {
  diffYears(date) {
    return moment().diff(date, 'years');
  }

  isValid(date) {
    return moment(date, 'YYYY-MM-DD', true).isValid();
  }

  addDays(days) {
    return moment().add(days, 'days').format('YYYY-MM-DD');
  }

  getDate() {
    return moment().format('YYYY-MM-DD');
  }
}

module.exports = MomentAdapter;
