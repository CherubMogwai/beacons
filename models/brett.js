export default class Brett {
  constructor(){
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
  set_ladies(beacons){
    this.ladies = beacons
  }

  reply(){
    return [...[ 255, 200, 200, 100 ], 100]
  }
}
