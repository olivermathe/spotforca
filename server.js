const Hapi = require('hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const mysql = require('mysql');

const routes = require('./src/routes');

async function ServerStart() {

  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  routes.forEach(route => {

    route.options.tags = ['api'];

    route.options.cors = {
      origin: ['*'],
      additionalHeaders: ['hash']
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
    await DatabaseStart();
    await server.start();
  } catch (error) {
    console.error(error);
  }

}

async function DatabaseStart() {

  const connection = mysql.createConnection({
    host     : 'spotforcar.cvhuek3k2uwy.us-east-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'admin123',
    database : 'spotforca'
  });

  connection.connect( err => {

    if (err)
      throw err;

    global.database = connection;

    return;

  });

}

ServerStart();