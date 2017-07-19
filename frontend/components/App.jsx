import React from 'react';
import NavBarContainer from './navbar/navbar_container';
import SessionFormContainer from './session/session_form_container';
import UploadFormContainer from './data_tables/upload_form_container';
import DataTableIndexContainer from './data_tables/data_tables_index_container';
import DataTableShowContainer from './data_tables/data_table_show_container';
import {Route} from 'react-router-dom';
import {AuthRoute} from '../util/route_util';

const App = () => (
  <div>
    < NavBarContainer />
    <AuthRoute path='/login' component={SessionFormContainer} />
    <AuthRoute path='/signup' component={SessionFormContainer} />
    <Route exact path='/data_tables' component={DataTableIndexContainer} />
    <Route exact path='/data_tables/:datatableId' component={DataTableShowContainer} />
    <Route path='/new' component={UploadFormContainer} />
  </div>
);

export default App;
