import React from 'react';
import NavBarContainer from './navbar/navbar_container';
import SessionFormContainer from './session/session_form_container';
import UploadFormContainer from './data_tables/upload_form_container';
import DataTableIndexContainer from './data_tables/data_tables_index_container';
import DataTableShowContainer from './data_tables/data_table_show_container';
import SideBar from './navbar/side_bar.jsx';
import ChartNewContainer from './charts/chart_new_container';
import Knight from './reactdnd_tutorial/knight';
import Square from './reactdnd_tutorial/square';
import {Route,Switch} from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/route_util';

let black = 'black';

const App = () => (
  <div>
    < NavBarContainer />
    <Switch>
      <AuthRoute path='/login' component={SessionFormContainer} />
      <AuthRoute path='/signup' component={SessionFormContainer} />
      <ProtectedRoute exact path='/data_tables/new' component={UploadFormContainer} />
      <ProtectedRoute path='/data_tables/:datatableId' component={DataTableShowContainer} />
      <ProtectedRoute exact path='/data_tables' component={DataTableIndexContainer} />
      <ProtectedRoute exact path='/charts/new' component={Square} />
    </Switch>


  </div>
);

export default App;
