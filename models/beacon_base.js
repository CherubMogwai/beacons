export default class Beacon {
  constructor(name) {
    this.name = name;
    this.lat = 0;
    this.lng = 0;
    this.ladies = {};
  }
  set_lat(lat) {
    this.lat = lat;
  }
  set_lng(lng) {
    this.lng = lng
  }
  set_ladies(beacons) {
    this.ladies = beacons
  }

  where(name) {
    const otherBeacon = this.ladies[name];
    //const domitia = this.get_domitia();

    if (!otherBeacon) {
      return 0;
    }

    const MAX_DISTANCE = 12000000;
    var R = 6371e3; // metres
    var φ = this.lat * Math.PI / 180;
    var oth_φ = otherBeacon.lat * Math.PI / 180;
    var oth_Δφ = (this.lat - otherBeacon.lat) * Math.PI / 180;
    var oth_Δλ = (otherBeacon.lng - this.lng) * Math.PI / 180;
    var oth_a = Math.sin(oth_Δφ / 2) * Math.sin(oth_Δφ / 2) +
         Math.cos(φ) * Math.cos(oth_φ) *
         Math.sin(oth_Δλ / 2) * Math.sin(oth_Δλ / 2);
    var oth_c = 2 * Math.atan2(Math.sqrt(oth_a), Math.sqrt(1 - oth_a));
    var oth_d = (Math.floor(R * oth_c));
    var oth_q = (oth_d > MAX_DISTANCE) ? 0 : oth_d;

    console.log([name, " =", oth_q, "meters"]);

    return oth_q;
  }


  reply() {
    const total = Object.keys(this.ladies)
      .map(lady => lady !== this.name ? this.where(lady) : 0)
      .reduce((prev, cur) => (prev + cur), 0);
    /*  var a = (this.where('hollis');
    var b = (this.where_garance() );
    var c = (this.where_domitia() );
    var total = (a + b + c);*/

    if (total > 25) {
      console.log([ "Over 25 meters:", total ]);
      return [ ...[ 0, 0, 255 ], 100];
    } else if (total < 25) {
      console.log([ "Less than 25 meters:", total ]);
      return [ ...[255, 255, 0 ], 100];
    }
  }
}
