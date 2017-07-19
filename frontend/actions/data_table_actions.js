import * as DataTableUtil from '../util/data_tables_util';

export const RECEIVE_DATATABLES = "RECEIVE_DATATABLES";
export const RECEIVE_DATATABLE = "RECEIVE_DATATABLE";
export const CREATE_DATATABLE = "CREATE_DATATABLE";

export const receiveDataTable = dataTable => ({
  type: RECEIVE_DATATABLE,
  dataTable
});

export const receiveDataTables = dataTables => ({
  type: RECEIVE_DATATABLES,
  dataTables
});

export const createDataTable = dataTable => ({
  type: CREATE_DATATABLE,
  dataTable
});

export const makeDataTable = dataTable => dispatch => (

)
