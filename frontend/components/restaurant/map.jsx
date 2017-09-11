import React from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import MarkerManager from '../util/marker_manager';
import { updateBounds } from '../actions/filter_actions';
import { fetchBenches } from '../actions/bench_actions';
import { toggleModal } from '../actions/modal_actions';

class BenchMap extends React.Component {
  constructor(props) {
    super(props);
    this.address = props.address;
    this.updateMapBounds = this.updateMapBounds.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const mapOptions = {
      center: { lat: 40.730610, lng: -73.935242  },
      zoom: 13,
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);
    google.maps.event.addListener(this.map, 'idle', this.updateMapBounds);
    google.maps.event.addListener(this.map, 'click', this.handleClick);
  }

  updateMapBounds() {
    const { north, east, south, west } = this.map.getBounds().toJSON();
    this.props.updateBounds({ north, east, south, west });
  }

  handleClick(e) {
    this.props.toggleModal({ type: 'modal', lat: e.latLng.lat(), lng: e.latLng.lng() });
  }

  render() {
    if (this.MarkerManager) {
      this.MarkerManager.updateMarkers(this.props.benches);
    }

    return (
      <div id='map-container' ref={ map => this.mapNode = map }>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  benches: state.benches,
});

const mapDispatchToProps = dispatch => ({
  updateBounds: bounds => dispatch(updateBounds(bounds)),
  fetchBenches: () => dispatch(fetchBenches()),
  toggleModal: modal => dispatch(toggleModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BenchMap);
