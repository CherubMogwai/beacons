export default class Alice {
  constructor(){
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
  set_ladies(beacons){
    this.ladies = beacons
  }

  where_janet(){
    const janet = this.ladies.find((lady) => lady.name === "Janet");
    if (!janet){
      return null
    }

    var diff = this.lat - janet.lat;
    console.log([this.lat, janet.lat, diff]);
    console.log("HELLO TEST");
    return diff
  }

  //where_brett(){
  //  const brett = this.ladies.find((lady) => lady.name === "Brett");
  //  if (!brett){
  //    return null
//    }

//    var diff = this.lat - brett.lat;
//    console.log([this.lat, brett.lat, diff] );
//    return diff
//  }

  reply(){
    if (!this.where_janet) {
      return [...[ 0, 255, 0 ], 100]
        }
      else {
      return [...[ 255, 0, 0 ], 100]
    }
    //  var r = Math.random();
    //  var i = parseInt(r*255);
    //  return [...[ 50, i, 100 ], 100]
    }
  }

//  reply(){

  //  var intensity = 10 ;
//    intensity = 50 - this.where_janet();
//    return [...[ 0, 255, 0, intensity ]]
//  }
//}
