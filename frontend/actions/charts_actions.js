import * as ChartUtil from '../util/charts_util';

export const CREATE_CHART = "CREATE_CHART";
export const RECEIVE_CHARTS = "RECEIVE_CHARTS";
export const RECEIVE_CHART = "RECEIVE_CHART";
export const REMOVE_CHART = "REMOVE_CHART";

export const receiveCharts = charts => ({
  type: RECEIVE_CHARTS,
  charts
});

export const receiveChart = chart => ({
  type: RECEIVE_CHART,
  chart
});

export const createChart = chart => ({
  type: CREATE_CHART,
  chart
});

export const removeChart = chart => ({
  type: REMOVE_CHART,
  chart
});

export const fetchAllCharts = () => dispatch => (
  ChartUtil.fetchAllCharts().then(
    charts => dispatch(receiveCharts(charts))
  )
);

export const fetchOneChart = id => dispatch => (
  ChartUtil.fetchOneChart(id).then(
    chart => dispatch(receiveChart(chart))
  )
);

export const deleteChart = id => dispatch => (
  ChartUtil.deleteChart(id).then(
    chart => dispatch(removeChart(chart))
  )
);

export const makeChart = chart => dispatch => (
  ChartUtil.makeChart(chart).then(
    newChart => dispatch(createChart(newChart))
  )
);
