export default class Alice {
  constructor() {
    this.name = "Alice";
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

  where_domitia() {
    const domitia = this.get_domitia();

    if (!domitia) {
      return null;
    }

    var R = 6371e3; // metres
    var φ = this.lat * Math.PI / 180;
    var dom_φ = domitia.lat * Math.PI / 180;
    var dom_Δφ = (this.lat - domitia.lat) * Math.PI / 180;
    var dom_Δλ = (domitia.lng - this.lng) * Math.PI / 180;
    var dom_a = Math.sin(dom_Δφ / 2) * Math.sin(dom_Δφ / 2) +
         Math.cos(φ) * Math.cos(dom_φ) *
         Math.sin(dom_Δλ / 2) * Math.sin(dom_Δλ / 2);
    var dom_c = 2 * Math.atan2(Math.sqrt(dom_a), Math.sqrt(1 - dom_a));
    var dom_d = (Math.floor(R * dom_c));
    var dom_q = (dom_d > 12000000) ? '0' : dom_d;

    console.log(["domitia =", dom_q, "meters"]);

    return dom_q;
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

where_alice() { // difference intensity
  const alice = this.get_alice();

  if (!alice) {
    return null;
  }

  var R = 6371e3; // metres
  var φ = this.lat * Math.PI / 180;
  var ali_φ = alice.lat * Math.PI / 180;
  var ali_Δφ = (this.lat - alice.lat) * Math.PI / 180;
  var ali_Δλ = (alice.lng - this.lng) * Math.PI / 180;
  var ali_a = Math.sin(ali_Δφ / 2) * Math.sin(ali_Δφ / 2) +
       Math.cos(φ) * Math.cos(ali_φ) *
       Math.sin(ali_Δλ / 2) * Math.sin(ali_Δλ / 2);
  var ali_c = 2 * Math.atan2(Math.sqrt(ali_a), Math.sqrt(1 - ali_a));
  var ali_d = (Math.floor(R * ali_c));
  var ali_q = (ali_d > 12000000) ? '0' : ali_d;

  console.log(["Alice =", ali_q, "meters"]);

  return ali_q;

}

  get_garance() { // garance is here
    const garance = this.ladies.find((lady) => lady.name === "Garance");
    return garance;
  }

  get_alice() { // alice is here
    const alice = this.ladies.find((lady) => lady.name === "Alice");
    return alice;
  }
  get_domitia() { // domita is here
    const domita = this.ladies.find((lady) => lady.name === "Domita");
    return domita;
  }

  reply() {

    var a = (this.where_alice() );
    var b = (this.where_garance() );
    var c = (this.where_domitia() );
    var total = (a + b + c);

    if (total > 25) {
      console.log([ "Over 25 meters:", total ]);
      return [ ...[ 0, 0, 255 ], 50];
    } else if (total < 25) {
      console.log([ "More than 25 meters:", total ]);
      return [ ...[ 255, 255, 255 ], 5];
    }
  }
}
