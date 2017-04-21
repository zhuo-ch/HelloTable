
export default class MarkerManager {
  constructor(map, handleClick) {
    this.map = map;
    this.markers = {};
    this.handleClick = handleClick;
  }

  updateMarkers(restaurants) {
    const restaurantObj = {};

    Object.keys(restaurants).forEach((restaurantId) => {
      return restaurantObj[restaurantId] = restaurant;
    })

    restaurantObj
      .filter(restaurant => !this.markers[restaurant.id])
      .forEach(newRestaurant => this.createMarker(newRestaurant, this.handleClick))

    Object.keys(this.markers)
      .filter((restaurantId) => !this.restaurantObj[restaurantId])
      .forEach((restaurantId) => this.removeMarker(this.markers[restaurantId]))
  }

  createMarker(restaurant) {
    const pos = new google.maps.LatLng(restaurant.lat, restaurant.lng);
    const marker = new google.maps.Marker({
      pos,
      map: this.map,
      restaurantId: restaurant.id,
    })
  }

  removeMarker(marker) {
    this.markers[marker.restaurantId].setMap(null);
    delete this.markers[marker.restaurantId];
  }
}
