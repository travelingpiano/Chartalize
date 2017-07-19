import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

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
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  ReactDOM.render(<Root store={store}/>,root);
});
