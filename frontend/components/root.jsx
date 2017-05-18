import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import NavbarContainer from './navbar';
import sessionFormContainer from './session/session_form_container';
import configureStore from '../store/store';
import App from './app';
import restaurantContainer from './restaurant/restaurant_show';
import restaurantCreate from './restaurant/restaurant_create';
import CityIndex from './city/city_index';
import CityShow from './city/city_show';
import UserShow from './user/user_show';
import ReviewForm from './review/review_form';
import Modal from './modal';

const Root = ({store}) => {

  return(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App} >
          <IndexRoute component={CityIndex} />
          <Route path='/restaurant/:restaurantId' component={restaurantContainer} />
          <Route path='/cities/:cityId' component={CityShow} />
          <Route path='/users/:userId' component={UserShow} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
