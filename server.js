const Hapi = require('hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const routes = require('./src/routes');

async function ServerStart() {

  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  routes.forEach(route => {

    route.options.tags = ['api'];

    route.options.cors = {
      origin: ['*'],
      headers: ['hash']
    };

    server.route(route);

  });

  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: Pack.version,
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  try {
    await server.start();
  } catch (error) {
    console.error(error);
  }

}

ServerStart();