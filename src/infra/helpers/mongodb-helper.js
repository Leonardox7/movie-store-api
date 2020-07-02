const mongoose = require('mongoose');

class MongoDbHelper {
  async connect() {
    const URL = this._getEnvironmentUrl();
    this.client = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
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

  _getEnvironmentUrl() {
    let url = process.env.MONGO_URL_TEST;
    if (process.env.ENVIRONMENT === 'prod') url = process.env.MONGO_URL;

    return url;
  }
}

module.exports = new MongoDbHelper();
