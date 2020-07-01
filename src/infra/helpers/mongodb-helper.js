const mongoose = require('mongoose');

class MongoDbHelper {
  async connect() {
    this.client = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
  }

  async disconnect() {
    await this.client.disconnect();
    this.client = null;
  }

  getCollection(name, schema) {
    if (!this.client) this.connect();
    return mongoose.model(name, schema);
  }

  getSchema() {
    return mongoose.Schema;
  }
}

module.exports = new MongoDbHelper();
