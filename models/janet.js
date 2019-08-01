
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
       // var φ2 = janet.lat * Math.PI / 180;
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
    var φ2 = janet.lat * Math.PI / 180;
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

  janet_brett() {
    var janet1 = where_brett();

    if (janet1 < 100) {
      console.log(["Brett is here", 255 ]);
      return 255;
    } else if (janet1 > 100) {
      console.log(["Brett is not here", 0 ]);
      return 0;
    }
  }

  janet_alice() {
    var alice1 = where_alice();

    if (alice1 < 100) {
      console.log(["Alice is here", 255 ]);
      return 255;
    } else if (alice1 > 100) {
      console.log(["Alice is not here", 0 ]);
      return 0;
    }
  }

  janet_both() {

      // const alice = this.get_alice();
    //   const brett = this.get_brett();

    //  if ((!alice) || (!janet)) {
    //    console.log(["Both are not here" ]);
    //    return null;
  //    }

    var both = where_both();

    if (both < 100) {
      console.log(["Both are here", 255 ]);
      return 255;
    } else if (both > 100) {
      console.log(["Both are not here", both ]);
      return both;
    }

  }

 reply() {

   var k = (this.where_alice() );
   var s = (this.where_brett() );
   var t = (this.where_both() );

   var aliceJanet = this.brett_alice();
   var brettJanet = this.brett_brett();
   var bothJanet = this.brett_both();

   if (s > 100) {
     console.log([ brettJanet, aliceJanet, bothJanet ]);
     return [ ...[ 255, 0, 0 ], 1];
   } else if (s < 100) {
     console.log([ brettJanet, aliceJanet, bothJanet ]);
     return [ ...[ brettJanet, aliceJanet, bothJanet ], s];
   }
 }
}
