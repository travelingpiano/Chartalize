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
