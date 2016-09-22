// Config
import { beacons as config } from 'config';

// Libraries
import Koa from 'koa';
import koaValidate from 'koa-validate';
import koaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';

import beaconRoutes from 'routes';
import Model from 'models';

const app = new Koa();
const router = koaRouter();

koaValidate(app);

app
  .use(router.routes())
  .use(router.allowedMethods());

beaconRoutes(router);

// Listen if we have a port specified (tests use the exported app)
const port = process.env.PORT || config.port;
if (port) {
  app.listen(port);
  console.info(`Beacons API - Listening on ${port} in ${process.env.NODE_ENV || 'development'} mode`);
}

// Shutdown handlers for gracefully closing connections
const shutdown = () => {
  console.log('Shutting down...');

  // Your process is going to be reloaded or shut down
  // You have to close all database/socket.io/* connections
  Model.shutdown();

  // Provide some grace time to let any long-running operations finish
  setTimeout(() => {
    process.exit(0);
  }, 1500);
};

process.on('message', msg => {
  if (msg === 'shutdown') {
    shutdown();
  }
});

process.on('SIGINT', shutdown);

// For tests
export default app;