const ExpressRouterAdapter = require('../utils/adapters/express-router-adapter');
const UserComposer = require('../composers/user-composer');

function userRoute(app) {
  app.post(
    '/user',
    ExpressRouterAdapter.adapt(UserComposer.composer(), 'register')
  );
  app.get(
    '/user/findByCpf/:cpf',
    ExpressRouterAdapter.adapt(UserComposer.composer(), 'findByCpf')
  );
  app.get(
    '/user',
    ExpressRouterAdapter.adapt(UserComposer.composer(), 'findAll')
  );
  app.put(
    '/user/:id',
    ExpressRouterAdapter.adapt(UserComposer.composer(), 'update')
  );
  app.delete(
    '/user/:id',
    ExpressRouterAdapter.adapt(UserComposer.composer(), 'delete')
  );
}

module.exports = userRoute;
