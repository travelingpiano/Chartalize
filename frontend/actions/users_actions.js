import * as UsersUtil from '../util/user_api_util.js';

export const RECEIVE_USERS = "RECEIVE_USERS";

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const fetchAllUsers = () => dispatch => (
  UsersUtil.fetchAllUsers().then(
    users => dispatch(receiveUsers(users))
  )
);
