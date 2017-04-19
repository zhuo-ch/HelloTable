import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import sessionFormContainer from './session_form_container';
import configureStore from '../store/store';

const Root = () => {
  let preloadedState = {session: {errors: {base: ""}}};
    if (window.currentUser) {
      preloadedState = { session: { currentUser: window.currentUser }};
    }

  const store = configureStore(preloadedState);

  // const handleEnter = (nextState, replace) => {
  //   const loggedIn = store.getState().session.current_user;
  //   if (loggedIn) {
  //     replace('/');
  //   }
  // }

  return(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <Route path='/login' component={sessionFormContainer}/>
          <Route path='/signup' component={sessionFormContainer}/>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
