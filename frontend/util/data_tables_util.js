export const create_dataTable = data_table => (
  $.ajax({
    method: 'POST',
    url: 'api/data_tables',
    data: data_table
  })
);

export const getAllDataTables = () => (
  $.ajax({
    method: 'GET',
    url: 'api/data_tables'
  })
);

export const getSingleDataTable = id => (
  $.ajax({
    method: 'GET',
    url: 'api/data_tables/${id}'
  })
);
