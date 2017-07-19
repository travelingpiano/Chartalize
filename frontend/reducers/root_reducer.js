import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import DataTableReducer from './data_table_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  dataTables: DataTableReducer
});

export default RootReducer;
