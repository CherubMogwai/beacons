export default class Domitia {
  constructor() {
    this.name = "Domitia";
    this.lat = 0;
    this.lng = 0;
    this.ladies = [];
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

  where_garance() {
    const garance = this.get_garance();

    if (!garance) {
      return null;
    }

    var R = 6371e3; // metres
    var φ = this.lat * Math.PI / 180;
    var gar_φ = garance.lat * Math.PI / 180;
    var gar_Δφ = (this.lat - garance.lat) * Math.PI / 180;
    var gar_Δλ = (garance.lng - this.lng) * Math.PI / 180;
    var gar_a = Math.sin(gar_Δφ / 2) * Math.sin(gar_Δφ / 2) +
         Math.cos(φ) * Math.cos(gar_φ) *
         Math.sin(gar_Δλ / 2) * Math.sin(gar_Δλ / 2);
    var gar_c = 2 * Math.atan2(Math.sqrt(gar_a), Math.sqrt(1 - gar_a));
    var gar_d = (Math.floor(R * gar_c));
    var gar_q = (gar_d > 12000000) ? '0' : gar_d;

    console.log(["Garance =", gar_q, "meters"]);

    return gar_q;
  }

where_hollis() { // difference intensity
  const hollis = this.get_hollis();

  if (!hollis) {
    return null;
  }

  var R = 6371e3; // metres
  var φ = this.lat * Math.PI / 180;
  var hol_φ = hollis.lat * Math.PI / 180;
  var hol_Δφ = (this.lat - hollis.lat) * Math.PI / 180;
  var hol_Δλ = (hollis.lng - this.lng) * Math.PI / 180;
  var hol_a = Math.sin(hol_Δφ / 2) * Math.sin(hol_Δφ / 2) +
       Math.cos(φ) * Math.cos(hol_φ) *
       Math.sin(hol_Δλ / 2) * Math.sin(hol_Δλ / 2);
  var hol_c = 2 * Math.atan2(Math.sqrt(hol_a), Math.sqrt(1 - hol_a));
  var hol_d = (Math.floor(R * hol_c));
  var hol_q = (hol_d > 12000000) ? '0' : hol_d;

  console.log(["Hollis =", hol_q, "meters"]);

  return hol_q;

}

  get_garance() { // garance is here
    const garance = this.ladies.find((lady) => lady.name === "Garance");
    return garance;
  }

  get_hollis() { // hollis is here
    const hollis = this.ladies.find((lady) => lady.name === "Hollis");
    return hollis;
  }

  reply() {

    var a = (this.where_hollis() );
    var b = (this.where_garance() );
    var total = (a + b);

    if (total > 25) {
      console.log([ "Over 25 meters:", total ]);
      return [ ...[ 0, 0, 255 ], 50];
    } else if (total < 25) {
      console.log([ "More than 25 meters:", total ]);
      return [ ...[ 255, 255, 255 ], 50];
    } else if (total < 1) {
      console.log([ "Over 25 meters:", total ]);
      return [ ...[ 100, 100, 100 ], 50];
    }
  }
}
