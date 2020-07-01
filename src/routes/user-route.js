const ExpressRouterAdapter = require('../utils/adapters/express-router-adapter');
const UserComposer = require('../composers/user-composer');

function userRoute(app) {
  app.post(
    '/user/register',
    ExpressRouterAdapter.adapt(UserComposer.composer(), 'register')
  );
  app.get(
    '/user/findByCpf/:cpf',
    ExpressRouterAdapter.adapt(UserComposer.composer(), 'findByCpf')
  );
  app.get(
    '/user/findAll',
    ExpressRouterAdapter.adapt(UserComposer.composer(), 'findAll')
  );
}

module.exports = userRoute;
