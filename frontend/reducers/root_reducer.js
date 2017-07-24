import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import DataTableReducer from './data_table_reducer';
import ChartReducer from './chart_reducer';
import UserReducer from './user_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  dataTables: DataTableReducer,
  charts: ChartReducer,
  users: UserReducer
});

export default RootReducer;
