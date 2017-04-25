import React from 'react';
import { withRouter } from 'react-router';
import ReactDOM from 'react-dom';
import MarkerManager from '../../util/marker_manager';

const _getCoordsObj = latLng => {
  return ({
    lat: latLng.lat(),
    lng: latLng.lng(),
  })
};

let _mapOptions = {
  center: { lat: 37.7758, lng: -122.435 },
  zoom: 13,
}

class RestaurantMap extends React.Component {

  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(map, _mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this._handleMarkerClick.bind(this));

    if (this.props.singleRestaurant === "true") {
      this.props.fetchRestaurant(this.props.restaurantId);
    } else {
      this._registerListeners();
      this.MarkerManager.updateMarkers(this.props.restaurants);
    }
  }

  componentDidUpdate() {
    if (this.props.singleRestaurant === "true") {
      this.MarkerManager
        .updateMarkers([this.props.restaurants[Object.keys(this.props.restaurants)[0]]]);
    } else {
      this.MarkerManager.updateMarkers(this.props.restaurants);
    }
  }

  _registerListeners() {
    google.maps.events.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west },
      };
      this.props.updateFilter('bounds', bounds);
    });
  }

  _handleMarkerClick(restaurant) {
    this.props.router.push(`restaurant/${restaurant.id}`);
  }

  render() {
    return (
      <div id='map-container' ref={ map => this.mapNode = map }>
      </div>
    )
  }
}

export default RestaurantMap;
