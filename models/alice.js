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

where_janet() { // difference intensity
  const janet = this.get_janet();

  if (!janet) {
    return null;
  }

  var R = 6371e3; // metres
  var φ1 = this.lat * Math.PI / 180;
     // var φ2 = brett.lat * Math.PI / 180;
  var φ3 = janet.lat * Math.PI / 180;

  var bΔφ = (this.lat - janet.lat) * Math.PI / 180;
  var bΔλ = (janet.lng - this.lng) * Math.PI / 180;

  var e = Math.sin(bΔφ / 2) * Math.sin(bΔφ / 2) +
          Math.cos(φ1) * Math.cos(φ3) *
          Math.sin(bΔλ / 2) * Math.sin(bΔλ / 2);

  var f = 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1 - e));
  var g = (Math.floor(R * f));

  console.log(["Janet = ", g, "meters"]);
  return g;
}

  where_both() { // difference intensity
    const janet = this.get_janet();
    const brett = this.get_brett();

    if ((!janet) || (!brett)) {
      return null;
    }

    var R = 6371e3; // metres
    var φ1 = this.lat * Math.PI / 180;
    var φ2 = brett.lat * Math.PI / 180;
    var φ3 = janet.lat * Math.PI / 180;

    var aΔφ = (this.lat - brett.lat) * Math.PI / 180;
    var aΔλ = (brett.lng - this.lng) * Math.PI / 180;

    var bΔφ = (this.lat - janet.lat) * Math.PI / 180;
    var bΔλ = (janet.lng - this.lng) * Math.PI / 180;

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

  get_janet() { // janet is here
    const janet = this.ladies.find((lady) => lady.name === "Janet");
    return janet;
  }

  reply() {

    var k = (this.where_janet() );
    var s = (this.where_brett() );
    var t = (this.where_both() );

    if ((s > 100) && (k > 100) && (t > 100)) {
      console.log([ "No one is here" ]);
      return [ ...[ 255, 0, 0 ], 1];
    } else if ((s < 100) && (k > 100) && (t > 100)) {
      console.log([ "Brett is here" ]);
      return [ ...[ 255, 255, 0 ], s];
    } else if ((s > 100) && (k < 100) && (t > 100)) {
      console.log([ "Janet is here" ]);
      return [ ...[ 255, 0, 150 ], k];
    } else if ((s < 100) && (k < 100) && (t < 100)) {
      console.log([ "Both are here" ]);
      return [ ...[ 255, 255, 255 ], t];
    }
  }
}

// reply(){
//   var r = Math.random();
//   var i = parseInt(r*255);
  // return [...[ i, 25, 100 ], 100]
//   }
//   }

