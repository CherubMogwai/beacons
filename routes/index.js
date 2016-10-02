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

    const [ lat, lng ] = data.split(',');

    const beacon = new Beacon(id);
    await beacon.updateLocation(lat, lng);
    const nearbyBeacons = await beacon.getNearby();

    // Default [ r, g, b, intensity ] values
    let response = config.lightStates.outOfBounds;

    // Nearby beacons found
    if (Array.isArray(nearbyBeacons) && nearbyBeacons.length) {
      // Get nearest beacon
      const nearest = nearbyBeacons[0];
      const { distance } = nearest;



    }

    ctx.body = {
      data: response.join(',')
    };

  });

}