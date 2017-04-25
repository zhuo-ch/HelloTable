import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import NavbarContainer from './navbar';
import sessionFormContainer from './session/session_form_container';
import configureStore from '../store/store';
import App from './app'
import restaurantContainer from './restaurant/restaurant_show';
import restaurantCreate from './restaurant/restaurant_create';
import CityIndex from './city/city_index';
import CityShow from './city/city_show';

const Root = ({store}) => {

  function handleEnter(nextState, replace) {
    const loggedIn = store.getState().session.currentUser;
    if (loggedIn) {
      replace("/");
    }
  }

  return(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App} >
          <IndexRoute component={CityIndex} />
          <Route path='/login' component={sessionFormContainer} onEnter={handleEnter}/>
          <Route path='/signup' component={sessionFormContainer} onEnter={handleEnter}/>
          <Route path='/restaurant/:restaurantId' component={restaurantContainer} />
          <Route path='/create' component={restaurantCreate} />
          <Route path='/cities/:cityId' component={CityShow} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
