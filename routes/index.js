import { beacons as config } from 'config';
import Brett from 'models/brett';
import Janet from 'models/janet';
import Alice from 'models/alice';
import Garance from 'models/garance';
import Hollis from 'models/hollis';

import Model from 'models';

const NAMES = {
  "e00fce680b3065fc268242a2": "Alice",
  "420023000c51343334363138": "Janet",
  "1d0053000c51343334363138": "Brett",
  "e00fce68a140f586ed09a7b6": "Garance",
  "e00fce6863fc99f591485187": "Hollis",
}
const Beacons = {
  "Janet": new Janet(),
  "Alice": new Alice(),
  "Brett": new Brett(),
  "Garance": new Garance(),
  "Hollis": new Hollis()
}

export default function(router) {
  router.get('/', async ctx => {
    ctx.body = "Found";
  });
  router.get('/status', async ctx => {
    ctx.body = { success: true };
  });

  router.get('/status/database', async ctx => {
    const success = await Model.testConnection();
    ctx.body = { success };
  });

  router.post('/webhook/location', async ctx => {

    const {
      event,
      data,
      coreid: id,
      published_at: timestamp
    } = ctx.request.body;

    // Auto-acknowledge any particle webhook tests
    if (data === 'test-event') {
      return ctx.body = { success: true };
    }

    const [ lat, lng ] = data.split(',');
    console.log(ctx.request.body);

    const Name = NAMES[id];
    console.log('I AM ' + Name);
    const current = Beacons[Name]
    current.set_lat(lat);
    current.set_lng(lng);
    current.set_ladies([Beacons["Alice"], Beacons["Janet"], Beacons["Brett"], Beacons["Garance"], Beacons["Hollis"]]);
    const response = current.reply();

    ctx.body = response.join(',');



    //const beacon = new Beacon(id);
    //await beacon.updateLocation(lat, lng);

    //const inBounds = await beacon.withinBounds();

    // Default [ r, g, b, intensity ] values
    // let response = config.lightStates.outOfBounds;
    //
    // // Either we turned off boundary matching, or we're in valid bounds
    // if (!config.matching.boundaries || inBounds) {
    //
    //   const nearbyBeacons = await beacon.getNearby();
    //
    //   // Nearby beacons found
    //   if (Array.isArray(nearbyBeacons) && nearbyBeacons.length) {
    //     // Get nearest beacon
    //     const nearest = nearbyBeacons[0];
    //     const { distance } = nearest;
    //     response = [ ...config.lightStates.matched, parseInt(Beacon.calculateIntensity(distance)) ];
    //
    //     console.info('Matched with:', nearest.id, '  Distance:', distance, '  Response:', response);
    //
    //   } else {
    //     console.info('No Match :-( nearbyBeacons.length is', nearbyBeacons.length);
    //     response = config.lightStates.noMatch;
    //   }
    //
    // }

    // ctx.body = response.join(',');

    // beacon.addHistory(lat, lng, response, !!inBounds);

  });

}
