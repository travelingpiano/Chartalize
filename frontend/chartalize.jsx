import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import Container from './components/reactdnd_test/dragdropcontext';
//Testing
import {fetchAllCharts,fetchOneChart,makeChart} from './actions/charts_actions';

window.fetchOneChart = fetchOneChart;
window.fetchAllCharts = fetchAllCharts;
window.makeChart = makeChart;

document.addEventListener('DOMContentLoaded', ()=>{
  const root = document.getElementById('root');
  let store;
  if(window.currentUser){
    const preloadedState = {session: {currentUser: window.currentUser}};
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();

  }
  // observe(knightPosition=>ReactDOM.render(
  //   <Board knightPosition={knightPosition} />
  // ,root));
  // ReactDOM.render(<Container headings={["one","two","three","four"]}/>,root);
  ReactDOM.render(<Root store={store}/>,root);
  window.getState = store.getState;
  window.dispatch = store.dispatch;
});
