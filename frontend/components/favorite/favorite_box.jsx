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
    if (this.props.currentUser.id) {
      this.props.addFavorite({
        user_id: this.props.currentUser.id,
        restaurant_id: this.props.restaurantId
      });
    }
  }

  handleRemove() {
    if (this.props.currentUser.id) {
      const favorites = this.props.favorites;
      const favId = Object.keys(favorites).find(key => {
        return favorites[key].restaurant_id === this.props.restaurantId;
      });
      this.props.removeFavorite(favorites[favId]);
    }
  }

  getFillData() {
    const favorites = this.props.favorites;

    if (Object.keys(favorites).find(key => favorites[key].restaurant_id === this.props.restaurantId)) {
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
  currentUser: state.session.currentUser,
  favorites: state.favorites,
  restaurantId,
});

const mapDispatchToProps = dispatch => ({
  addFavorite: favorite => dispatch(addFavorite(favorite)),
  removeFavorite: id => dispatch(removeFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBox);
