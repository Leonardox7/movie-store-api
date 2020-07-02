class RentHistory {
  constructor(
    _id,
    userId,
    movieId,
    startAt,
    returnDate = null,
    wasRenewed = null
  ) {
    this._id = _id;
    this.userId = userId;
    this.movieId = movieId;
    this.startAt = startAt;
    this.returnDate = returnDate;
    this.wasRenewed = wasRenewed;
  }
}

module.exports = RentHistory;
