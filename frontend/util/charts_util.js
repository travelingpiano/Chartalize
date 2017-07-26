export const makeChart = chart => (
  $.ajax({
    method: 'POST',
    url: 'api/charts',
    data: chart
  })
);

export const fetchAllCharts = () => (
  $.ajax({
    method: 'GET',
    url: 'api/charts'
  })
);

export const fetchOneChart = id => (
  $.ajax({
    method: 'GET',
    url: `api/charts/${id}`
  })
);

export const deleteChart = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/charts/${id}`
  })
);

export const editChart = (chart,id) => {
  return(
    $.ajax({
      method: 'PATCH',
      url: `api/charts/${id}`,
      data: chart
    })
  );
};

export const fetchSharedCharts = () => {
  return (
    $.ajax({
      method: 'GET',
      url: `api/charts/shared`
    })
  );
};

export const fetchSharedChart = id => {
  return (
    $.ajax({
      method: 'GET',
      url: `api/charts/shared/${id}`
    })
  );
};
