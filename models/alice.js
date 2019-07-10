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

var R = 6371e3; // metres
var φ1 = this.lat.toRadians();
var φ2 = janet.lat.toRadians();
var φ3 = brett.lat.toRadians();

var aΔφ = (this.lat-janet.lat).toRadians();
var aΔλ = (lng.janet-this.lng).toRadians();

var bΔφ = (this.lat-brett.lat).toRadians();
var bΔλ = (lng.brett-this.lng).toRadians();

var a = Math.sin(aΔφ/2) * Math.sin(aΔφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(aΔλ/2) * Math.sin(aΔλ/2);

var e = Math.sin(bΔφ/2) * Math.sin(bΔφ/2) +
        Math.cos(φ1) * Math.cos(φ3) *
        Math.sin(bΔλ/2) * Math.sin(bΔλ/2);

var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var f = 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1-e));

var d = R * c;
var g = R * f;
var h = (d+g/2);

console.log([d, g, h]);


var diff = this.lat - janet.lat;
console.log([this.lat, janet.lat, diff]);
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

    var r = Math.random();
    var i = parseInt(r*255);

    if (this.where_janet()) {
      return [...[ 50, i, 100 ], 100]
        }
      else {
      return [...[ 255, 0, 0 ], 100]
    }

    //  return [...[ 50, i, 100 ], 100]
    }
  }

//  reply(){

  //  var intensity = 10 ;
//    intensity = 50 - this.where_janet();
//    return [...[ 0, 255, 0, intensity ]]
//  }
//}
