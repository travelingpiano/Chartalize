import {RECEIVE_CHARTS, RECEIVE_CHART, REMOVE_CHART, CREATE_CHART, UPDATE_CHART, RECEIVE_CHART_ERRORS} from '../actions/charts_actions';
import {merge} from 'lodash';

const ChartReducer = (state={},action) => {
  switch(action.type){
    case RECEIVE_CHARTS:
      return action.charts;
    case RECEIVE_CHART:
      return action.chart;
    case REMOVE_CHART:
      let newState = merge({},state);
      delete newState[action.chart.id];
      return newState;
    case CREATE_CHART:
      newState = merge({},state);
      newState[action.chart.id] = action.chart;
      return newState;
    case UPDATE_CHART:
      newState = merge({},state);
      newState[action.chart.id] = action.chart;
      return newState;
    case RECEIVE_CHART_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default ChartReducer;
