import { beacons as config } from 'config';
import Model from './index';

export default class Beacon extends Model {

  constructor(id) {
    super();
    this.id = id;
  }

  /**
   * Updates a beacon's location, or inserts it if no record found
   * @param lat
   * @param lng
   * @returns {*}
   */
  async updateLocation(lat, lng) {
    var time = new Date();
    console.log(time.toLocaleTimeString(), 'Updated location:', this.id, lat, lng);

    return await Model.query(`
      WITH update AS (
        UPDATE beacons
        SET location = ll_to_earth($2, $3), last_seen = NOW()
        WHERE id = $1
        RETURNING id
      )
      INSERT INTO beacons (id, location, last_seen)
      SELECT $1, ll_to_earth($2, $3), NOW()
      WHERE NOT EXISTS (SELECT id FROM update)
    `, [ this.id, lat, lng ]);

  }

  /**
   * Retrieves a list of the closest beacons, ordered by nearest to farthest
   * @returns {SQLResultSetRowList}
   */
  async getNearby() {

    const results = await Model.query(`
      SELECT
        *,
        earth_distance(location, (SELECT location FROM beacons WHERE id = $1)) AS distance
      FROM beacons
      WHERE
        id != $1 AND
        earth_distance(location, (SELECT location FROM beacons WHERE id = $1)) <= $2 AND
        last_seen >= (NOW() - INTERVAL '45 second')
      ORDER BY distance ASC
      LIMIT 5
    `, [ this.id, config.matching.distance.max ]);

    return results.rows;

  }

 //      last_seen >= (NOW() - INTERVAL '${config.matching.timeout} second')
  /**
   * Returns false if out of bounds, or a list if named boundaries that match
   * @returns {*}
   */
  async withinBounds() {

    const results = await Model.query(`
      WITH found AS (
        SELECT
          latitude(location) AS lat,
          longitude(location) AS lng
        FROM beacons
        WHERE id = $1
      )
      SELECT
        *
      FROM (
      SELECT
        name,
        latitude(lower_bound) as l_lat,
        longitude(lower_bound) as l_lng,
        latitude(upper_bound) as u_lat,
        longitude(upper_bound) as u_lng
      FROM boundaries
      ) AS b
      WHERE
        (SELECT lat FROM found) > l_lat AND (SELECT lat FROM found) < u_lat
      AND
        (SELECT lng FROM found) < l_lng AND (SELECT lng FROM found) > u_lng
    `, [ this.id ]);

    if (!results || !results.rows || !results.rows.length) {
      return false;
    } else {
      return results.rows.map(r => r.name);
    }

  }

  async addHistory(lat, lng, lightInfo, inBounds) {
    const [ r, g, b, i ] = lightInfo;
    await Model.query(`
      INSERT INTO history
        (beacon_id, location, r, g, b, intensity, in_boundary, rate)
      VALUES
        ($1, ll_to_earth($2, $3), $4, $5, $6, $7, $8, $9)
    `, [ this.id, lat, lng, r, g, b, i, inBounds, config.rate ])
  }

  /**
   * Given a distance in meters, returns an intensity value from 0-100
   * @param distance
   */
  static calculateIntensity(distance) {

    const { near: NEAR, far: FAR } = config.matching.distance;
    const { low: LOW, high: HIGH } = config.matching.intensity;

    let intensity = LOW;
    if (distance >= FAR) {
      intensity = LOW;
    } else if (distance <= NEAR) {
      intensity = HIGH;
    } else {
      intensity = LOW + ((( FAR - distance ) / 5) * 2)
    }

    return intensity;

  }

}
