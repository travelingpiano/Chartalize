import React from 'react';
import {Link, withRouter} from 'react-router-dom';

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
          <Link to='/data_tables'>
            <h1 className="logo">CHARTALIZE</h1>
          </Link>
          <button onClick={this.logout} className="logout">Log Out</button>
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

export default withRouter(NavBar);
