import {RECEIVE_DATATABLES, RECEIVE_DATATABLE, CREATE_DATATABLE, RECEIVE_DATATABLE_ERRORS} from '../actions/data_table_actions';
import {merge} from 'lodash';

const DataTableReducer = (state = {}, action)=>{
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_DATATABLES:
      return action.dataTables.data_tables;
    case RECEIVE_DATATABLE:
      let dataTable = action.dataTable;
      return merge({},state,dataTable);
    case CREATE_DATATABLE:
      dataTable = action.dataTable;
      return merge({},state,dataTable);
    case RECEIVE_DATATABLE_ERRORS:
      const errors = action.errors;
      return merge({},state,{errors});
    default:
      return state;
  }
};

export default DataTableReducer;
