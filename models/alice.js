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
      return [...[ 255, 255, 0, 100 ], 100]
      //return null
      else if (true) {
        return [...[ 255, 0, 150, 100 ], 100]
      }
    }
    var diff = this.lat - janet.lat;
    console.log([this.lat, janet.lat, diff] );
    return diff
  }

  //  reply(){
  //    var r = Math.random();
  //    var i = parseInt(r*255);
  //    return [...[ 255, 0, 150, 100 ], 100]
    }
  }

//  reply(){

  //  var intensity = 10 ;
//    intensity = 50 - this.where_janet();
//    return [...[ 0, 255, 0, intensity ]]
//  }
//}
