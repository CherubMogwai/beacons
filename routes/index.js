import { beacons as config } from 'config';
import Beacon from 'models/beacon';

export default function(router) {

  router.get('/status', async ctx => {
    ctx.body = { success: true };
  });

  router.post('/webhook/location', async ctx => {

    const {
      event,
      data,
      coreid: id,
      published_at: timestamp
    } = ctx.request.body;

    // Auto-acknowledge any particle webhook tests
    if (event === 'test-event') {
      return ctx.body = { success: true };
    }

    const [ lat, lng ] = data.split(',');

    const beacon = new Beacon(id);
    await beacon.updateLocation(lat, lng);

    const inBounds = await beacon.withinBounds();

    // Default [ r, g, b, intensity ] values
    let response = config.lightStates.outOfBounds;

    if (inBounds) {

      const nearbyBeacons = await beacon.getNearby();

      // Nearby beacons found
      if (Array.isArray(nearbyBeacons) && nearbyBeacons.length) {
        // Get nearest beacon
        const nearest = nearbyBeacons[0];
        const { distance } = nearest;
        response = [ ...config.lightStates.matched, parseInt(Beacon.calculateIntensity(distance)) ];

        console.info('Matched with:', nearest.id, '  Distance:', distance, '  Response:', response);

      } else {
        response = config.lightStates.noMatch;
      }

    }

    ctx.body = {
      data: response.join(',')
    };

    beacon.addHistory(lat, lng, response, !!inBounds);

  });

}