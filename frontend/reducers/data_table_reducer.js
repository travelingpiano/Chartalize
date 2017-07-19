import {RECEIVE_DATATABLES, RECEIVE_DATATABLE, CREATE_DATATABLE, RECEIVE_DATATABLE_ERRORS} from '../actions/data_table_actions';

const DataTableReducer = (state = {}, action){
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_DATATABLES:
    case RECEIVE_DATATABLE:
    case CREATE_DATATABLE:
    case RECEIVE_DATATABLE_ERRORS:
    default:
      return state;
  }
}
