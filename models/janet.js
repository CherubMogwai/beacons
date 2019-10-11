
export default class Janet {
  constructor(){
    this.name = "Janet";
    this.lat = 0;
    this.lng = 0;
    this.ladies = [];
  }

  set_lat(lat) {
    this.lat = lat;
  }
  set_lng(lng) {
    this.lng = lng;
  }
  set_ladies(beacons){
    this.ladies = beacons;
  }

    where_brett() {
      const brett = this.get_brett();

      if (!brett) {
        return null;
      }

      var R = 6371e3; // metres
      var φ1 = this.lat * Math.PI / 180;
      var φ2 = brett.lat * Math.PI / 180;

      var aΔφ = (this.lat - brett.lat) * Math.PI / 180;
      var aΔλ = (brett.lng - this.lng) * Math.PI / 180;

      var a = Math.sin(aΔφ / 2) * Math.sin(aΔφ / 2) +
           Math.cos(φ1) * Math.cos(φ2) *
           Math.sin(aΔλ / 2) * Math.sin(aΔλ / 2);

      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = (Math.floor(R * c));

      console.log(["Brett =", d, "meters"]);
      return d;
    }

  where_alice() { // difference intensity
    const alice = this.get_alice();

    if (!alice) {
      return null;
    }

    var R = 6371e3; // metres
    var φ1 = this.lat * Math.PI / 180;
       // var φ2 = brett.lat * Math.PI / 180;
    var φ3 = alice.lat * Math.PI / 180;

    var bΔφ = (this.lat - alice.lat) * Math.PI / 180;
    var bΔλ = (alice.lng - this.lng) * Math.PI / 180;

    var e = Math.sin(bΔφ / 2) * Math.sin(bΔφ / 2) +
            Math.cos(φ1) * Math.cos(φ3) *
            Math.sin(bΔλ / 2) * Math.sin(bΔλ / 2);

    var f = 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1 - e));
    var g = (Math.floor(R * f));

    console.log(["Alice = ", g, "meters"]);
    return g;
  }

  where_both() { // difference intensity
    const alice = this.get_alice();
    const brett = this.get_brett();

    if ((!alice) || (!brett)) {
      return null;
    }

    var R = 6371e3; // metres
    var φ1 = this.lat * Math.PI / 180;
    var φ2 = brett.lat * Math.PI / 180;
    var φ3 = alice.lat * Math.PI / 180;

    var aΔφ = (this.lat - brett.lat) * Math.PI / 180;
    var aΔλ = (brett.lng - this.lng) * Math.PI / 180;

    var bΔφ = (this.lat - alice.lat) * Math.PI / 180;
    var bΔλ = (alice.lng - this.lng) * Math.PI / 180;

    var a = Math.sin(aΔφ / 2) * Math.sin(aΔφ / 2) +
           Math.cos(φ1) * Math.cos(φ2) *
           Math.sin(aΔλ / 2) * Math.sin(aΔλ / 2);

    var e = Math.sin(bΔφ / 2) * Math.sin(bΔφ / 2) +
            Math.cos(φ1) * Math.cos(φ3) *
            Math.sin(bΔλ / 2) * Math.sin(bΔλ / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var f = 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1 - e));

    var d = R * c;
    var g = R * f;
    var h = (Math.floor((d + g) / 2));

    console.log(["Both = ", h, "meters"]);
      // return g;
    return h;
  }

  get_brett() { // brett is here
    const brett = this.ladies.find((lady) => lady.name === "Brett");
    return brett;
  }

  get_alice() { // alice is here
    const alice = this.ladies.find((lady) => lady.name === "Alice");
    return alice;
  }

  reply() {

  //  var k = (this.where_alice() );
    var s = (this.where_brett() );
  //  var t = (this.where_both() );

    if ((s > 100)) {
      console.log([ "No one is here red" ]);
      return [ ...[ 255, 0, 0 ], 1];
    } else if ((s < 100) && (s > 85)) {
      console.log([ "Brett is nearby purple" ]);
      return [ ...[ 255, 0, 255 ], s];
    } else if ((s < 85) && (s > 65)) {
      console.log([ "Brett is closer pink" ]);
      return [ ...[ 255, 155, 155 ], s];
    } else if ((s < 65) && (s > 45)) {
      console.log([ "Brett is closer orange" ]);
      return [ ...[ 255, 155, 0 ], s];
    } else if ((s < 45) && (s > 20)) {
      console.log([ "Brett is closer gold" ]);
      return [ ...[ 255, 255, 0 ], s];
    } else if ((s < 20)) {
      console.log([ "Brett is here white" ]);
      return [ ...[ 255, 255, 255 ], 100];
    }
  }
}
