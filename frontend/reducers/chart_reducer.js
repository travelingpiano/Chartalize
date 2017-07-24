import {RECEIVE_CHARTS, RECEIVE_CHART, REMOVE_CHART, CREATE_CHART} from '../actions/charts_actions';
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
    default:
      return state;
  }
};

export default ChartReducer;
