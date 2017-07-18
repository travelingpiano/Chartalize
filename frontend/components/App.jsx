import React from 'react';
import NavBarContainer from './navbar/navbar_container';
import SessionFormContainer from './session/session_form_container';
import {Route} from 'react-router-dom';

const App = () => (
  <div>
    <h1>Chartalize!</h1>
    < NavBarContainer />
    <Route path='/login' component={SessionFormContainer} />
    <Route path='/signup' component={SessionFormContainer} />
  </div>
);

export default App;
