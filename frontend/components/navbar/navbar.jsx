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
          <Link to='/'>Chartesian</Link>
          <h1>Welcome {this.props.currentUser.username}</h1>
          <button className="link" onClick={this.logout}>Log Out</button>
        </div>

      );
    }else {
      display = (
        <div className="navbar">
          <Link to='/'>
            <h1>Chartesian</h1>
          </Link>
          <div>
            <Link className="link" to='/signup'>Sign Up</Link>
            <Link className="link" to='/login'>Log In</Link>
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
