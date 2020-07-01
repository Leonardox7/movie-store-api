class RentHistory {
  constructor(
    _id,
    userId,
    movieId,
    startDate,
    returnDate = null,
    wasRenewed = null
  ) {
    this._id = _id;
    this.userId = userId;
    this.movieId = movieId;
    this.startDate = startDate;
    this.returnDate = returnDate;
    this.wasRenewed = wasRenewed;
  }
}

module.exports = RentHistory;
