import {RECEIVE_USERS} from '../actions/users_actions';

const UserReducer = (state={},action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    default:
      return state;
  }
};

export default UserReducer;
