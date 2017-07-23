import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import Board from './components/reactdnd_tutorial/board';
import {observe} from './components/reactdnd_tutorial/game';
import Container from './components/reactdnd_test/dragdropcontext';
//Testing
import {fetchAllDataTables,fetchOneDataTable,makeDataTable} from './actions/data_table_actions';

window.fetchOneDataTable = fetchOneDataTable;
window.fetchAllDataTables = fetchAllDataTables;
window.makeDataTable = makeDataTable;

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
  ReactDOM.render(<Container headings={["one","two","three","four"]}/>,root);
  window.getState = store.getState;
  window.dispatch = store.dispatch;
});

// ReactDOM.render(<Root store={store}/>,root);
