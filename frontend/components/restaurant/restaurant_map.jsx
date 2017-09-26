import React from 'react';
import { merge } from 'lodash';

class RestaurantMap extends React.Component {
  constructor(props) {
    super(props);
    this.location = props.location;
    this.latLng = { lat: 40.730610, lng: -73.935242 };
  }

  componentWillReceiveProps(nextProps) {
    const location = this.parseLocation(this.props.location);
    const _LatLng = this.props.location ? { lat: location[0], lng: location[1] } : '';
    const latLng = merge({}, this.latLng, _LatLng);
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

  render() {
    return (
      <div id='map' ref={ map => this.mapNode = map }>
      </div>
    );
  }
}

export default RestaurantMap;
