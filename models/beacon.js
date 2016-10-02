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

    console.log('Updated location:', this.id, lat, lng);

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
      WHERE id != $1
      ORDER BY distance ASC
      LIMIT 5
    `, [ this.id ]);

    return results.rows;

  }

}