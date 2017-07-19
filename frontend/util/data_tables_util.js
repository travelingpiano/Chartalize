export const create_dataTable = data_table => {
  console.log(data_table);
  return (
    $.ajax({
      method: 'POST',
      url: 'api/data_tables',
      data: data_table
    })
  );
};

export const getAllDataTables = () => (
  $.ajax({
    method: 'GET',
    url: 'api/data_tables'
  })
);

export const getSingleDataTable = id => (
  $.ajax({
    method: 'GET',
    url: `api/data_tables/${id}`
  })
);

export const deleteDataTable = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/data_tables/${id}`
  })
);
