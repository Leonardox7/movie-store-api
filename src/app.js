require('dotenv').config({ path: './src/config/.env' });

const MongoDbHelper = require('./infra/helpers/mongodb-helper');
const setupMiddlewares = require('./config/middlewares/setup-middlewares');
const setupRoutes = require('./routes/setup-routes');
const router = require('express').Router();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8085;

MongoDbHelper.connect()
  .then(() => {
    setupMiddlewares(app);
    setupRoutes(app, router);
    app.listen(PORT, () => console.log(`App listening at port: ${PORT}`));
  })
  .catch(() => {
    MongoDbHelper.disconnect();
  });
