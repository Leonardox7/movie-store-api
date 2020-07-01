const ExpressRouterAdapter = require('../utils/adapters/express-router-adapter');
const MovieComposer = require('../composers/movie-composer');

function movieRoute(app) {
  app.post(
    '/movie',
    ExpressRouterAdapter.adapt(MovieComposer.composer(), 'create')
  );
  app.get(
    '/movie',
    ExpressRouterAdapter.adapt(MovieComposer.composer(), 'findAll')
  );
  app.get(
    '/movie/stock',
    ExpressRouterAdapter.adapt(MovieComposer.composer(), 'stock')
  );
}

module.exports = movieRoute;
