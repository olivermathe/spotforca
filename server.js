const Hapi = require('hapi');

const routes = require('./src/routes');

const server = Hapi.server({
  port: 3000
});

routes.forEach(route => {

  console.log(route.method, route.path, `(${route.options.description})`);

  server.route(route);

});

server.start();