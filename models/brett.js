export default class Brett {
  constructor() {
    this.name = "Brett";
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

  where_janet() {
    const janet = this.get_janet();

    if (!janet) {
      return null;
    }

    var R = 6371e3; // metres
    var φ1 = this.lat * Math.PI / 180;
    var φ2 = janet.lat * Math.PI / 180;

    var aΔφ = (this.lat - janet.lat) * Math.PI / 180;
    var aΔλ = (janet.lng - this.lng) * Math.PI / 180;

    var a = Math.sin(aΔφ / 2) * Math.sin(aΔφ / 2) +
         Math.cos(φ1) * Math.cos(φ2) *
         Math.sin(aΔλ / 2) * Math.sin(aΔλ / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;

    console.log([this.lat, janet.lat, d]);
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

    var g = R * f;

    console.log([this.lat, alice.lat, g]);
    return g;
  }

  where_both() { // difference intensity
    const alice = this.get_alice();
    const janet = this.get_janet();

    if ((!alice) || (!janet)) {
      return null;
    }

    var R = 6371e3; // metres
    var φ1 = this.lat * Math.PI / 180;
    var φ2 = janet.lat * Math.PI / 180;
    var φ3 = alice.lat * Math.PI / 180;

    var aΔφ = (this.lat - janet.lat) * Math.PI / 180;
    var aΔλ = (janet.lng - this.lng) * Math.PI / 180;

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
    var h = (d + g / 2);

    console.log([this.lat, alice.lat, janet.lat, h]);
    // return g;
    return h;
  }

  get_janet() { // janet is here
    const janet = this.ladies.find((lady) => lady.name === "Janet");
    return janet;
  }

  get_alice() { // alice is here
    const alice = this.ladies.find((lady) => lady.name === "Alice");
    return alice;
  }

//  get_both() {  // this wasnt needed
//    const alice = this.ladies.find((lady) => lady.name === "Alice");
  //  const janet = this.ladies.find((lady) => lady.name === "Janet");
//    return both;
//  }

  reply() {

    // var r = Math.random();
    // var i = parseInt(r * 255);

    var r = parseInt(this.where_alice().target.value);
    var i = parseInt(r / 100);

    var aliceDiff = this.where_alice();
    var janetDiff = this.where_janet();
    var bothDiff = this.where_both();




      //if (this.get_both()) {
        // return [ ...[250, 0, 150 ], 100];
       //if (bothDiff < 20) {
         //return [ ...[ 250, 0, 0 ], 50];
       //} else if ((bothDiff > 20) && (bothDiff < 100)) {
        // return [ ...[ 50, 255, 100 ], 100];
       //} else if (bothDiff > 100) {
        // return [ ...[250, 255, 255 ], 100];
       //}
     // else if (this.get_janet() && (this.get_brett())) {
     //  return [...[ 255, 255, 255 ], 100];
   //  } else if  (this.get_brett()) {
   //    return [...[ 0, 250, 0 ], 100];
   //  }
         // if (brettDiff > 170) {
         //  return [ ...[ 50, 50, 50 ], 1];
         // } else if ((brettDiff > 20) && (brettDiff < 90)) {
         //  return [ ...[ 50, i, 100 ], 100];
         // } else if (brettDiff < 20) {
           // return [ ...[250, 255, 255 ], 100];
         // }
     // }

     //  else if (this.get_brett()) {

     //  var brettDiff = this.where_brett();

    if (janetDiff > 170) {
      return [ ...[ 255, 155, 50 ], 1];
    } else if ((janetDiff > 20) && (janetDiff < 90)) {
      return [ ...[ 255, 155, 50 ], i];
    } else if (janetDiff < 20) {
      return [ ...[250, 155, 50 ], i];
    }
   // }
       // return [...[ 60, i, 100 ], 100];
  }

   // where_brett(){
   // const brett = this.ladies.find((lady) => lady.name === "Brett");
   // if (!brett){
   // return null
   //   }
   //
   //   var diff = this.lat - brett.lat;
   //   console.log([this.lat, brett.lat, diff] );
   //   return diff
   // }
   // }

 //  reply(){

   //  var intensity = 10 ;
 //    intensity = 50 - this.where_janet();
 //    return [...[ 0, 255, 0, intensity ]]
 //  }
 // }
 // }
 }
