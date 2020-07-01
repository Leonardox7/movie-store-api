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
  app.put(
    '/movie/increase-amount/:id',
    ExpressRouterAdapter.adapt(MovieComposer.composer(), 'increaseAmount')
  );
  app.delete(
    '/movie/:id',
    ExpressRouterAdapter.adapt(MovieComposer.composer(), 'delete')
  );
}

module.exports = movieRoute;
