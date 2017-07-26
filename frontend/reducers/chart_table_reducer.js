import {RECEIVE_CHART_TABLE} from '../actions/data_table_actions';
import {merge} from 'lodash';

const ChartTableReducer = (state={},action) => {
  switch(action.type){
    case RECEIVE_CHART_TABLE:
      return action.dataTable;
    default:
      return state;
  }
};

export default ChartTableReducer;
