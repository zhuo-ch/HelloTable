import React from 'react';
import { merge } from 'lodash';

class RestaurantMap extends React.Component {
  constructor(props) {
    super(props);
    this.location = props.location;
    this.address = props.address;
    this.latLng = { lat: 40.730610, lng: -73.935242 };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const location = this.parseLocation(nextProps.location);
    const latLng = this.props.location ? { lat: location[0], lng: location[1] } : this.latLng;
    const map = this.mapNode;
    this.genMap(map, latLng);
    this.genMarker(latLng);
  }

  componentWillUnmount() {
    google.maps.event.clearInstanceListeners(this.marker);
  }

  genMap(map, latLng) {
    this.map = new google.maps.Map(map, {
      center: latLng,
      zoom: 14,
      gestureHandling: 'greedy',
    });
  }

  genMarker(latLng) {
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });
    this.popup = new google.maps.InfoWindow({
      content: this.props.address,
    });
    this.marker.addListener('click', this.handleClick);
  }

  handleClick(e) {
    this.popup.open(this.map, this.marker);
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
