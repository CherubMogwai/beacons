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

    if (total > 1000) {
      console.log([ "Over 8 km: red:", total ]);
      return [ ...[ 0, 0, 255 ], 10];
    } else if ((total < 1000) && (total > 950)) {
      console.log([ "Over 7 km: blue:", total ]);
      return [ ...[0, 0, 255 ], 20];
    } else if ((total < 950) && (total > 900)) {
      console.log([ "Over 6 km: pink:", total ]);
      return [ ...[255, 50, 50 ], 22];
    } else if ((total < 900) && (total > 850)) {
      console.log([ "Over 5 km: green:", total ]);
      return [ ...[0, 255, 0 ], 24];
    } else if ((total < 850) && (total > 800)) {
      console.log([ "Over 4.5 km: yellow:", total ]);
      return [ ...[255, 255, 0 ], 26];
    } else if ((total < 800) && (total > 750)) {
      console.log([ "Over 4 km: cyan", total ]);
      return [ ...[0, 255, 255 ], 28];
    } else if ((total < 750) && (total > 700)) {
      console.log([ "Over 3.5 km: purple:", total ]);
      return [ ...[255, 0, 255 ], 30];
    } else if ((total < 700) && (total > 650)) {
      console.log([ "Over 3 km: red", total ]);
      return [ ...[255, 0, 0 ], 35];
    } else if ((total < 650) && (total > 600)) {
      console.log([ "Over 2.5 km: orange:", total ]);
      return [ ...[255, 165, 0 ], 40];
    } else if ((total < 600) && (total > 550)) {
      console.log([ "Over 2 km: blue:", total ]);
      return [ ...[0, 0, 255 ], 45];
    } else if ((total < 550) && (total > 500)) {
      console.log([ "Over 1.5 km: pink:", total ]);
      return [ ...[255, 100, 100 ], 50];
    } else if ((total < 500) && (total > 475)) {
      console.log([ "Over 1 km: green:", total ]);
      return [ ...[0, 255, 0 ], 55];
    } else if ((total < 475) && (total > 450)) {
      console.log([ "Over 950 m: yellow:", total ]);
      return [ ...[255, 255, 0 ], 60];
    } else if ((total < 450) && (total > 425)) {
      console.log([ "Over 850 m: cyan:", total ]);
      return [ ...[0, 255, 255 ], 65];
    } else if ((total < 425) && (total > 400)) {
      console.log([ "Over 800 m: purple:", total ]);
      return [ ...[255, 0, 255 ], 70];
    } else if ((total < 400) && (total > 350)) {
      console.log([ "Over 700 m: red:", total ]);
      return [ ...[255, 0, 0 ], 75];
    } else if ((total < 350) && (total > 325)) {
      console.log([ "Over 650 m: orange", total ]);
      return [ ...[255, 165, 0 ], 80];
    } else if ((total < 325) && (total > 275)) {
      console.log([ "Over 575 m: blue:", total ]);
      return [ ...[0, 0, 255 ], 82];
    } else if ((total < 275) && (total > 250)) {
      console.log([ "Over 500 m: pink", total ]);
      return [ ...[255, 50, 50 ], 84];
    } else if ((total < 250) && (total > 225)) {
      console.log([ "Over 425 m: green", total ]);
      return [ ...[0, 255, 0 ], 86];
    } else if ((total < 225) && (total > 200)) {
      console.log([ "Over 350 m: yellow", total ]);
      return [ ...[255, 255, 0 ], 88];
    } else if ((total < 200) && (total > 175)) {
      console.log([ "Over 300 m: cyan", total ]);
      return [ ...[0, 255, 255 ], 90];
    } else if ((total < 175) && (total > 150)) {
      console.log([ "Over 225 m: purple", total ]);
      return [ ...[255, 0, 255 ], 92];
    } else if ((total < 150) && (total > 125)) {
      console.log([ "Over 150 m: red", total ]);
      return [ ...[255, 0, 0 ], 94];
    } else if ((total < 125) && (total > 100)) {
      console.log([ "Over 100 m: orange:", total ]);
      return [ ...[255, 50, 50 ], 96];
    } else if (total < 100) {
      console.log([ "less than 100 m:", total ]);
      return [ ...[255, 255, 255 ], 100];
    }
  }
}
