import * as DataTableUtil from '../util/data_tables_util';

export const RECEIVE_DATATABLES = "RECEIVE_DATATABLES";
export const RECEIVE_DATATABLE = "RECEIVE_DATATABLE";
export const CREATE_DATATABLE = "CREATE_DATATABLE";
export const RECEIVE_DATATABLE_ERRORS = "RECEIVE_DATATABLE_ERRORS";
export const REMOVE_DATATABLE = "REMOVE_DATATABLE";

export const receiveDataTable = dataTable => ({
  type: RECEIVE_DATATABLE,
  dataTable
});

export const receiveDataTables = dataTables => ({
  type: RECEIVE_DATATABLES,
  dataTables
});

export const receiveDataTableErrors = errors => ({
  type: RECEIVE_DATATABLE_ERRORS,
  errors
});

export const createDataTable = dataTable => ({
  type: CREATE_DATATABLE,
  dataTable
});

export const removeDataTable = dataTable => ({
  type: REMOVE_DATATABLE,
  dataTable
});

export const makeDataTable = dataTable => dispatch => (
  DataTableUtil.create_dataTable(dataTable).then(
    newDataTable => dispatch(createDataTable(newDataTable)),
    errors => dispatch(receiveDataTableErrors(errors.responseJSON))
  )
);

export const fetchAllDataTables = () => dispatch => (
  DataTableUtil.getAllDataTables().then(
    DataTables => dispatch(receiveDataTables(DataTables))
  )
);

export const fetchOneDataTable = id => dispatch => (
  DataTableUtil.getSingleDataTable(id).then(
    DataTable => dispatch(receiveDataTable(DataTable))
  )
);

export const deleteDataTable = id => dispatch => (
  DataTableUtil.deleteDataTable(id).then(
    DataTable => dispatch(removeDataTable(DataTable))
  )
);
