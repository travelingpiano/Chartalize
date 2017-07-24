import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import DataTableReducer from './data_table_reducer';
import ChartReducer from './chart_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  dataTables: DataTableReducer,
  charts: ChartReducer
});

export default RootReducer;
