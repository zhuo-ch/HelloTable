import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import NavbarContainer from './navbar';
import sessionFormContainer from './session_form_container';
import configureStore from '../store/store';

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
        <Route path='/' component={NavbarContainer}>
          <Route path='/login' component={sessionFormContainer} onEnter={handleEnter}/>
          <Route path='/signup' component={sessionFormContainer} onEnter={handleEnter}/>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
