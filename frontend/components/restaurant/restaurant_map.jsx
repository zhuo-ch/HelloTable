import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import * as MapUtil from '../../util/map_util';
import { fetchMapData } from '../../actions/map_actions';
import { merge } from 'lodash';

const _getCoordsObj = latLng => {
  return ({
    lat: latLng.lat(),
    lng: latLng.lng(),
  });
};

let _mapOptions = {
  center: { lat: '', lng: '' },
  zoom: 13,
}

class RestaurantMap extends React.Component {
  constructor(props) {
    super(props);
    this.location = props.location;
  }

  componentWillReceiveProps(nextProps) {
    const _latLng = { lat: 40.730610, lng: -73.935242 };
    const location = this.parseLocation(this.props.location);
    const _locLatLng = this.props.location ? { lat: location[0], lng: location[1] } : '';
    const latLng = merge({}, _latLng, _locLatLng);
    const map = this.mapNode;

    this.map = new google.maps.Map(map, {
      center: latLng,
      zoom: 14,
    });
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });
  }

  parseLocation(location) {
    location = location.replace(/[{}]/, '');
    return location.split(', ').map(el => parseFloat(el.split('>')[1]));
  }

  // componentDidUpdate() {
  //   if (this.props.singleRestaurant === "true") {
  //     this.MarkerManager
  //       .updateMarkers([this.props.restaurants[Object.keys(this.props.restaurants)[0]]]);
  //   } else {
  //     this.MarkerManager.updateMarkers(this.props.restaurants);
  //   }
  // }

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
      <div id='map' ref={ map => this.mapNode = map }>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurants.restaurant,
  map: state.map,
});

const mapDispatchToProps = dispatch => ({
  fetchMapData: address => dispatch(fetchMapData(address)),
});

export default RestaurantMap;
