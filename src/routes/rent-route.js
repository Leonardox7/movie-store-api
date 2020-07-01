const ExpressRouterAdapter = require('../utils/adapters/express-router-adapter');
const RentComposer = require('../composers/rent-composer');

function rentRoute(app) {
  app.post(
    '/rent',
    ExpressRouterAdapter.adapt(RentComposer.composer(), 'rent')
  );
  app.get(
    '/rent/renew',
    ExpressRouterAdapter.adapt(RentComposer.composer(), 'renew')
  );
}

module.exports = rentRoute;
