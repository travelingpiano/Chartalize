import React from 'react';
import ReactDOM from 'react-dom';

import {login,signup,logout} from './util/session_api_util';

window.login = login;
window.signup = signup;
window.logout = logout;

document.addEventListener('DOMContentLoaded', ()=>{
  const root = document.getElementById('root');
  ReactDOM.render(<h1>Hi</h1>,root);
});
