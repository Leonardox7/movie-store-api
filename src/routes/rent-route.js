const ExpressRouterAdapter = require('../utils/adapters/express-router-adapter');
const RentComposer = require('../composers/rent-composer');

function rentRoute(app) {
  app.post(
    '/rent',
    ExpressRouterAdapter.adapt(RentComposer.composer(), 'rent')
  );
  app.put(
    '/rent/renew-by-userId/:userId',
    ExpressRouterAdapter.adapt(RentComposer.composer(), 'renew')
  );
  app.put(
    '/rent/devolution-by-userId/:userId',
    ExpressRouterAdapter.adapt(RentComposer.composer(), 'devolution')
  );
  app.get(
    '/rent',
    ExpressRouterAdapter.adapt(RentComposer.composer(), 'findAll')
  );
  app.get(
    '/rent/by-user-id/:userId',
    ExpressRouterAdapter.adapt(RentComposer.composer(), 'findByUserId')
  );
  app.delete(
    '/rent/:id',
    ExpressRouterAdapter.adapt(RentComposer.composer(), 'delete')
  );
}

module.exports = rentRoute;
