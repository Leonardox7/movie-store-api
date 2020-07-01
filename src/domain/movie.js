class Movie {
  constructor(_id, name, genre, director, amount) {
    this._id = _id
    this.name = name;
    this.genre = genre;
    this.director = director;
    this.amount = amount;
  }
}

module.exports = Movie;
