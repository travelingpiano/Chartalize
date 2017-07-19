import React from 'react';
import NavBarContainer from './navbar/navbar_container';
import SessionFormContainer from './session/session_form_container';
import UploadFormContainer from './upload/upload_form_container';
import {Route} from 'react-router-dom';
import {AuthRoute} from '../util/route_util';

const App = () => (
  <div>
    < NavBarContainer />
    <AuthRoute path='/login' component={SessionFormContainer} />
    <AuthRoute path='/signup' component={SessionFormContainer} />
    <Route path='/' component={UploadFormContainer} />
  </div>
);

export default App;
