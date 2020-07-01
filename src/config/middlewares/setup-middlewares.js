const cors = require('./cors');
const jsonParse = require('./json-parse');
function setupMiddlewares(app) {
  app.use(cors);
  app.use(jsonParse);
}

module.exports = setupMiddlewares;
