import { beacons as config } from 'config';
import pg from 'pg';
import Promise from 'bluebird';

export default class Model {

  static shutdown() {
    pg.end();
  }

  static query(query, params) {
    return new Promise((resolve, reject) => {
      // Sanity checks
      if (!query || query.length === 0) return reject(new Error('No db query provided'));

      // Grab a connection from the pool
      pg.defaults.poolSize = config.db.poolSize || 25;
      pg.connect(config.db.connectionString, (err, client, done) => {

        // Error handler ensures failed connections get closed from pool
        const errorHandler = err => {
          done();
          return reject(err);
        };

        if (err) return errorHandler(err);

        // Run the query
        client.query(query, params, (err, result) => {
          if (err) return errorHandler(err);
          done();
          return resolve(result);
        });

      });
    });
  }

  static async testConnection() {
    const result = await Model.query(`SELECT 1`);
    return result && result.rows && !!result.rows[0];
  }

}
