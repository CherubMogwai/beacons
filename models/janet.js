
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

  reply(){
    var r = Math.random();
    var i = parseInt(r*255);
    return [...[ 50, 100, i ], 100]
  }
}
