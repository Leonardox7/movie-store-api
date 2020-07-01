const RentHistory = require('../domain/rent-history');
const idGenerator = require('./helpers/id-generator');

class RentHistoryService {
  constructor({ rentHistoryRepository } = {}) {
    this.rentHistoryRepository = rentHistoryRepository;
  }

  async removeByUserIdAndMoviesIdAndReturnDate(userId, moviesId) {
    console.log();
    await this.rentHistoryRepository.deleteMany({
      userId,
      movieId: { $in: moviesId },
      returnDate: null,
    });
  }

  async insertMany(userId, movies) {
    const rentHistoryList = movies.map((movie) => {
      const _id = idGenerator();
      const wasRenewed = movie.renewedTimes ? true : false;
      return new RentHistory(
        _id,
        userId,
        movie._id || movie.id,
        movie.startAt,
        movie.returnDate,
        wasRenewed
      );
    });

    return await this.rentHistoryRepository.insertMany(rentHistoryList);
  }
}

module.exports = RentHistoryService;
