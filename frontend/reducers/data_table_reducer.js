import {RECEIVE_DATATABLES, RECEIVE_DATATABLE, CREATE_DATATABLE, RECEIVE_DATATABLE_ERRORS, REMOVE_DATATABLE} from '../actions/data_table_actions';
import {merge} from 'lodash';

const DataTableReducer = (state = {}, action)=>{
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_DATATABLES:
      return action.dataTables.data_tables;
    case RECEIVE_DATATABLE:
      let dataTable = action.dataTable;
      return dataTable;
    case CREATE_DATATABLE:
      dataTable = action.dataTable;
      let newstate = merge({},state);
      newstate[dataTable.id] = dataTable;
      return newstate;
    case REMOVE_DATATABLE:
      dataTable = action.dataTable;
      newstate = merge({},state);
      delete newstate[dataTable.id];
      console.log(newstate);
      return newstate;
    case RECEIVE_DATATABLE_ERRORS:
      const errors = action.errors;
      return merge({},state,{errors});
    default:
      return state;
  }
};

export default DataTableReducer;
