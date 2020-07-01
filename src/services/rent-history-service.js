class RentHistoryService {
  insert() {
    const idRentHistory = idGenerator();
    const rentHistory = new RentHistory(idRentHistory, userId, movie);
  }

  getDescription() {}
}

module.exports = RentHistoryService;
