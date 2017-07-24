import {values} from 'lodash';

export const selectAllDataTables = dataTables => values(dataTables);
export const selectCurrentUserTables = (dataTables,currentUser) => {
  let currentUserDataTables = [];
  for(let key in dataTables){
    if(dataTables[key].user_id === currentUser.id){
      currentUserDataTables.push(dataTables[key]);
    }
  }
  return currentUserDataTables;
};

export const selectCurrentUserCharts = (charts,currentUser) => {
  let currentUserCharts = [];
  for(let key in charts){
    if(charts[key].user_id === currentUser.id){
      currentUserCharts.push(charts[key]);
    }
  }
  return currentUserCharts;
};