// export default class Alice {
//   constructor() {
//     this.name = "Alice";
//     this.lat = 0;
//     this.lng = 0;
//     this.ladies = [];
//   }
//   set_lat(lat) {
//     this.lat = lat;
//   }
//   set_lng(lng) {
//     this.lng = lng;
//   }
//   set_ladies(beacons) {
//     this.ladies = beacons;
//   }
//
//   where_janet() { // difference between alice and janet to set intensity
//     const janet = this.get_janet();
//
//     if (!janet) {
//       return null;
//     }
//
//     var R = 6371e3; // metres
//     var φ1 = this.lat * Math.PI / 180;
//     var φ2 = janet.lat * Math.PI / 180;
//     // var φ3 = brett.lat.toRadians();
//
//     var aΔφ = (this.lat - janet.lat) * Math.PI / 180;
//     var aΔλ = (janet.lng - this.lng) * Math.PI / 180;
//
//     // var bΔφ = (this.lat - brett.lat).toRadians();
//     // var bΔλ = (lng.brett - this.lng).toRadians();
//
//     var a = Math.sin(aΔφ / 2) * Math.sin(aΔφ / 2) +
//         Math.cos(φ1) * Math.cos(φ2) *
//         Math.sin(aΔλ / 2) * Math.sin(aΔλ / 2);
//
//     // var e = Math.sin(bΔφ / 2) * Math.sin(bΔφ / 2) +
//         // Math.cos(φ1) * Math.cos(φ3) *
//         // Math.sin(bΔλ / 2) * Math.sin(bΔλ / 2);
//
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     // var f = 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1 - e));
//
//     var d = R * c;
//
//     console.log([this.lat, janet.lat, d]);
//     return d;
//     // var g = R * f;
//     // var h = (d + g / 2);
//
//     // var janetDiff =
//     // this.lat - janet.lat;
//     // console.log([this.lat, janet.lat, janetDiff]);
//     // return janetDiff;
//   }
//
//   where_brett() { // difference intensity
//     const brett = this.get_brett();
//
//     if (!brett) {
//       return null;
//     }
//
//     var R = 6371e3; // metres
//     var φ1 = this.lat * Math.PI / 180;
//     // var φ2 = janet.lat * Math.PI / 180;
//     var φ3 = brett.lat * Math.PI / 180;
//
//     // var aΔφ = (this.lat - janet.lat) * Math.PI / 180;
//     // var aΔλ = (janet.lng - this.lng) * Math.PI / 180;
//
//     var bΔφ = (this.lat - brett.lat) * Math.PI / 180;
//     var bΔλ = (brett.lng - this.lng) * Math.PI / 180;
//
//     // var a = Math.sin(aΔφ / 2) * Math.sin(aΔφ / 2) +
//       //  Math.cos(φ1) * Math.cos(φ2) *
//       //  Math.sin(aΔλ / 2) * Math.sin(aΔλ / 2);
//
//     var e = Math.sin(bΔφ / 2) * Math.sin(bΔφ / 2) +
//          Math.cos(φ1) * Math.cos(φ3) *
//          Math.sin(bΔλ / 2) * Math.sin(bΔλ / 2);
//
//   //  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     var f = 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1 - e));
//
//     // var d = R * c;
//     var g = R * f;
//     // var h = (d + g / 2);
//
//     console.log([this.lat, brett.lat, g]);
//     return g;
//
//
//
//
//     // var brettDiff = this.lat - brett.lat;
//     // console.log([this.lat, brett.lat, brettDiff]);
//     // return brettDiff;
//   }
//
//   where_both() { // difference intensity
//     const brett = this.get_brett();
//     const janet = this.get_janet();
//
//     if ((!brett) || (!janet)) {
//       return null;
//     }
//
//     var R = 6371e3; // metres
//     var φ1 = this.lat * Math.PI / 180;
//     var φ2 = janet.lat * Math.PI / 180;
//     var φ3 = brett.lat * Math.PI / 180;
//
//     var aΔφ = (this.lat - janet.lat) * Math.PI / 180;
//     var aΔλ = (janet.lng - this.lng) * Math.PI / 180;
//
//     var bΔφ = (this.lat - brett.lat) * Math.PI / 180;
//     var bΔλ = (brett.lng - this.lng) * Math.PI / 180;
//
//     var a = Math.sin(aΔφ / 2) * Math.sin(aΔφ / 2) +
//         Math.cos(φ1) * Math.cos(φ2) *
//         Math.sin(aΔλ / 2) * Math.sin(aΔλ / 2);
//
//     var e = Math.sin(bΔφ / 2) * Math.sin(bΔφ / 2) +
//          Math.cos(φ1) * Math.cos(φ3) *
//          Math.sin(bΔλ / 2) * Math.sin(bΔλ / 2);
//
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     var f = 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1 - e));
//
//     var d = R * c;
//     var g = R * f;
//     var h = (d + g / 2);
//
//     console.log([this.lat, brett.lat, janet.lat, h]);
//     return g;
//
//     // var brettDiff = this.lat - brett.lat;
//     // console.log([this.lat, brett.lat, brettDiff]);
//     // return brettDiff;
//   }
//
//   get_janet() { // janet is here
//     const janet = this.ladies.find((lady) => lady.name === "Janet");
//     return janet;
//   }
//
//   get_brett() { // brett is here
//     const brett = this.ladies.find((lady) => lady.name === "Brett");
//     return brett;
//   }
//
//   get_both() { // brett is here
//     const brett = this.ladies.find((lady) => lady.name === "Brett");
//     const janet = this.ladies.find((lady) => lady.name === "Janet");
//     return both;
//   }
//
//   reply() {
//
//   //  var r = Math.random();
//   //  var i = parseInt(r * 255);
//
//     var brettDiff = this.where_brett();
//     var janetDiff = this.where_janet();
//     var bothDiff = this.where_both();
//
//
//     if (this.get_janet()) {
//        // return [ ...[250, 0, 150 ], 100];
//       if (janetDiff < 20) {
//         return [ ...[ 250, 0, 0 ], 50];
//       } else if ((janetDiff > 20) && (janetDiff < 100)) {
//         return [ ...[ 50, 255, 100 ], 100];
//       } else if (janetDiff > 100) {
//         return [ ...[250, 255, 255 ], 100];
//       }
//     // else if (this.get_janet() && (this.get_brett())) {
//     //  return [...[ 255, 255, 255 ], 100];
//   //  } else if  (this.get_brett()) {
//   //    return [...[ 0, 250, 0 ], 100];
//   //  }
//         // if (brettDiff > 170) {
//         //  return [ ...[ 50, 50, 50 ], 1];
//         // } else if ((brettDiff > 20) && (brettDiff < 90)) {
//         //  return [ ...[ 50, i, 100 ], 100];
//         // } else if (brettDiff < 20) {
//           // return [ ...[250, 255, 255 ], 100];
//         // }
//     }
//
//     //  else if (this.get_brett()) {
//
//     //  var brettDiff = this.where_brett();
//
// //    if (brettDiff > 170) {
// //      return [ ...[ 50, 50, 50 ], 1];
// //    } else if ((brettDiff > 20) && (brettDiff < 90)) {
//   //    return [ ...[ 50, i, 100 ], 100];
//   //  } else if (brettDiff < 20) {
// //      return [ ...[250, 0, 0 ], 100];
// //    }
//   // }
//       // return [...[ 60, i, 100 ], 100];
//   }
//
//   // where_brett(){
//   // const brett = this.ladies.find((lady) => lady.name === "Brett");
//   // if (!brett){
//   // return null
//   //   }
//   //
//   //   var diff = this.lat - brett.lat;
//   //   console.log([this.lat, brett.lat, diff] );
//   //   return diff
//   // }
//   // }
//
// //  reply(){
//
//   //  var intensity = 10 ;
// //    intensity = 50 - this.where_janet();
// //    return [...[ 0, 255, 0, intensity ]]
// //  }
// // }
// // }
// }
