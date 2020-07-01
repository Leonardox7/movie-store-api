class RentHistory {
  constructor(_id, userId, moviesId, beginDate, expireAt, returnDate = null) {
    this._id = _id;
    this.userId = userId;
    this.moviesId = moviesId;
    this.beginDate = beginDate;
    this.expireAt = expireAt;
    this.returnDate = returnDate;
    // TODO: REVER PARA COLOCAR DESCRIPTION
  }
}

module.exports = RentHistory;
