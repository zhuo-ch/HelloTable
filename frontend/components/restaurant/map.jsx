// import React from 'react';
// import { connect } from 'react-redux';
// import ReactDOM from 'react-dom';
// import { merge } from 'lodash';
// import MarkerManager from '../../util/marker_manager';
// import * as MapUtil from '../../util/map_util';
// import { fetchMapData } from '../../actions/map_actions';
//
// const _getCoordsObj = latLng => {
//   return ({
//     lat: latLng.lat(),
//     lng: latLng.lng(),
//   });
// };
//
// let _mapOptions = {
//   center: { lat: '', lng: '' },
//   zoom: 13,
// }

const RestaurantMap = ({ lat, lng }) => {
  const mapOptions = { center: { lat, lng }, zoom: 8 };
  const ref = document.getElementById('map-container');
debugger
  return new google.maps.Map(ref, mapOptions);

  // componentDidMount() {
  //   const location = this.props.restaurant.location;
  //   const mapOptions = merge({}, location, { zoom: 13 });
  //   debugger
  //   const map = this.refs.map;
  //   this.map = new google.maps.Map(map, mapOptions);
  // }
  //
  // componentDidUpdate() {
  //   if (this.props.singleRestaurant === "true") {
  //     this.MarkerManager
  //       .updateMarkers([this.props.restaurants[Object.keys(this.props.restaurants)[0]]]);
  //   } else {
  //     this.MarkerManager.updateMarkers(this.props.restaurants);
  //   }
  // }
  //
  // _registerListeners() {
  //   google.maps.events.addListener(this.map, 'idle', () => {
  //     const { north, south, east, west } = this.map.getBounds().toJSON();
  //     const bounds = {
  //       northEast: { lat: north, lng: east },
  //       southWest: { lat: south, lng: west },
  //     };
  //     this.props.updateFilter('bounds', bounds);
  //   });
  // }
  //
  // _handleMarkerClick(restaurant) {
  //   this.props.router.push(`restaurant/${restaurant.id}`);
  // }
}

export default RestaurantMap;
