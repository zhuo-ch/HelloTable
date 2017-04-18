import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app'
import sessionFormContainer from './session_form_container';

const Root = ({store}) => {
  return(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <Route path='/login' component={sessionFormContainer}/>
          <Route path='/signup' component={sessionFormContainer}/>
        </Route>
      </Router>
    </Provider>
  )
}

export default Root;
