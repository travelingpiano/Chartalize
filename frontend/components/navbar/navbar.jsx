import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e){
    this.props.logout();
  }

  render(){
    let display;
    if(this.props.currentUser){
      display = (
        <div className="navbar">
          <Link to='/'>
            <h1 className="logo">CHARTALIZE</h1>
          </Link>
          <h1>Welcome {this.props.currentUser.username}</h1>
          <button className="link" onClick={this.logout}>Log Out</button>
        </div>

      );
    }else {
      display = (
        <div className="navbar">
          <Link to='/'>
            <h1 className="logo">CHARTALIZE</h1>
          </Link>
          <div className="signin-login">
            <Link className="login" to='/login'>Log In</Link>
            <Link className="signup" to='/signup'>Get Started Now!</Link>
          </div>

        </div>
      );
    }
    return (
      <div>
        {display}
      </div>
    );
  }
}

export default NavBar;
