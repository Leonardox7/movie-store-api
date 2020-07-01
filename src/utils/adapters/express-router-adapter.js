class ExpressRouterAdapter {
  /**
   * @param {function} router
   * @param {string} methodName
   */
  static adapt(router, methodName) {
    return async (req, res) => {
      const httpRequest = {
        params: req.params,
      };
      const httpResponse = await router[methodName](httpRequest);
      res.status(httpResponse.statusCode).send(httpResponse);
    };
  }
}

module.exports = ExpressRouterAdapter;
