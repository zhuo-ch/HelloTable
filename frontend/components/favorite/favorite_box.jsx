import React from 'react';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';
import { addFavorite, removeFavorite } from '../../actions/favorites_actions';

class FavoriteBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getFillData = this.getFillData.bind(this);
  }

  handleAdd() {
    this.props.addFavorite({
      user_id: this.props.user_id,
      restaurant_id: this.props.restaurantId
    });
  }

  handleRemove() {
    this.props.removeFavorite(this.props.favorites[this.props.restaurantId]);
  }

  getFillData() {
    if (this.props.favorites[this.props.restaurantId]) {
      return { fave: 1, text: 'Favorited', toggle: this.handleRemove, cName: 'favorite-box favorited' };
    } else {
      return { fave: 0, text: 'Add to Favorites', toggle: this.handleAdd, cName: 'favorite-box not-favorited' };
    }
  }

  render() {
    const fillData = this.getFillData();

    return (
      <section className={ fillData.cName } onClick={ fillData.toggle }>
        <ReactStars
          count={1}
          edit={false}
          value={fillData.fave}
          char='♡'
          color2={'#FF8787'}
          />
        <h5>{ fillData.text }</h5>
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
