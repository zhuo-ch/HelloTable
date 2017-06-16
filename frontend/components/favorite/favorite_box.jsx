import React from 'react';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';
import { addFavorite, removeFavorite } from '../../actions/favorites_actions';

class FavoriteBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd() {
    debugger
    this.props.addFavorite({
      user_id: this.props.user_id,
      restaurant_id: this.props.restaurantId
    });
  }

  handleRemove() {
    debugger
    this.props.removeFavorite(this.props.favorites[this.props.restaurantId]);
  }

  render() {
    const favorite = Object.keys(this.props.favorites).includes(this.props.restaurantId);
    const fave = favorite ? 1 : 0;
    const text = favorite ? 'Favorited' : 'Add to Favorites';
    const toggle = favorite ? this.handleRemove : this.handleAdd;

    return (
      <section className='favorite-box' onClick={ toggle }>
        <ReactStars
          count={1}
          edit={false}
          value={fave}
          />
        <h5>{text}</h5>
      </section>
    );
  }
}

const mapStateToProps = (state, { restaurantId }) => ({
  user_id: state.session.currentUser.id,
  favorites: state.favorites,
  restaurantId,
});

const mapDispatchToProps = dispatch => ({
  addFavorite: favorite => dispatch(addFavorite(favorite)),
  removeFavorite: id => dispatch(removeFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBox);
