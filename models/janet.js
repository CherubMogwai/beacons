
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
    return [...[ 255, 0, 0, 100 ], 100]
  }
}
