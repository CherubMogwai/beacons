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
    this.lng = lng;
  }
  set_ladies(beacons) {
    this.ladies = beacons;
  }

  where_janet() { // difference intensity
    const janet = this.get_janet();

    if (!janet) {
      return null;
    }

    var janetDiff = this.lat - janet.lat;
    console.log([this.lat, janet.lat, janetDiff]);
    return janetDiff;
  }

  where_brett() { // difference intensity
    const brett = this.get_brett();

    if (!brett) {
      return null;
    }

    var brettDiff = this.lat - brett.lat;
    console.log([this.lat, brett.lat, brettDiff]);
    return brettDiff;
  }

  get_janet() { // janet is here
    const janet = this.ladies.find((lady) => lady.name === "Janet");
    return janet;
  }

  get_brett() { // brett is here
    const brett = this.ladies.find((lady) => lady.name === "Brett");
    return brett;
  }


  reply() {

  //  var r = Math.random();
  //  var i = parseInt(r * 255);

    var brettDiff = this.where_brett();
    var janetDiff = this.where_janet();


    if (this.get_janet()) {
       return [ ...[250, 0, 150 ], 100];
    //  if (janetDiff < 0) {
    //    return [ ...[ 250, 0, 0 ], 50];
    //  } else if ((janetDiff > 0) && (janetDiff < 0.001)) {
    //    return [ ...[ 50, 255, 100 ], 100];
  //    } else if (janetDiff > 0.001) {
    //    return [ ...[250, 255, 255 ], 100];
    } else if (this.get_janet() && (this.get_brett())) {
      return [...[ 255, 255, 255 ], 100];
    } else if  (this.get_brett()) {
      return [...[ 0, 250, 0 ], 100];
        }
        // if (brettDiff > 170) {
        //  return [ ...[ 50, 50, 50 ], 1];
        // } else if ((brettDiff > 20) && (brettDiff < 90)) {
        //  return [ ...[ 50, i, 100 ], 100];
        // } else if (brettDiff < 20) {
          // return [ ...[250, 255, 255 ], 100];
        // }
    }

    //  else if (this.get_brett()) {

    //  var brettDiff = this.where_brett();

//    if (brettDiff > 170) {
//      return [ ...[ 50, 50, 50 ], 1];
//    } else if ((brettDiff > 20) && (brettDiff < 90)) {
  //    return [ ...[ 50, i, 100 ], 100];
  //  } else if (brettDiff < 20) {
//      return [ ...[250, 0, 0 ], 100];
//    }
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
