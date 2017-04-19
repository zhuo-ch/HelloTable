import React from 'react';
import { Link } from 'react-router';
import SessionForm from './session_form';
import sessionFormContainer from './session_form_container';

const App = ({children}) => (
  <div>
    <h2>Hello world</h2>
    
    {children}

  </div>
);

export default App;
