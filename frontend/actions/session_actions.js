import * as SessionUtil from '../util/session_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";


export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const login = user => dispatch => (
  SessionUtil.login(user).then(
    currentUser => dispatch(receiveUser(currentUser)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  )
);

export const logout = () => dispatch => (
  SessionUtil.logout().then(
    currentUser => dispatch(receiveUser(null)),
    errors => dispatch(receiveErrors(errors))
  )
);

export const signup = user => dispatch => {
  return (
    SessionUtil.signup(user).then(
      currentUser => dispatch(receiveUser(currentUser)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    )
  );
};
