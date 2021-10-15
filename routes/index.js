import { beacons as config } from 'config';
import Brett from 'models/brett';
//import Janet from 'models/janet';
import Alice from 'models/alice';
import Garance from 'models/garance';
//import Hollis from 'models/hollis';
import Minor from 'models/minor';
//import Major from 'models/major';
import Aemelia from 'models/aemelia';
//import Younger from 'models/younger';
import Elder from 'models/elder';
//import Drusilla from 'models/drusilla';
//import Paulina from 'models/paulina';
import Marcia from 'models/marcia';
import Pomponia from 'models/pomponia';
//import Aquillia from 'models/aquillia';
import Lucilla from 'models/lucilla';
import Vipsania from 'models/vipsania';
import Messalina from 'models/messalina';
import Livilla from 'models/livilla';
import Domitia from 'models/domitia';
//import Aurelia from 'models/aurelia';
import Hersilia from 'models/hersilia';
//import Lucretia from 'models/lucretia';
import Cornelia from 'models/cornelia';
import Antonia from 'models/antonia';
import Agrippina from 'models/agrippina';
import Octavia from 'models/octavia';
import Claudia from 'models/claudia';
import Julia from 'models/julia';
import Servilia from 'models/servilia';
import BeaconBase from 'models/beacon_base';

import Model from 'models';

const NAMES = {
  "e00fce680b3065fc268242a2": "Alice",
  //"420023000c51343334363138": "Janet",
  "1d0053000c51343334363138": "Brett",
  "e00fce68a140f586ed09a7b6": "Garance",
  //"e00fce6863fc99f591485187": "Hollis",
  "e00fce68aef1348e8458a995": "Minor",
  //"e00fce687ffd264a57a3d47f": "Major",
  "e00fce68b49dabcf8d2d2d3f": "Aemelia",
  //"e00fce688f6eee5263cf01e9": "Younger",
  "e00fce68d9f6cc82af63e8cd": "Elder",
  //"e00fce686912e2ca35537271": "Drusilla",
  //"e00fce68738521303818cf4c": "Paulina",
  "e00fce68e5d4f33e964ab215": "Marcia",
  "e00fce68e4aa1fccfda98910": "Pomponia",
  //"e00fce68a388ca3b05ab3f3c": "Aquillia",
  "e00fce6899249c9042b62b54": "Lucilla",
  "e00fce683f786d6c32b71e4c": "Vipsania",
  "e00fce68cfea635d70647499": "Messalina",
  "e00fce68c37aae141a05dbc5": "Livilla",
  "e00fce6806b373be9fd18ebf": "Domitia",
  //"e00fce680e5e6ab4488ff782": "Aurelia",
  "e00fce6863bca504c0ac62c9": "Hersilia",
  //"e00fce682ed8c525abfdb09f": "Lucretia",
  "e00fce688bcb5aafdcba753d": "Cornelia",
  "e00fce682aae7cb072f6126f": "Antonia",
  "e00fce687745720980a8c8ee": "Agrippina",
  "e00fce6801bb1c3c104fba9e": "Octavia",
  "e00fce684c8ba1582a978469": "Claudia",
  "e00fce6838bf38fe67ce034b": "Julia",
  "e00fce681d39530a3793925c": "Servilia",
}
const Beacons = {
  //"Janet": new BeaconBase('Janet'),
  "Alice": new BeaconBase('Alice'),
  "Brett": new BeaconBase('Brett'),
  "Garance": new BeaconBase('Garance'),
  //"Hollis": new BeaconBase('Hollis'),
  "Minor": new BeaconBase('Minor'),
  //"Major": new BeaconBase('Major'),
  "Aemelia": new BeaconBase('Aemelia'),
  //"Younger": new BeaconBase('Younger'),
  "Elder": new BeaconBase('Elder'),
  //"Drusilla": new BeaconBase('Drusilla'),
  //"Paulina": new BeaconBase('Paulina'),
  "Marcia": new BeaconBase('Marcia'),
  "Pomponia": new BeaconBase('Pomponia'),
  //"Aquillia": new BeaconBase('Aquillia'),
  "Lucilla": new BeaconBase('Lucilla'),
  "Vipsania": new BeaconBase('Vipsania'),
  "Messalina": new BeaconBase('Messalina'),
  "Livilla": new BeaconBase('Livilla'),
  "Domitia": new BeaconBase('Domitia'),
  //"Aurelia": new BeaconBase('Aurelia'),
  "Hersilia": new BeaconBase('Hersilia'),
  //"Lucretia": new BeaconBase('Lucretia'),
  "Cornelia": new BeaconBase('Cornelia'),
  "Antonia": new BeaconBase('Antonia'),
  "Agrippina": new BeaconBase('Agrippina'),
  "Octavia": new BeaconBase('Octavia'),
  "Claudia": new BeaconBase('Claudia'),
  "Julia": new BeaconBase('Julia'),
  "Servilia": new BeaconBase('Servilia'),
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
    //current.set_ladies([Beacons["Alice"], Beacons["Janet"], Beacons["Brett"], Beacons["Garance"], Beacons["Hollis"], Beacons["Minor"], Beacons["Major"], Beacons["Aemelia"], Beacons["Younger"], Beacons["Elder"], Beacons["Drusilla"], Beacons["Paulina"], Beacons["Marcia"], Beacons["Pomponia"], Beacons["Aquillia"], Beacons["Lucilla"], Beacons["Vipsania"], Beacons["Messalina"], Beacons["Livilla"], Beacons["Domitia"], Beacons["Aurelia"], Beacons["Hersilia"], Beacons["Lucretia"], Beacons["Cornelia"], Beacons["Antonia"], Beacons["Agrippina"], Beacons["Octavia"], Beacons["Claudia"], Beacons["Julia"], Beacons["Servilia"]]);
    current.set_ladies(Beacons);
    const response = current.reply();

    ctx.body = Array.isArray(response) ? response.join(',') : response;



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
