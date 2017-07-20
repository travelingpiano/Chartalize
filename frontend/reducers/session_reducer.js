import {RECEIVE_USER, RECEIVE_ERRORS} from '../actions/session_actions';
import {merge} from 'lodash';
const _nullUser = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state=_nullUser, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_USER:
      const currentUser = action.user;
      return merge({},_nullUser,{currentUser});
    case RECEIVE_ERRORS:
      const errors = action.errors;
      console.log(errors);
      return merge({},_nullUser,{errors});
    default:
      return state;
  }
};

export default SessionReducer;
