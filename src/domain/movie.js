class Movie {
  constructor(_id, name, name_nd, genre, director, amount) {
    this._id = _id;
    this.name = name;
    this.name_nd = name_nd;
    this.genre = genre;
    this.director = director;
    this.amount = amount;
  }
}

module.exports = Movie;
