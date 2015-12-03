import RootRouteComponent from './Component';

if (!process.env.CLIENT) {
  require.ensure = function (arr, cb) {
    cb(require);
  };
}

const RootRoute = {
  component: RootRouteComponent,
  path: '/',

  getChildRoutes(location, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./about').default,
      ]);
    });
  },

  getIndexRoute(location, callback) {
    require.ensure([], function (require) {
      callback(null, require('./home').default);
    });
  },
};

export default RootRoute;
