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

  where_janet(){ //difference intebnsity
    const janet = this.get_janet();

    if (!janet){
      return null
    }
    //
    var diff = this.lat - janet.lat;
    console.log([this.lat, janet.lat, diff]);
    return diff
  }


  get_janet(){ //janet is here
    const janet = this.ladies.find((lady) => lady.name === "Janet");
    return janet
  }

  reply(){

    var r = Math.random();
    var i = parseInt(r*255);


    if (this.get_janet()) {
      var diff = this.where_janet();
      if (diff > 170) {
        return [...[ 50, i, 100 ], 100];
      } else if (diff > 20  && diff < 90) {
        return [...[ 50, i, 100 ], 100];
      }
      else (diff < 20){
        return [...[ 250, 0, 0 ], 100];
      }
    }
    return [...[ 50, i, 100 ], 100];
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
}

//  reply(){

  //  var intensity = 10 ;
//    intensity = 50 - this.where_janet();
//    return [...[ 0, 255, 0, intensity ]]
//  }
//}
