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
    var d = (Math.floor(R * c));

    console.log(["Janet =", d, "meters"]);
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
    var h = (Math.floor((d + g) / 2));

    console.log(["Both = ", h, "meters"]);
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

  brett_janet() {
    var janet1 = where_janet();

    if (janet1 < 100) {
      console.log(["Janet is here", 255 ]);
      return 255;
    } else if (janet1 > 100) {
      console.log(["Janet is not here", 0 ]);
      return 0;
    }
  }

  brett_alice() {
    var alice1 = where_alice();

    if (alice1 < 100) {
      console.log(["Alice is here", 255 ]);
      return 255;
    } else if (alice1 > 100) {
      console.log(["Alice is not here", 0 ]);
      return 0;
    }
  }

  brett_both() {
    // const alice = this.get_alice();
  //   const janet = this.get_janet();

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

//  get_both() {  // this wasnt needed
//    const alice = this.ladies.find((lady) => lady.name === "Alice");
  //  const janet = this.ladies.find((lady) => lady.name === "Janet");
//    return both;
//  }

  reply() {

     // var r = Math.random();
    //  var i = parseInt(r * 255);

    // var r = parseInt(this.where_alice());
    // var i = parseInt(r / 100);

    var k = (this.where_alice() );
    var s = (this.where_janet() );
    var t = (this.where_both() );

    var aliceBrett = this.brett_alice();
    var janetBrett = this.brett_janet();
    var bothBrett = this.brett_both();

    if (s > 100) {
      console.log([ janetBrett, aliceBrett, bothBrett ]);
      return [ ...[ 255, 0, 0 ], 1];
    } else if (s < 100) {
      console.log([ janetBrett, aliceBrett, bothBrett ]);
      return [ ...[ janetBrett, aliceBrett, bothBrett ], s];
    }
  }
}
      // if (this.get_both()) {
        // return [ ...[250, 0, 150 ], 100];
       // if (bothDiff < 20) {
         // return [ ...[ 250, 0, 0 ], 50];
       // }else if ((bothDiff > 20) && (bothDiff < 100)) {
        // return [ ...[ 50, 255, 100 ], 100];
       // }else if (bothDiff > 100) {
        // return [ ...[250, 255, 255 ], 100];
       // }
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
