import React from 'react';
import { merge } from 'lodash';
import { connect } from 'react-redux';

class RestaurantMap extends React.Component {
  constructor(props) {
    super(props);
    this.latLng = { lat: 40.730610, lng: -73.935242 };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const location = this.parseLocation(this.props.restaurant.location);
    const latLng = this.props.restaurant.location ? { lat: location[0], lng: location[1] } : this.latLng;
    const map = this.mapNode;

    this.genMap(map, latLng);
    this.genMarker(latLng);
  }

  componentWillReceiveProps(nextProps) {
    const location = this.parseLocation(nextProps.restaurant.location);
    const latLng = nextProps.restaurant.location ? { lat: location[0], lng: location[1] } : this.latLng;
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
      content: this.props.restaurant.address,
    });
    this.marker.addListener('click', this.handleClick);
  }

  handleClick(e) {
    this.popup.open(this.map, this.marker);
  }

  parseLocation(loc) {
    loc = loc.replace(/[{}]/, '');
    loc = loc.split(',').map(el => {
      const int = parseFloat(el.split('>')[1]);
      return int ? int : parseFloat(el);
    });

    return loc;
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
});

export default connect(mapStateToProps)(RestaurantMap);
