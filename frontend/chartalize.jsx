import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import Container from './components/reactdnd_test/dragdropcontext';
//Testing
import {editChart} from './actions/charts_actions';

window.editChart = editChart;

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
  ReactDOM.render(<Root store={store}/>,root);
  window.getState = store.getState;
  window.dispatch = store.dispatch;
});
