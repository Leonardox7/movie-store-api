const movieRoute = require('./movie-route');
const rentRoute = require('./rent-route');
const useRoute = require('./user-route');

function setupRoutes(app, router) {
  app.use('/api', router);
  movieRoute(app);
  rentRoute(app);
  useRoute(app);
}

module.exports = setupRoutes;
